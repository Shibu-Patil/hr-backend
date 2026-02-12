const router = require("express").Router();
const salary = require("../controllers/salaryController");

router.post("/", salary.createSalary);
router.get("/", salary.getSalary);
router.put("/:id", salary.updateSalary);
router.delete("/:id", salary.deleteSalary);

module.exports = router;
