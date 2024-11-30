import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import { gql, useMutation, useQuery } from "@apollo/client";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeDelete from "./EmployeeDelete";

import { FILTER_EMPLOYEES } from "../mutations/employeeMutation";

export const GET_EMPLOYEES = gql`
    query getEmployees {
        employees {
            id
            firstName
            lastName
            age
            title
            department
            employeeType
            currentStatus
        }
    }
`;

const EmployeeList = () => {
    const [deleteEmployeeId, setDeleteEmployeeId] = useState("");
    const [filterData, setFilterData] = useState({
        firstName: "",
        department: "",
    });

    const { loading, error, data } = useQuery(GET_EMPLOYEES);

    const [filterEmployees] = useMutation(FILTER_EMPLOYEES, {
        variables: {
            firstName: filterData.firstName,
            department: filterData.department,
        },
        update: (cache, { data: { filterEmployees } }) => {
            cache.writeQuery({
                query: GET_EMPLOYEES,
                data: { employees: filterEmployees },
            });
        },
    });

    const handleSearch = (text) => {
        setFilterData((currFilterData) => ({
            ...currFilterData,
            firstName: text,
        }));
    };

    const handleFilter = (department) => {
        setFilterData((currFilterData) => ({
            ...currFilterData,
            department: department,
        }));
    };

    useEffect(() => {
        filterEmployees();
    }, [filterData]);

    if (loading) return <p style={loadingStyle}>Loading...</p>;
    if (error) return <p style={errorStyle}>Error: {error.message}</p>;

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>Employee List</h2>
            <div style={filtersContainerStyle}>
               
                <EmployeeSearch handleSearch={handleSearch} handleFilter={handleFilter} />
            </div>
            {!loading && !error && data.employees.length !== 0 && (
                <div style={tableContainerStyle}>
                    <EmployeeTable
                        employees={data.employees}
                        setDeleteEmployeeId={setDeleteEmployeeId}
                    />
                    {deleteEmployeeId !== "" && (
                        <EmployeeDelete
                            deleteEmployeeId={deleteEmployeeId}
                            setDeleteEmployeeId={setDeleteEmployeeId}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

const containerStyle = {
    maxWidth: "1200px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const titleStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
    fontSize: "1.5rem",
};

const filtersContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    gap: "20px",
};

const tableContainerStyle = {
    marginTop: "20px",
};

const loadingStyle = {
    textAlign: "center",
    color: "#007BFF",
    fontSize: "1.2rem",
};

const errorStyle = {
    textAlign: "center",
    color: "#FF5733",
    fontSize: "1.2rem",
};

export default EmployeeList;
