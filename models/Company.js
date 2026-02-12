const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({

  name: String,
  gst: String,
  billingCycleDate: Number

}, { timestamps:true });

module.exports = mongoose.model("Company", CompanySchema);
