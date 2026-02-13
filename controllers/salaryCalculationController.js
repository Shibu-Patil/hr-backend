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


   // 2️⃣ Group attendance by company
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

      if(att.status === "PRESENT")
          companyMap[companyId].present++;

      if(att.status === "HALF_DAY")
          companyMap[companyId].halfday++;
   });


   // 3️⃣ Get all salary structures (OPTIMIZED)
   const structures = await SalaryStructure.find({
      EMPLOYEE: employeeId
   });

   // create map for fast lookup
   const structureMap = {};

   structures.forEach(s => {
      structureMap[s.COMPANY.toString()] = s;
   });


   // 4️⃣ Calculate salary
   let totalSalary = 0;
   let breakdown = [];

   for(const companyId in companyMap){

      const structure = structureMap[companyId];

      if(!structure) continue;

      // calculate earnings & deductions
      let totalEarnings = 0;
      let totalDeductions = 0;

      structure.components.forEach(comp => {

         if(comp.type === "EARNING"){
            totalEarnings += comp.amount;
         }

         if(comp.type === "DEDUCTION"){
            totalDeductions += comp.amount;
         }

      });

      const netMonthlySalary = totalEarnings - totalDeductions;

      // calculate working days
      const days =
         companyMap[companyId].present +
         (companyMap[companyId].halfday * 0.5);

      // assume 30 days month (can improve later)
      const perDaySalary = netMonthlySalary / 30;

      const salary = days * perDaySalary;

      totalSalary += salary;

      breakdown.push({
         company: companyMap[companyId].company.name,
         workingDays: days,
         perDaySalary,
         netMonthlySalary,
         salary
      });
   }


   // 5️⃣ Response
   res.json({
      employeeId,
      month,
      year,
      totalSalary,
      breakdown
   });

 }catch(err){
   res.status(500).json({error:err.message});
 }

};
