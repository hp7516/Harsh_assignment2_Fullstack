import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";


const EmployeeSearch = ({ handleSearch, handleFilter }) => {
    const [text, setText] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleSearch(text); // Trigger the search function with the entered text
    };

    return (
        <div style={containerStyle}>
            {/* Search Section */}
            <form onSubmit={handleSubmit} style={searchFormStyle}>
                <input
                    type="text"
                    placeholder="Search by Employee name"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={inputStyle}
                />
                <Button variant="dark" type="submit">
                    <Search />
                </Button>
                
                
            </form>

            {/* Filter Section */}
            <div>
                <select onChange={(e) => handleFilter(e.target.value)} style={dropdownStyle}>
                    <option value="">All Departments</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                </select>
            </div>
        </div>
    );
};


const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
};

const searchFormStyle = {
    display: "flex",
    alignItems: "center",
    gap: "5px",
};

const inputStyle = {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
};


const dropdownStyle = {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
    cursor: "pointer",
};

export default EmployeeSearch;
