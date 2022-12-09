const router = require("express").Router()
const studentController = require("../controllers/studentController")

router.get("/", studentController.studentsList)
router.get("/:studentId", studentController.studentDetails)
router.post("/addStudent", studentController.addStudent)
router.patch("/:studentId", studentController.updateStudent)
router.delete("/:studentId", studentController.deleteStudent)

module.exports = router