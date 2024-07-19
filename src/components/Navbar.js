import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div class="nav">
      <div class="nav-logo">
        <img src="/quote-ocean-logo.jfif" alt="logo" />
      </div>
      <div class="nav-title">Quote Ocean🌊</div>
      <div class="nav-button" id="dropdownBtn">
        <img src="/user-icon.png" alt="user" />
        <div class="dropdown-content">
          <ul>
            <li>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
