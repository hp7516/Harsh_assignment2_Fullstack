const { mongoose } = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true, min: 20, max: 70 },
  dateOfJoining:{type:Date},
  title: {
    type: String,
    required: true,
    enum: ["Employee", "Manager", "Director", "VP"],
  },
  department: {
    type: String,
    required: true,
    enum: ["IT", "Marketing", "HR", "Engineering"],
  },
  employeeType: {
    type: String,
    required: true,
    enum: ["FullTime", "PartTime", "Contract", "Seasonal"],
  },
  currentStatus: { type: Number, default: 1 },
});


module.exports = mongoose.model('Employee', EmployeeSchema);