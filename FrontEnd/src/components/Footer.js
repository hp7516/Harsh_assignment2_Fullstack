import React from "react";

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <div style={contentStyle}>Copyright &copy; 2024. All rights reserved.</div>
        </footer>
    );
};

const footerStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#1e1e2f",
    color: "#fff",
    textAlign: "center",
    padding: "10px 0",
    boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.2)",
};

const contentStyle = {
    fontSize: "14px",
};

export default Footer;
