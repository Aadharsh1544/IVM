import React from "react";
import { Link } from "react-router-dom";
import "./App.css"; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Aadharsh Menu</h3>
      <div className="sidebar-list">
        <Link to="/">
          <div>Home</div>
        </Link>

        <Link to="/devices">
          <div>Devices</div>
        </Link>

        <Link to="/create-device">
          <div>Create Device</div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
