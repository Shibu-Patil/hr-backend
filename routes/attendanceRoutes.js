const router = require("express").Router();
const attendance = require("../controllers/attendanceController");

router.post("/", attendance.createAttendance);
router.get("/", attendance.getAttendance);
router.put("/:id", attendance.updateAttendance);
router.delete("/:id", attendance.deleteAttendance);

module.exports = router;
