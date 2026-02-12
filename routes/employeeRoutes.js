const router = require("express").Router();
const employee = require("../controllers/employeeController");

router.post("/", employee.createEmployee);
router.get("/", employee.getEmployees);
router.get("/:id", employee.getEmployee);
router.put("/:id", employee.updateEmployee);
router.delete("/:id", employee.deleteEmployee);

module.exports = router;
