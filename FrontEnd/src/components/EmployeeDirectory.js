import { gql, useQuery } from "@apollo/client";
import EmployeeRow from "./EmployeeRow";

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

const EmployeeDirectory = ({ containerStyle: customContainerStyle }) => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);

 
  const containerStyle = {
    maxWidth: "1200px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    ...customContainerStyle, 
  };

  if (loading) return <p style={loadingStyle}>Loading...</p>;
  if (error) return <p style={errorStyle}>Something went wrong</p>;

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Employee Directory</h2>
      {!loading && !error && (
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr>
              <th style={thStyle}>First Name</th>
              <th style={thStyle}>Last Name</th>
              <th style={thStyle}>Age</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Department</th>
              <th style={thStyle}>Employee Type</th>
              <th style={thStyle}>Current Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.employees.map((employee) => (
              <EmployeeRow key={employee.id} employee={employee} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "1.8rem",
  color: "#333",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const theadStyle = {
  backgroundColor: "#007BFF",
  color: "#fff",
};

const thStyle = {
  padding: "10px",
  textAlign: "left",
  fontWeight: "bold",
  borderBottom: "1px solid #ccc",
};

const loadingStyle = {
  textAlign: "center",
  fontSize: "1.2rem",
  color: "#007BFF",
};

const errorStyle = {
  textAlign: "center",
  fontSize: "1.2rem",
  color: "#FF5733",
};

export default EmployeeDirectory;
