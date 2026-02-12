const mongoose = require("mongoose");

const DesignationSchema = new mongoose.Schema({

  name: String,
  basePay: Number,

  COMPANY: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required:true
  }

});

module.exports = mongoose.model("Designation", DesignationSchema);
