import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";

export const GET_EMPLOYEE = gql`
    query getEmployee($id: ID!) {
        employee(id: $id) {
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

const EmployeeDetails = () => {
    const { employeeid } = useParams();

    const { error, loading, data } = useQuery(GET_EMPLOYEE, {
        variables: { id: employeeid },
    });

    if (error) return <p className="text-danger text-center mt-4">Error!!!</p>;
    if (loading) return <p className="text-primary text-center mt-4">Loading...</p>;

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            {!error && !loading && data.employee !== undefined && (
                <div
                    className="employee-details-wrap card shadow p-4"
                    style={{ width: "80%" }} 
                >
                    <h3 className="text-center mb-4">Employee Details</h3>
                    <table
                        className="table table-bordered table-striped"
                        style={{ width: "100%" }} 
                    >
                        <tbody>
                            {Object.entries(data.employee).map(
                                (employeeDetail) => {
                                    if (
                                        employeeDetail[0] !== "__typename" &&
                                        employeeDetail[0] !== "id"
                                    ) {
                                        return (
                                            <tr key={employeeDetail[0]}>
                                                <th className="text-capitalize">{employeeDetail[0]}</th>
                                                <td>{employeeDetail[1]}</td>
                                            </tr>
                                        );
                                    }
                                    return null;
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EmployeeDetails;
