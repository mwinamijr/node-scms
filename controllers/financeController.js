const Student = require("../model/student")
const User = require("../model/User")
const {Receipt, Payment } = require("../model/finance")
const passport = require("passport")

// Add receipt
exports.addReceipt = async (req, res) => {
  //our add receipt logic goes here
  try {
    // check if receipt already exists
    // validate if receipt exist in our database
    const oldReceipt = await Receipt.findOne({ receiptNumber: req.body.receiptNumber });

    //console.log(req.body)
    if ( oldReceipt ) {
      return res.status(409).send(` Receipt with number ${req.body.receiptNumber } already exist.`)
    }
    const student = await Student.findOne({firstName: req.body.student})
    const accountant = await User.findOne({firstName: req.body.receivedBy})
    //console.log(student)
    const createReceiptObj = async (req) => {
      return {
        receiptNumber: req.body.receiptNumber,
        receivedFrom: req.body.receivedFrom,
        paidFor: req.body.paidFor,
        student: student,
        amount: req.body.amount,
        receivedBy: req.body.receivedBy
      };
    }

    const newReceipt = await createReceiptObj(req)
    const savedReceipt = await Receipt.create(newReceipt)
    return res.status(200).send({message: "Receipt created successfully!", receipt: savedReceipt})
  } catch (error) {
    
    return res.status(400).send({ message: "Receipt not created!", error: error})
  }
    
}

// update receipt
exports.updateReceipt = async (req, res) => {
  try{
    const updatedReceipt = await Receipt.findByIdAndUpdate(req.params.receiptId, {$set: req.body}, { new: true })
    
    if (!updatedReceipt) {
      return res.status(400).send({ message: "Could not update receipt"})
    }
    return res.status(200).send({ message: "Receipt updated successfully", updatedReceipt})
  } catch (error) {
    //console.log(error)
    res.status(400).send({ error: "An error has occured, unable to update receipt!"})
  }
}

// delete receipt
exports.deleteReceipt = async (req, res) => {
  try {
    const deletedReceipt = await Receipt.findByIdAndDelete(req.params.receiptId) //the await is very important here
    if (!deletedReceipt) {
      return res.status(400).send({ message: " Could not delete receipt"})
    }
    return res.status(200).send({ message: "Receipt deleted successfully"})
  } catch (error) {
    return res.status(400).send({ error: "An error has occurd, unable to delete receipt"})
  }
}

exports.receiptsList = async (req, res, next) => {
  try {
    const receipts = await Receipt.find({})
    res.send(receipts)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
};

exports.receiptDetails = async (req, res, next) => {
  try {
    const receipt = await Receipt.findById(req.params.receiptId)
    res.json(receipt)
  } catch (error) {
    res.status(400).send({ message: "Receipt Not found!"})
  }
}

// Add payment
exports.addPayment = async (req, res) => {
  //our add payment logic goes here
  try {
    // check if payment already exists
    // validate if Payment exist in our database
    const oldPayment = await Payment.findOne({ paymentNumber: req.body.PaymentNumber });

    //console.log(req.body)
    if ( oldPayment ) {
      return res.status(409).send({message:` Payment with number ${req.body.paymentNumber } already exist.`, oldPayment})
    }
    const user = await User.findOne({email: req.body.user})
    const accountant = await User.findOne({firstName: req.body.paidBy})
    //console.log(user)
    const createPaymentObj = async (req) => {
      return {
        paymentNumber: req.body.paymentNumber,
        paidTo: req.body.paidTo,
        paidFor: req.body.paidFor,
        user: user,
        amount: req.body.amount,
        paidBy: req.body.paidBy
      };
    }

    const newPayment = await createPaymentObj(req)
    const savedPayment = await Payment.create(newPayment)
    return res.status(200).send({message: "Payment created successfully!", payment: savedPayment})
  } catch (error) {
    
    return res.status(400).send({ message: "Payment not created!", error: error})
  }
    
}

// update payment
exports.updatePayment = async (req, res) => {
  try{
    const updatedPayment = await Payment.findByIdAndUpdate(req.params.paymentId, {$set: req.body}, { new: true })
    
    if (!updatedPayment) {
      return res.status(400).send({ message: "Could not update payment"})
    }
    return res.status(200).send({ message: "Payment updated successfully", updatedPayment})
  } catch (error) {
    //console.log(error)
    res.status(400).send({ error: "An error has occured, unable to update payment!"})
  }
}

// delete payment
exports.deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.paymentId) //the await is very important here
    if (!deletedPayment) {
      return res.status(400).send({ message: " Could not delete payment"})
    }
    return res.status(200).send({ message: "Payment deleted successfully"})
  } catch (error) {
    return res.status(400).send({ error: "An error has occurd, unable to delete payment"})
  }
}

exports.paymentsList = async (req, res, next) => {
  try {
    const payments = await Payment.find({})
    res.json(payments)
  } catch (error) {
    res.status(400)
    next(error)
  }
};

exports.paymentDetails = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.paymentId)
    res.json(payment)
  } catch (error) {
    res.status(400).send({ message: "Payment Not found!"})
  }
}