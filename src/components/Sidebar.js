import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/subscribe">
            Subscribe
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/contact">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/logout">
            Logout
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
