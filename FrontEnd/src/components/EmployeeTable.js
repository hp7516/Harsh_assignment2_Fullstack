import React from "react";
import EmployeeRow from "./EmployeeRow";

const EmployeeTable = ({ employees, setDeleteEmployeeId }) => {
    return (
        <div className="container mt-4">
            <h3 className="text-center mb-4">Employee Table</h3>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        {Object.keys(employees[0]).map((key) => {
                            if (key !== "__typename" && key !== "id") {
                                return (
                                    <th key={key} className="text-center">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </th>
                                );
                            }
                            return null;
                        })}
                        <th className="text-center">Actions</th>
                        <th className="text-center">Actions</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <EmployeeRow
                            key={employee.id}
                            employee={employee}
                            setDeleteEmployeeId={setDeleteEmployeeId}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;
