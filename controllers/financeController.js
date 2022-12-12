const Student = require("../model/student")
const User = require("../model/user")
const Receipt = require("../model/finance")

// Add receipt
exports.addReceipt = async (req, res) => {
  //our add receipt logic goes here
  try {
    // check if receipt already exists
    // validate if receipt exist in our database
    const oldReceipt = await Receipt.findOne({ receiptNumber: req.body.receiptNumber });

    if ( oldReceipt ) {
      return res.status(409).send(` Receipt with number ${req.body.receiptNumber } already exist.`)
    }
    const student = await Student.findOne({firstName: req.body.firstName})
    //console.log(clevel)

    const createReceiptObj = async (req) => {
      return {
        receiptNumber: req.body.receipt,
        receivedFrom: req.body.receivedFrom,
        paidFor: req.body.paidFor,
        lastName: req.body.lastName,
        student: student,
        amount: req.body.amount
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
    const receipts = await Receiot.find({})
    res.json(receipts)
  } catch (error) {
    res.status(400)
    next(error)
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