const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({

  date: Date,

  status: {
    type:String,
    enum:["PRESENT","ABSENT","HALF_DAY","LEAVE"]
  },

  checkIn: Date,
  checkOut: Date,

  EMPLOYEE:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Employee",
    required:true
  },

  COMPANY:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Company",
    required:true
  }

},{ timestamps:true });

module.exports = mongoose.model("Attendance", AttendanceSchema);
