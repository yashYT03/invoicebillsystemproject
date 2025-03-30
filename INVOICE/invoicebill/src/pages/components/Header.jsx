import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  const logo = "https://dashboard.getinvoice.co/dboard/img/logo.png";

  return (
    <AppBar position="static" color="primary">
      <Toolbar style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px" }}>
        <img src={logo} alt="logo" style={{ width: 140, filter: "brightness(0) invert(1)" }} />
        <nav>
          <ul style={{ display: "flex", listStyle: "none", gap: "15px", margin: 0, padding: 0 }}>
            <li><Link to="/" style={{ textDecoration: "none", color: "white" }}>Home</Link></li>
            <li><Link to="/about" style={{ textDecoration: "none", color: "white" }}>About Us</Link></li>
            <li><Link to="/contact" style={{ textDecoration: "none", color: "white" }}>Contact Us</Link></li>
          </ul>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
