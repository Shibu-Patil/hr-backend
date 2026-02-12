const mongoose = require("mongoose");
const Salary = require("../models/SalaryStructure");



// ✅ Create Salary Structure
exports.createSalary = async (req,res)=>{
  try{

    const { EMPLOYEE, COMPANY, components } = req.body;

    // 🔥 Required validation
    if(!EMPLOYEE || !COMPANY){
      return res.status(400).json({
        success:false,
        message:"EMPLOYEE and COMPANY are required"
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

    // Optional validation for components
    if(!Array.isArray(components)){
      return res.status(400).json({
        success:false,
        message:"components must be an array"
      });
    }

    const data = await Salary.create(req.body);

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



// ✅ Get All Salary Structures
exports.getSalary = async (req,res)=>{
  try{

    const data = await Salary.find()
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



// ✅ Update Salary Structure
exports.updateSalary = async (req,res)=>{
  try{

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success:false,
        message:"Invalid Salary ID"
      });
    }

    const data = await Salary.findByIdAndUpdate(
      id,
      req.body,
      { new:true, runValidators:true }
    );

    if(!data){
      return res.status(404).json({
        success:false,
        message:"Salary structure not found"
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



// ✅ Delete Salary Structure
exports.deleteSalary = async (req,res)=>{
  try{

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success:false,
        message:"Invalid Salary ID"
      });
    }

    const data = await Salary.findByIdAndDelete(id);

    if(!data){
      return res.status(404).json({
        success:false,
        message:"Salary structure not found"
      });
    }

    res.status(200).json({
      success:true,
      message:"Salary deleted successfully"
    });

  }catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    });
  }
};
