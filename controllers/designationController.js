const mongoose = require("mongoose");
const Designation = require("../models/Designation");


// ✅ Create Designation
exports.createDesignation = async (req,res)=>{
  try{

    const { name, basePay, COMPANY } = req.body;

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

    const data = await Designation.create({
      name,
      basePay,
      COMPANY
    });

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



// ✅ Get All Designations
exports.getDesignations = async (req,res)=>{
  try{

    const data = await Designation.find()
    .populate("COMPANY");

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



// ✅ Update Designation
exports.updateDesignation = async (req,res)=>{
  try{

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success:false,
        message:"Invalid Designation ID"
      });
    }

    const data = await Designation.findByIdAndUpdate(
      id,
      req.body,
      { new:true, runValidators:true }
    );

    if(!data){
      return res.status(404).json({
        success:false,
        message:"Designation not found"
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



// ✅ Delete Designation
exports.deleteDesignation = async (req,res)=>{
  try{

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success:false,
        message:"Invalid Designation ID"
      });
    }

    const data = await Designation.findByIdAndDelete(id);

    if(!data){
      return res.status(404).json({
        success:false,
        message:"Designation not found"
      });
    }

    res.status(200).json({
      success:true,
      message:"Designation deleted successfully"
    });

  }catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    });
  }
};
