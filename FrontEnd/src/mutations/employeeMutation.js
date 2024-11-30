import { gql } from "@apollo/client";

// Add Employee Mutation
export const ADD_EMPLOYEE = gql`
  mutation addEmployee(
    $firstName: String!
    $lastName: String!
    $age: Int!
    $title: String!
    $department: String!
    $employeeType: String!
    $currentStatus: Int!
  ) {
    addEmployee(
      firstName: $firstName
      lastName: $lastName
      age: $age
      title: $title
      department: $department
      employeeType: $employeeType
      currentStatus: $currentStatus
    ) {
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

// Filter Employees Mutation
export const FILTER_EMPLOYEES = gql`
  mutation filterEmployees($firstName: String, $department: String) {
    filterEmployees(firstName: $firstName, department: $department) {
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

// Update Employee Mutation
export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $age: Int!
    $title: String!
    $department: String!
    $employeeType: String!
    $currentStatus: Int!
  ) {
    updateEmployee(
      id: $id
      firstName: $firstName
      lastName: $lastName
      age: $age
      title: $title
      department: $department
      employeeType: $employeeType
      currentStatus: $currentStatus
    ) {
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

// Delete Employee Mutation
export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
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
