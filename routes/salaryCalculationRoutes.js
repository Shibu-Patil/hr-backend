const express = require("express");
const router = express.Router();

// import controller
const salaryCalculationController = require("../controllers/salaryCalculationController");


// ===============================
// ✅ Monthly Salary Calculation
// ===============================
router.post(
  "/calculate",
  salaryCalculationController.calculateMonthlySalary
);


module.exports = router;
