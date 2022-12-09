const jwt = require("jsonwebtoken")

const Student = require("../model/student")
const { studentAddValidation } = require("../middleware/validation")
const TOKEN_KEY = process.env.TOKEN_KEY


//Register
exports.addStudent = async (req, res) => {
  //our add student logic goes here
  try {
    
    // validate user input
    const { error, value } = studentAddValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    // check if student already exists
    // validate if student exist in our database

    const oldStudent = await Student.findOne({ email: req.body.addmissionNumber });

    if ( oldStudent ) {
      return res.status(409).send(` Student with admission number ${req.body.addmissionNumber } already exist.`)
    }

    const createStudentObj = async (req) => {
      return {
        addmissionNumber: req.body.addmissionNumber,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        gender: req.body.gender,
        classLevel: req.body.classLevel,
        parentContact: req.body.parentContact,
        region: req.body.region,
        city: req.body.city,
        street: req.body.street,
        premsNumber: req.body.premsNumber,
        stdViiNumber: req.body.stdViiNumber,
      };
    }

    const newstudent = await createStudentObj(req)
    const savedStudent = await Student.create(newstudent)
    return res.status(200).send({message: "Student created successfully!", student: savedStudent})
  } catch (error) {
    console.log(error)
    return res.status(400).send({ message: "Student not created!", error: error})
  }
    
}

// update student
exports.updateStudent = async (req, res) => {
  try{
    const updatedStudent = await User.findByIdAndUpdate(req.params.studentId, {$set: req.body}, { new: true })
    
    if (!updatedStudent) {
      return res.status(400).send({ message: "Could not update student"})
    }
    return res.status(200).send({ message: "Student updated successfully", updatedStudent})
  } catch (error) {
    res.status(400).send({ error: "An error has occured, unable to update student!"})
  }
}

// delete student
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await User.findByIdAndDelete(req.params.studentId) //the await is very important here
    if (!deletedStudent) {
      return res.status(400).send({ message: " Could not delete student"})
    }
    return res.status(200).send({ message: "Student deleted successfully"})
  } catch (error) {
    return res.status(400).send({ error: "An error has occurd, unable to delete user"})
  }
}
exports.studentsList = async (req, res, next) => {
  try {
    const students = await Student.find({})
    res.json(students)
  } catch (error) {
    res.status(400)
    next(Error)
  }
};

exports.studentDetails = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.studentId)
    res.json(student)
  } catch (error) {
    res.status(400).send({ message: "Student Not found!"})
  }
}