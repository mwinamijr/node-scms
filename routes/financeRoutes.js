const router = require("express").Router()
const financeController = require("../controllers/financeController")

router.get("/receipts", financeController.receiptsList)
router.get("/receipts/:receiptId", financeController.receiptDetails)
router.post("/receipts/addreceipt", financeController.addReceipt)
router.patch("/receipts/:receiptId", financeController.updateReceipt)
router.delete("/receipts/:receiptId", financeController.deleteReceipt)
router.get("/payments", financeController.paymentsList)
router.get("/payments/:paymentId", financeController.paymentDetails)
router.post("/payments/addpayment", financeController.addPayment)
router.patch("/payments/:paymentId", financeController.updatePayment)
router.delete("/payments/:paymentId", financeController.deletePayment)

module.exports = router