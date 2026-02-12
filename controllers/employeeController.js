const mongoose = require("mongoose");
const Employee = require("../models/Employee");



// ✅ Create Employee
exports.createEmployee = async (req,res)=>{
  try{

    const { name, phone, COMPANY, DESIGNATION } = req.body;

    // 🔥 Required validation
    if(!name || !COMPANY){
      return res.status(400).json({
        success:false,
        message:"name and COMPANY are required"
      });
    }

    // 🔥 ObjectId validation
    if(!mongoose.Types.ObjectId.isValid(COMPANY)){
      return res.status(400).json({
        success:false,
        message:"Invalid COMPANY ID"
      });
    }

    if(DESIGNATION && !mongoose.Types.ObjectId.isValid(DESIGNATION)){
      return res.status(400).json({
        success:false,
        message:"Invalid DESIGNATION ID"
      });
    }

    const data = await Employee.create(req.body);

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



// ✅ Get All Employees
exports.getEmployees = async (req,res)=>{
  try{

    const data = await Employee.find()
      .populate("COMPANY")
      .populate("DESIGNATION");

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



// ✅ Get Single Employee
exports.getEmployee = async (req,res)=>{
  try{

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success:false,
        message:"Invalid Employee ID"
      });
    }

    const data = await Employee.findById(id)
      .populate("COMPANY DESIGNATION");

    if(!data){
      return res.status(404).json({
        success:false,
        message:"Employee not found"
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



// ✅ Update Employee
exports.updateEmployee = async (req,res)=>{
  try{

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success:false,
        message:"Invalid Employee ID"
      });
    }

    const data = await Employee.findByIdAndUpdate(
      id,
      req.body,
      { new:true, runValidators:true }
    );

    if(!data){
      return res.status(404).json({
        success:false,
        message:"Employee not found"
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



// ✅ Delete Employee
exports.deleteEmployee = async (req,res)=>{
  try{

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success:false,
        message:"Invalid Employee ID"
      });
    }

    const data = await Employee.findByIdAndDelete(id);

    if(!data){
      return res.status(404).json({
        success:false,
        message:"Employee not found"
      });
    }

    res.status(200).json({
      success:true,
      message:"Employee deleted successfully"
    });

  }catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    });
  }
};
