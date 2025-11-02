import React, { useState } from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
        <Link to="/" className="navbar-left">
        <img src={logo} alt="NaijaPulsee Logo" className="logo" />
        <h1>NaijaPulsee</h1>
      </Link>

       <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/">Dashboard</Link>
        <Link to="/news">News</Link>
        <Link to="/weather">Weather</Link>
        <Link to="/lifestyle">Lifestyle</Link>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
}

export default Navbar;
