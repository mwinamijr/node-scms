const router = require("express").Router()
const multer = require("multer")
const studentController = require("../controllers/studentController")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function(req, file, cb) {
        cb(null, Date.now()+"-"+file.originalname)
    }
}) 

const upload = multer({ storage: storage})

router.get("/", studentController.studentsList)
router.get("/:studentId", studentController.studentDetails)
router.post("/addStudent", studentController.addStudent)
router.post("/upload", studentController.addStudentsByExcel, upload.single("filename"))
router.patch("/:studentId", studentController.updateStudent)
router.delete("/:studentId", studentController.deleteStudent)

module.exports = router