const router = require("express").Router()
const userController = require("../controllers/userController")

router.get("/", userController.usersList)
router.get("/:userId", userController.userDetails)
router.post("/register", userController.register)
router.post("/login", userController.login)
router.patch("/:userId", userController.updateUser)
router.delete("/:userId", userController.deleteUser)

module.exports = router