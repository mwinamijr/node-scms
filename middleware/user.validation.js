const joi = require("joi")

function registerValidation(data) {
  const schema = joi.object({
    firstName: joi.string().min(4).lowercase().required(),
    lastName: joi.string().min(4).lowercase().required(),
    email: joi.string().min(6).email().required(),
    password: joi.string().min(5).required(),
    phone: joi.string().min(10).max(10),
    role: joi.array(),
    isAdmin: joi.boolean(),
    isAccountant: joi.boolean(),
    isTeacher: joi.boolean()
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
    middleName: joi.string().min(4),
    gender: joi.string().min(4).max(6).required(),
    classLevel: joi.string().hex().length().required(),
    parentContact: joi.string().min(10).max(10),
    birthday: joi.date(),
    address: joi.object({
      region: joi.string(),
      city: joi.string(),
      street: joi.string()
    }),
    stdViiNumber: joi.string(),
    premsNumber: joi.string(),
  })
  return schema.validate(data)
}

/*
db.createCollection("Student", {

  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Student Object Validation",
      required: ["addmissionNumber", "firstName", "lastName", "gender", "classLevel"],
      properties: {
        addmissionNumber: {
          bsonType: "int",
          description: "addmission number must be an integer and is required"
        },
        firstName: {
          bsonType: "string",
          description: "first name must be a string and is required"
        },
        middleName: {
          bsonType: "string",
          description: "middle name must be a string and is not required"
        },
        lastName: {
          bsonType: "string",
          description: "last name must be a string and is required"
        },
        gender: {
          bsonType: "string",
          description: "gender must be a string and is required"
        },
        classLevel: {
          bsonType: "objectId",
          description: "first name must be a objectId and is not required"
        },
        parentContact: {
          bsonType: "string",
          description: "parent contact must be a string and is not required"
        },
        stdViiNumber: {
          bsonType: "string",
          description: "std vii number must be a string and is not required"
        },
        premsNumber : {
          bsonType: "string",
          description: "prems number must be a string and is not required"
        },
        address: {
          type: "object",
          properties: {
            region: {
              bsonType: "string",
              description: "region must be a string and is not required"
            },
            city: {
              bsonType: "string",
              description: "city must be a string and is not required"
            },
            street: {
              bsonType: "string",
              description: "street must be a string and is not required"
            },
          }
        }
      }
    }
  }
})
*/

module.exports = { registerValidation, loginValidation, studentAddValidation }