-- PostgreSQL does not support IF NOT EXISTS for CREATE TABLE in all versions, so remove it for compatibility

-- Users table for admin users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Volunteers table
CREATE TABLE volunteers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  interests TEXT,
  hours INTEGER DEFAULT 0,
  rank VARCHAR(50) DEFAULT 'New Volunteer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  venue VARCHAR(200),
  type VARCHAR(100),
  participant_limit INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Announcements table
CREATE TABLE announcements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Achievements table
CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Board Members table
CREATE TABLE board_members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(100),
  contact VARCHAR(100),
  social_links TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog Posts table
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contacts table
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery table
CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255),
  mimetype VARCHAR(100),
  data BYTEA,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial admin user example (replace 'admin' and hashed password accordingly)
-- Password hash can be generated using bcrypt in Node.js or online tools
INSERT INTO users (username, password_hash) VALUES
('admin', '$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
