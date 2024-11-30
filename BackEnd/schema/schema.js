const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql");

// Mongoose model
const Employee = require("../models/Employee");

// Employee Type
const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    title: { type: GraphQLString },
    department: { type: GraphQLString },
    employeeType: { type: GraphQLString },
    currentStatus: { type: GraphQLInt },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    employees: {
      type: new GraphQLList(EmployeeType),
      resolve: () => {
        return Employee.find();
      },
    },
    employee: {
      type: EmployeeType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Employee.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add Employee
    addEmployee: {
      type: EmployeeType,
      args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        department: { type: GraphQLNonNull(GraphQLString) },
        employeeType: { type: GraphQLNonNull(GraphQLString) },
        currentStatus: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const employee = new Employee({
          firstName: args.firstName,
          lastName: args.lastName,
          age: args.age,
          title: args.title,
          department: args.department,
          employeeType: args.employeeType,
          currentStatus: args.currentStatus,
        });
        return employee.save();
      },
    },
    // Filter Employees
    filterEmployees: {
      type: new GraphQLList(EmployeeType),
      args: {
        firstName: { type: GraphQLString },
        department: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const filterCriteria = {};
        if (args.firstName) filterCriteria.firstName = args.firstName;
        if (args.department) filterCriteria.department = args.department;

        return Employee.find(filterCriteria);
      },
    },
    // Update Employee
    updateEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        title: { type: GraphQLString },
        department: { type: GraphQLString },
        employeeType: { type: GraphQLString },
        currentStatus: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        return Employee.findByIdAndUpdate(
          args.id,
          {
            $set: {
              firstName: args.firstName,
              lastName: args.lastName,
              age: args.age,
              title: args.title,
              department: args.department,
              employeeType: args.employeeType,
              currentStatus: args.currentStatus,
            },
          },
          { new: true }
        );
      },
    },
    // Delete Employee
    deleteEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        return Employee.findByIdAndDelete(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
