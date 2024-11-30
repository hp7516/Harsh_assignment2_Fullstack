import React from "react";

const Homepage = () => {
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Welcome to the Employee Management System</h1>
      <p style={descriptionStyle}>
        Manage your employees efficiently with our easy-to-use system. You can view employee details, add new employees, update information, and more.
      </p>
     
    </div>
  );
};
const containerStyle = {
  maxWidth: "900px",
  margin: "auto",
  padding: "20px",
  textAlign: "center",
  backgroundColor: "#f9f9f9",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
};

const titleStyle = {
  fontSize: "2.5rem",
  color: "#333",
  marginBottom: "15px",
};

const descriptionStyle = {
  fontSize: "1.2rem",
  color: "#666",
  marginBottom: "30px",
};


export default Homepage;
