const router = require("express").Router();
const company = require("../controllers/companyController");

router.post("/", company.createCompany);
router.get("/", company.getCompanies);
router.get("/:id", company.getCompany);
router.put("/:id", company.updateCompany);
router.delete("/:id", company.deleteCompany);
router.get("/getCompanyEmployees",company.getCompanyEmployees)
module.exports = router;
