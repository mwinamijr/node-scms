const mongoose = require("mongoose")
const { model, Schema } = require("mongoose")

const receiptSchema = new mongoose.Schema (
  {
		receiptNumber: { type: Number, unique: true },
		date: { type: Date, default: Date.now },
		receivedFrom: { type: String, lowercase: true },
		paidFor: { type: String, lowercase: true },
		student: { 
			type: Schema.Types.ObjectId,
			ref: "Student",
			default: null
		 },
		amount: { type: Number }
	}
)

const paymentSchema = new mongoose.Schema(
	{
		paymentNumber: { type: Number, unique: true },
		date: { type: Date, default: Date.now },
		paidTo: { type: String, lowercase: true },
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			default: null
		},
		amount: { type: Number }
	}
)

//module.exports = mongoose.model({"Receipt": receiptSchema, "Payment": paymentSchema})
//module.exports = mongoose.model("Payment", paymentSchema)
const Receipt = mongoose.model("Receipt", receiptSchema)
const Payment = mongoose.model("Payment", paymentSchema)

module.exports = { Receipt, Payment }