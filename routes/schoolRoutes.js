const router = require("express").Router()
const schoolController = require("../controllers/schoolController")

router.get("/classes", schoolController.classLevelList)
router.get("/classes/:classId", schoolController.classLevelDetails)
router.post("/classes/addclass", schoolController.addClassLevel)
router.patch("/classes/:classId", schoolController.updateClassLevel)
router.delete("/classes/:classId", schoolController.deleteClassLevel)

router.get("/subjects", schoolController.subjectList)
router.get("/subjects/:subjectId", schoolController.subjectDetails)
router.post("/subjects/addsubject", schoolController.addSubject)
router.patch("/subjects/:subjectId", schoolController.updateSubject)
router.delete("/subjects/:subjectId", schoolController.deleteSubject)

module.exports = router