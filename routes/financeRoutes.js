const router = require("express").Router()
const financeController = require("../controllers/financeController")

router.get("/receipts", financeController.receiptsList)
router.get("/receipts/:receiptId", financeController.receiptDetails)
router.post("/receipts/addreceipt", financeController.addReceipt)
router.patch("/receipts/:receiptId", financeController.updateReceipt)
router.delete("/receipts/:receiptId", financeController.deleteReceipt)

module.exports = router