import { useMutation } from "@apollo/client";
import React from "react";
import { DELETE_EMPLOYEE } from "../mutations/employeeMutation";
import { GET_EMPLOYEES } from "./EmployeeDirectory";

const EmployeeDelete = ({ deleteEmployeeId, setDeleteEmployeeId }) => {
    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
        variables: {
            id: deleteEmployeeId,
        },
        update: (cache, { data: { deleteEmployee } }) => {
            const { employees } = cache.readQuery({
                query: GET_EMPLOYEES,
            });
            cache.writeQuery({
                query: GET_EMPLOYEES,
                data: {
                    employees: employees.filter(
                        (employee) => employee.id !== deleteEmployee.id
                    ),
                },
            });
        },
    });

    const handleYesClick = () => {
        deleteEmployee();
        setDeleteEmployeeId("");
    };

    const handleNoClick = () => {
        setDeleteEmployeeId("");
    };

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h4>Are you sure you want to delete this employee?</h4>
                <button onClick={handleYesClick} style={buttonStyle}>
                    Yes
                </button>
                <button onClick={handleNoClick} style={buttonStyle}>
                    No
                </button>
            </div>
        </div>
    );
};

const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center", 
    zIndex: 1000,
};

const modalStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "300px",
};

const buttonStyle = {
    margin: "10px",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "16px",
};

export default EmployeeDelete;
