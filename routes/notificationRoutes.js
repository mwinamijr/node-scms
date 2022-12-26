const router = require("express").Router()
const notificationController = require("../controllers/notificationController")

router.post("/sms/send", notificationController.sendSms)

module.exports = router