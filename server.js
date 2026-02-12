require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const salaryCalculationRoutes = require("./routes/salaryCalculationRoutes");


const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// IMPORT ROUTES
app.use("/api/company", require("./routes/companyRoutes"));
app.use("/api/designation", require("./routes/designationRoutes"));
app.use("/api/employee", require("./routes/employeeRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/salary", require("./routes/salaryRoutes"));
app.use("/api/salary", salaryCalculationRoutes);


app.get("/", (req,res)=>{
  res.send("HRMS API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log(`Server running on ${PORT}`);
});
