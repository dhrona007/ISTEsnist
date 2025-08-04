import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import multer from "multer";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// PostgreSQL connection pool
const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_0IZj2RsUYkAO@ep-late-fire-aezct0yj-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Multer setup for image upload (memory storage for BLOB)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// JWT secret key (in production, use env variable)
const JWT_SECRET = "your_jwt_secret_key";

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Admin login route
app.post("/api/login", async (req, res) => {
  const { username, password, userType } = req.body;
  try {
    if (userType === "volunteer") {
      // Volunteer login
      const result = await pool.query(
        "SELECT * FROM volunteers WHERE email = $1",
        [username]
      );
      if (result.rows.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const volunteer = result.rows[0];
      // For simplicity, assume no password for volunteers or implement password check if available
      // Here, we just check if email exists
      const token = jwt.sign(
        { email: volunteer.email, id: volunteer.id, userType: "volunteer" },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token });
    } else {
      // Admin login
      const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      if (result.rows.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const user = result.rows[0];
      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign(
        { username: user.username, id: user.id, userType: "admin" },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Example: Get all announcements
app.get("/api/announcements", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM announcements ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Example: Create announcement (protected)
app.post("/api/announcements", authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO announcements (title, content, created_at) VALUES ($1, $2, NOW()) RETURNING *",
      [title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Image upload endpoint (store image as BLOB)
app.post(
  "/api/gallery",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    const { originalname, mimetype, buffer } = req.file;
    const { description } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO gallery (filename, mimetype, data, description, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
        [originalname, mimetype, buffer, description]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Get gallery images
app.get("/api/gallery", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, filename, mimetype, description, created_at FROM gallery ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get image data by id
app.get("/api/gallery/:id/image", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT mimetype, data FROM gallery WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Image not found" });
    }
    const image = result.rows[0];
    res.set("Content-Type", image.mimetype);
    res.send(image.data);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// CRUD endpoints for events
app.get("/api/events", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events ORDER BY date DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/events", authenticateToken, async (req, res) => {
  const { title, description, date, venue, type, participant_limit } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO events (title, description, date, venue, type, participant_limit) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, description, date, venue, type, participant_limit]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// CRUD endpoints for board members
app.get("/api/board-members", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM board_members ORDER BY position"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching board members:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/board-members", authenticateToken, async (req, res) => {
  const { name, position, contact, social_links } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO board_members (name, position, contact, social_links) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, position, contact, social_links]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating board member:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

import volunteerService from "./volunteerService.js";

// CRUD endpoints for volunteers
app.get("/api/volunteers", async (req, res) => {
  try {
    const volunteers = await volunteerService.getVolunteers();
    res.json(volunteers);
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/volunteers", authenticateToken, async (req, res) => {
  try {
    const volunteer = await volunteerService.addVolunteer(req.body);
    res.status(201).json(volunteer);
  } catch (error) {
    console.error("Error creating volunteer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// CRUD endpoints for achievements
app.get("/api/achievements", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM achievements ORDER BY date DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/achievements", authenticateToken, async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO achievements (title, description, date) VALUES ($1, $2, $3) RETURNING *",
      [title, description, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating achievement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// CRUD endpoints for announcements (already partially implemented, adding GET and POST if needed)

// CRUD endpoints for blog posts
app.get("/api/blog-posts", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM blog_posts ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/blog-posts", authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO blog_posts (title, content, created_at) VALUES ($1, $2, NOW()) RETURNING *",
      [title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// CRUD endpoints for contacts
app.get("/api/contacts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts ORDER BY name");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/contacts", authenticateToken, async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO contacts (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, phone, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
