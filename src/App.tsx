import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Events from "./components/Events";
import Volunteers from "./components/Volunteers";
import Achievements from "./components/Achievements";
import Gallery from "./components/Gallery";
import Announcements from "./components/Announcements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-white">
              <Header />
              <Hero />
              <About />
              <Events />
              <Volunteers />
              <Achievements />
              <Gallery />
              <Announcements />
              <Contact />
              <Footer />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/volunteer-dashboard" element={<Volunteers />} />
      </Routes>
    </Router>
  );
}

export default App;
