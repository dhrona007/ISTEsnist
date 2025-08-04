import { Pool } from "pg";
import admin from "firebase-admin";

// Initialize Firebase Admin SDK if needed
let firebaseApp;
if (process.env.DB_PROVIDER === "firebase") {
  if (!admin.apps.length) {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  } else {
    firebaseApp = admin.app();
  }
  var firestore = firebaseApp.firestore();
}

// PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
});

// Volunteer Service Interface
class VolunteerService {
  async getVolunteers() {
    if (process.env.DB_PROVIDER === "firebase") {
      const snapshot = await firestore.collection("volunteers").get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } else {
      const result = await pool.query("SELECT * FROM volunteers ORDER BY name");
      return result.rows;
    }
  }

  async addVolunteer(volunteer) {
    if (process.env.DB_PROVIDER === "firebase") {
      const docRef = await firestore.collection("volunteers").add(volunteer);
      return { id: docRef.id, ...volunteer };
    } else {
      const { name, hours, rank } = volunteer;
      const result = await pool.query(
        "INSERT INTO volunteers (name, hours, rank) VALUES ($1, $2, $3) RETURNING *",
        [name, hours, rank]
      );
      return result.rows[0];
    }
  }

  // Additional methods like updateVolunteer, deleteVolunteer can be added similarly
}

export default new VolunteerService();
