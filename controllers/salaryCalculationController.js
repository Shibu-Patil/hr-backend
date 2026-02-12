const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const SalaryStructure = require("../models/SalaryStructure");


// Monthly Salary Calculation
exports.calculateMonthlySalary = async (req,res)=>{

 try{

   const { employeeId, month, year } = req.body;

   // 1️⃣ Get attendance for that month
   const startDate = new Date(year, month-1, 1);
   const endDate = new Date(year, month, 0);

   const attendance = await Attendance.find({
      EMPLOYEE: employeeId,
      date: { $gte: startDate, $lte: endDate }
   }).populate("COMPANY");


   // 2️⃣ Group by company
   const companyMap = {};

   attendance.forEach(att => {

      const companyId = att.COMPANY._id.toString();

      if(!companyMap[companyId]){
         companyMap[companyId] = {
            company: att.COMPANY,
            present: 0,
            halfday: 0
         };
      }

      if(att.status === "Present")
          companyMap[companyId].present++;

      if(att.status === "HalfDay")
          companyMap[companyId].halfday++;
   });


   // 3️⃣ Calculate salary per company
   let totalSalary = 0;
   let breakdown = [];

   for(const companyId in companyMap){

      const structure = await SalaryStructure.findOne({
          COMPANY: companyId
      });

      if(!structure) continue;

      const days =
         companyMap[companyId].present +
         (companyMap[companyId].halfday * 0.5);

      const salary = days * structure.perDaySalary;

      totalSalary += salary;

      breakdown.push({
         company: companyMap[companyId].company.name,
         workingDays: days,
         perDaySalary: structure.perDaySalary,
         salary
      });
   }


   res.json({
      employeeId,
      totalSalary,
      breakdown
   });

 }catch(err){
   res.status(500).json({error:err.message});
 }

};
