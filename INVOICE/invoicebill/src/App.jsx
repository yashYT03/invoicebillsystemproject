import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/components/AboutUs";
import ContactUs from "./pages/components/ContactUs";
import "./App.css"; // Ensure you have an App.css file for styles

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
