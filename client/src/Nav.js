import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="bg-success navbar navbar-expand-lg">
      <a className="navbar-brand">ChainREC</a>
      <ul className="nav-links">
        <Link to="/hopital">
          <li>hopital</li>
        </Link>
        <Link to="/mairie">
          <li>mairie</li>
        </Link>
        <Link to="/prefecture">
          <li>préfecture</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
