const joi = require("joi")

function registerValidation(data) {
  const schema = joi.object({
    firstName: joi.string().min(4).lowercase().required(),
    lastName: joi.string().min(4).lowercase().required(),
    email: joi.string().min(6).email().required(),
    password: joi.string().min(5).required(),
    phone: joi.string().min(10).max(10),
    isAdmin: joi.boolean()
  })
  return schema.validate(data)
}

function loginValidation(data) {
  const schema = joi.object({
    email: joi.string().min(6).email().required(),
    password: joi.string().min(5).required()
  })
  return schema.validate(data)
}

function studentAddValidation(data) {
  const schema = joi.object({
    addmissionNumber: joi.number().required(),
    firstName: joi.string().min(4).required(),
    lastName: joi.string().min(4).required(),
  })
  return schema.validate(data)
}

module.exports = { registerValidation, loginValidation, studentAddValidation }