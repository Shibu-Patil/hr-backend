const mongoose = require("mongoose");
const Company = require("../models/Company");
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");



// ✅ Create Company
exports.createCompany = async (req,res)=>{
  try{

    const { name, gst, billingCycleDate } = req.body;

    // 🔥 Basic validation
    if(!name){
      return res.status(400).json({
        success:false,
        message:"Company name is required"
      });
    }

    const company = await Company.create({
      name,
      gst,
      billingCycleDate
    });

    res.status(201).json({
      success:true,
      data:company
    });

  }catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    });
  }
};



// ✅ Get All Companies
exports.getCompanies = async (req,res)=>{
  try{

    const data = await Company.find();

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



// ✅ Get Single Company
exports.getCompany = async (req,res)=>{
  try{

    const { id } = req.params;

    // 🔥 check valid ObjectId
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success:false,
        message:"Invalid company ID"
      });
    }

    const data = await Company.findById(id);

    if(!data){
      return res.status(404).json({
        success:false,
        message:"Company not found"
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



// ✅ Update Company
exports.updateCompany = async (req,res)=>{
  try{

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success:false,
        message:"Invalid company ID"
      });
    }

    const data = await Company.findByIdAndUpdate(
      id,
      req.body,
      { new:true, runValidators:true } // 🔥 important
    );

    if(!data){
      return res.status(404).json({
        success:false,
        message:"Company not found"
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



// ✅ Delete Company
exports.deleteCompany = async (req,res)=>{
  try{

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success:false,
        message:"Invalid company ID"
      });
    }

    const data = await Company.findByIdAndDelete(id);

    if(!data){
      return res.status(404).json({
        success:false,
        message:"Company not found"
      });
    }

    res.status(200).json({
      success:true,
      message:"Company deleted successfully"
    });

  }catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    });
  }
};



exports.getCompanyEmployees = async (req, res) => {
  try {

    const { companyId } = req.params;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success:false,
        message:"Invalid company ID"
      });
    }

    // ✅ Get unique employee IDs from attendance
    const employeeIds = await Attendance.distinct("EMPLOYEE", {
      COMPANY: companyId
    });

    // ✅ Fetch employee details
    const employees = await Employee.find({
      _id: { $in: employeeIds }
    })
    .populate("DESIGNATION")
    .populate("COMPANY");

    res.status(200).json({
      success:true,
      count: employees.length,
      data: employees
    });

  } catch (err) {

    res.status(500).json({
      success:false,
      message:err.message
    });

  }
};