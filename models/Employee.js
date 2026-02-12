const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({

  name: String,
  phone: String,
  joiningDate: Date,

  COMPANY: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required:true
  },

  DESIGNATION: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Designation"
  }

},{ timestamps:true });

module.exports = mongoose.model("Employee", EmployeeSchema);
