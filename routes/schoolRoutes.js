const router = require("express").Router()
const schoolController = require("../controllers/schoolController")

router.get("/classes", schoolController.classLevelList)
router.get("/classes/:classId", schoolController.classLevelDetails)
router.post("/classes/addclass", schoolController.addClassLevel)
router.patch("/classes/:classId", schoolController.updateClassLevel)
router.delete("/classes/:classId", schoolController.deleteClassLevel)

module.exports = router