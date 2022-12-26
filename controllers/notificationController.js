exports.sendSms = async (req, res) => {
	console.log(req.body)
	try {
		conslole.log(req.body)
	} catch (error) {
		return res.status(400).send({ message: "Sms was no sent!", error: error})
	}
}