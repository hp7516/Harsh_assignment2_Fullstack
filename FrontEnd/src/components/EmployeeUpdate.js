import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GET_EMPLOYEE } from "./EmployeeDetails";
import { UPDATE_EMPLOYEE } from "../mutations/employeeMutation";

const EmployeeUpdate = () => {
    const [employeeDetails, setEmployeeDetails] = useState({
        firstName: "",
        lastName: "",
        age: 0,
        title: "",
        department: "",
        employeeType: "",
        currentStatus: 1, // Default to 1 (working)
    });

    const { employeeid } = useParams();
    const navigate = useNavigate();

    const { error, loading, data } = useQuery(GET_EMPLOYEE, {
        variables: {
            id: employeeid,
        },
    });

    const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
        variables: {
            id: employeeid,
            ...employeeDetails,
        },
        update: (cache, { data: updateEmployee }) => {
            const { employee } = cache.readQuery({
                query: GET_EMPLOYEE,
                variables: { id: employeeid },
            });
            cache.writeQuery({
                query: GET_EMPLOYEE,
                data: { employee },
            });
        },
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        updateEmployee();
        navigate("/employeelist");
    };

    useEffect(() => {
        if (data && "employee" in data) {
            setEmployeeDetails({
                firstName: data.employee.firstName,
                lastName: data.employee.lastName,
                age: data.employee.age,
                title: data.employee.title,
                department: data.employee.department,
                employeeType: data.employee.employeeType,
                currentStatus: data.employee.currentStatus,
            });
        }
    }, [data]);

    if (error) {
        return <p className="text-danger text-center mt-4">Error!!!</p>;
    }
    if (loading) {
        return <p className="text-primary text-center mt-4">Loading...</p>;
    }

    return (
        <div className="container mt-5">
            {!loading && !error && data.employee !== undefined && (
                <>
                    <h4 className="text-center mb-4">Update Employee</h4>
                    <form onSubmit={handleSubmit} className="w-50 mx-auto">
                        <div className="row mb-3 align-items-center">
                            <label htmlFor="firstName" className="col-sm-4 col-form-label">
                                First Name:
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="form-control"
                                    value={employeeDetails.firstName}
                                    onChange={(e) =>
                                        setEmployeeDetails((currDetails) => ({
                                            ...currDetails,
                                            firstName: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <label htmlFor="lastName" className="col-sm-4 col-form-label">
                                Last Name:
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="form-control"
                                    value={employeeDetails.lastName}
                                    onChange={(e) =>
                                        setEmployeeDetails((currDetails) => ({
                                            ...currDetails,
                                            lastName: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <label htmlFor="age" className="col-sm-4 col-form-label">
                                Age:
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    className="form-control"
                                    value={employeeDetails.age}
                                    onChange={(e) =>
                                        setEmployeeDetails((currDetails) => ({
                                            ...currDetails,
                                            age: parseInt(e.target.value),
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <label htmlFor="title" className="col-sm-4 col-form-label">
                                Title:
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="form-control"
                                    value={employeeDetails.title}
                                    onChange={(e) =>
                                        setEmployeeDetails((currDetails) => ({
                                            ...currDetails,
                                            title: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <label htmlFor="department" className="col-sm-4 col-form-label">
                                Department:
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    id="department"
                                    name="department"
                                    className="form-control"
                                    value={employeeDetails.department}
                                    onChange={(e) =>
                                        setEmployeeDetails((currDetails) => ({
                                            ...currDetails,
                                            department: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <label htmlFor="employeeType" className="col-sm-4 col-form-label">
                                Employee Type:
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    id="employeeType"
                                    name="employeeType"
                                    className="form-control"
                                    value={employeeDetails.employeeType}
                                    onChange={(e) =>
                                        setEmployeeDetails((currDetails) => ({
                                            ...currDetails,
                                            employeeType: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <label htmlFor="currentStatus" className="col-sm-4 col-form-label">
                                Current Status:
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    id="currentStatus"
                                    name="currentStatus"
                                    className="form-control"
                                    value={employeeDetails.currentStatus}
                                    onChange={(e) =>
                                        setEmployeeDetails((currDetails) => ({
                                            ...currDetails,
                                            currentStatus: parseInt(e.target.value),
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-dark w-100">
                            Save
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default EmployeeUpdate;
