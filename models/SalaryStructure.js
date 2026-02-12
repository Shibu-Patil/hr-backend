const mongoose = require("mongoose");

const SalaryStructureSchema = new mongoose.Schema({

  EMPLOYEE:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Employee",
    required:true
  },

  COMPANY:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Company",
    required:true
  },

  components:[
    {
      name:String, // Basic, HRA, PF
      amount:Number,

      type:{
        type:String,
        enum:["EARNING","DEDUCTION"]
      }
    }
  ]

},{ timestamps:true });

module.exports = mongoose.model("SalaryStructure", SalaryStructureSchema);
