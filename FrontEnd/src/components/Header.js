import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <ul style={navListStyle}>
          <li style={navItemStyle}>
            <Link to="/" style={linkStyle}>Home</Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/employeelist" style={linkStyle}>Employee List</Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/employeelist/employeecreate" style={linkStyle}>Create New Employee</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};


const headerStyle = {
  backgroundColor: "#1e1e2f",
  color: "#fff",
  padding: "10px 20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const navStyle = {
  display: "flex",
  justifyContent: "center",
};

const navListStyle = {
  listStyleType: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  gap: "15px",
};

const navItemStyle = {
  fontSize: "1rem",
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
  padding: "10px 15px",
  borderRadius: "5px",
  transition: "background-color 0.3s",
};

linkStyle[":hover"] = {
  backgroundColor: "#45a049",
  color: "#fff",
};

export default Header;
