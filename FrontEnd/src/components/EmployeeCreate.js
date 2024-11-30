import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_EMPLOYEE } from "../mutations/employeeMutation";
import { GET_EMPLOYEES } from "./EmployeeDirectory";

const EmployeeCreate = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [title, setTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [employeeType, setEmployeeType] = useState("");
    const [currentStatus, setCurrentStatus] = useState(1); 
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [addEmployee] = useMutation(ADD_EMPLOYEE, {
        variables: {
            firstName,
            lastName,
            age: parseInt(age),
            title,
            department,
            employeeType,
            currentStatus: parseInt(currentStatus),
        },
        refetchQueries: [{ query: GET_EMPLOYEES }],
        onCompleted: () => {
            navigate("/employeelist");
        },
        onError: (error) => {
            console.error("Error adding employee:", error.message);
            alert("Failed to add employee. Please try again.");
        },
    });

    const validate = () => {
        const validationErrors = {};
        if (!firstName.trim()) validationErrors.firstName = "First Name is required";
        if (!lastName.trim()) validationErrors.lastName = "Last Name is required";
        if (!age || age < 20 || age > 70) validationErrors.age = "Age must be between 20 and 70";
        if (!title) validationErrors.title = "Title is required";
        if (!department) validationErrors.department = "Department is required";
        if (!employeeType) validationErrors.employeeType = "Employee Type is required";
        return validationErrors;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        addEmployee();

        setFirstName("");
        setLastName("");
        setAge("");
        setTitle("");
        setDepartment("");
        setEmployeeType("");
        setCurrentStatus(1);
        setErrors({});
    };

    return (
        <div style={formContainerStyle}>
            <h2 style={formTitleStyle}>Add Employee</h2>
            <form onSubmit={onSubmit} style={{ marginBottom: "20px" }}>
                <div style={fieldStyle}>
                    <label style={labelStyle}>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={inputStyle}
                    />
                    {errors.firstName && <p style={errorStyle}>{errors.firstName}</p>}
                </div>
                <div style={fieldStyle}>
                    <label style={labelStyle}>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={inputStyle}
                    />
                    {errors.lastName && <p style={errorStyle}>{errors.lastName}</p>}
                </div>
                <div style={fieldStyle}>
                    <label style={labelStyle}>Age:</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        style={inputStyle}
                    />
                    {errors.age && <p style={errorStyle}>{errors.age}</p>}
                </div>
                <div style={fieldStyle}>
                    <label style={labelStyle}>Title:</label>
                    <select
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="">Select Title</option>
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                        <option value="Director">Director</option>
                        <option value="VP">VP</option>
                    </select>
                    {errors.title && <p style={errorStyle}>{errors.title}</p>}
                </div>
                <div style={fieldStyle}>
                    <label style={labelStyle}>Department:</label>
                    <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="">Select Department</option>
                        <option value="IT">IT</option>
                        <option value="Marketing">Marketing</option>
                        <option value="HR">HR</option>
                        <option value="Engineering">Engineering</option>
                    </select>
                    {errors.department && <p style={errorStyle}>{errors.department}</p>}
                </div>
                <div style={fieldStyle}>
                    <label style={labelStyle}>Employee Type:</label>
                    <select
                        value={employeeType}
                        onChange={(e) => setEmployeeType(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="">Select Employee Type</option>
                        <option value="FullTime">FullTime</option>
                        <option value="PartTime">PartTime</option>
                        <option value="Contract">Contract</option>
                        <option value="Seasonal">Seasonal</option>
                    </select>
                    {errors.employeeType && <p style={errorStyle}>{errors.employeeType}</p>}
                </div>
                <div style={fieldStyle}>
                    <label style={labelStyle}>Current Status:</label>
                    <input
                        type="number"
                        value={currentStatus}
                        onChange={(e) => setCurrentStatus(e.target.value)}
                        style={inputStyle}
                        disabled
                    />
                </div>
                <button type="submit" style={blackButtonStyle}>
                    Submit
                </button>
            </form>
        </div>
    );
};

const formContainerStyle = {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const formTitleStyle = {
    textAlign: "center",
    marginBottom: "20px",
};

const fieldStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "15px",
};

const labelStyle = {
    flex: "1",
    fontWeight: "bold",
};

const inputStyle = {
    flex: "2",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
};

const errorStyle = {
    color: "#FF5733",
    fontSize: "0.85rem",
    marginLeft: "15px",
};

const blackButtonStyle = {
    padding: "10px 15px",
    backgroundColor: "black",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%", 
    fontWeight: "bold",
};

export default EmployeeCreate;
