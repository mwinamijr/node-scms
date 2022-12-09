const router = require("express").Router()
const studentController = require("../controllers/studentController")

router.get("/", userController.studentList)
router.get("/:studentId", userController.studentDetails)
router.post("/register", userController.register)
router.post("/login", userController.login)
router.patch("/:studentId", userController.updateStudent)
router.delete("/:studentId", userController.deleteStudent)

module.exports = router