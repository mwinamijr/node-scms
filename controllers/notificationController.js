const AfricasTalking = require("africastalking")

const africastalking = AfricasTalking({
	apiKey: process.env.AFRICAS_TALKING_SANDBOX_API_KEY,
	username: 'sandbox'
})

// Send SMS
exports.sendSms = async (req, res) => {
	
	try {
		console.log(req.body.employees)
		const result = await africastalking.SMS.send({
			to: req.body.employees,
			message: req.body.message,
			from: process.env.SENDER
		})
		console.log(result)
		return res.status(200).send({message: "Message was sent successfully!", result: result})
	} catch (error) {
		console.log(error)
		return res.status(400).send({ message: "Message was no sent!", error: error})
	}
}
