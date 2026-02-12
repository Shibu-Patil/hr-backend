const router = require("express").Router();
const designation = require("../controllers/designationController");

router.post("/", designation.createDesignation);
router.get("/", designation.getDesignations);
router.put("/:id", designation.updateDesignation);
router.delete("/:id", designation.deleteDesignation);

module.exports = router;
