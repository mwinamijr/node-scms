const joi = require("joi")

function classLevelValidation(data) {
  const schema = joi.object({
    className: joi.string().min(4).required(),
    abbr: joi.string(),
    value: joi.number()
  })
  return schema.validate(data)
}

function subjectValidation(data) {
  const schema = joi.object({
    subjectName: joi.string().required(),
    abbr: joi.string(),
    subjectCode: joi.number()
  })
  return schema.validate(data)
}

module.exports = { classLevelValidation, subjectValidation }