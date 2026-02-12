const mongoose = require("mongoose");
const Attendance = require("../models/Attendance");


// ✅ Create Attendance
exports.createAttendance = async (req,res)=>{
  try{

    const { date, status, EMPLOYEE, COMPANY } = req.body;

    // 🔥 Required field validation
    if(!date || !status || !EMPLOYEE || !COMPANY){
      return res.status(400).json({
        success:false,
        message:"date, status, EMPLOYEE and COMPANY are required"
      });
    }

    // 🔥 ObjectId validation
    if(
      !mongoose.Types.ObjectId.isValid(EMPLOYEE) ||
      !mongoose.Types.ObjectId.isValid(COMPANY)
    ){
      return res.status(400).json({
        success:false,
        message:"Invalid EMPLOYEE or COMPANY ID"
      });
    }

    const data = await Attendance.create(req.body);

    res.status(201).json({
      success:true,
      data
    });

  }catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    });
  }
};



// ✅ Get All Attendance
exports.getAttendance = async (req,res)=>{
  try{

    const data = await Attendance.find()
    .populate("EMPLOYEE COMPANY");

    res.status(200).json({
      success:true,
      count:data.length,
      data
    });

  }catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    });
  }
};



// ✅ Update Attendance
exports.updateAttendance = async (req,res)=>{
  try{

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success:false,
        message:"Invalid Attendance ID"
      });
    }

    const data = await Attendance.findByIdAndUpdate(
      id,
      req.body,
      { new:true, runValidators:true }
    );

    if(!data){
      return res.status(404).json({
        success:false,
        message:"Attendance not found"
      });
    }

    res.status(200).json({
      success:true,
      data
    });

  }catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    });
  }
};



// ✅ Delete Attendance
exports.deleteAttendance = async (req,res)=>{
  try{

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success:false,
        message:"Invalid Attendance ID"
      });
    }

    const data = await Attendance.findByIdAndDelete(id);

    if(!data){
      return res.status(404).json({
        success:false,
        message:"Attendance not found"
      });
    }

    res.status(200).json({
      success:true,
      message:"Attendance deleted successfully"
    });

  }catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    });
  }
};
