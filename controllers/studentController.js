const jwt = require("jsonwebtoken")

const Student = require("../model/student")
const classLevel = require("../model/school")
const { studentAddValidation } = require("../middleware/user.validation")
const TOKEN_KEY = process.env.TOKEN_KEY


//Register
exports.addStudent = async (req, res) => {
  //our add student logic goes here
  try {
    
    /* validate student input
    const { error, value } = studentAddValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message)
    }
    */
   
    // check if student already exists
    // validate if student exist in our database
    const oldStudent = await Student.findOne({ addmissionNumber: req.body.addmissionNumber });

    if ( oldStudent ) {
      return res.status(409).send(` Student with admission number ${req.body.addmissionNumber } already exist.`)
    }
    const clevel = await classLevel.findOne({className: req.body.classLevel})
    //console.log(clevel)

    const createStudentObj = async (req) => {
      return {
        addmissionNumber: req.body.addmissionNumber,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        gender: req.body.gender,
        classLevel: clevel,
        parentContact: req.body.parentContact,
        region: req.body.region,
        address: req.body.address,
        street: req.body.street,
        premsNumber: req.body.premsNumber,
        stdViiNumber: req.body.stdViiNumber,
      };
    }

    const newstudent = await createStudentObj(req)
    const savedStudent = await Student.create(newstudent)
    return res.status(200).send({message: "Student created successfully!", student: savedStudent})
  } catch (error) {
    
    return res.status(400).send({ message: "Student not created!", error: error})
  } 
}

// student create by excel
exports.addStudentsByExcel = async (req, res) => {
  console.log(req.body);
  try {
    let path = req.file.path
    var workbook = XLSX.readFile(path)
    var sheetNameList = workbook.SheetNames
    console.log(workbook)
    let jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]])

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message})
  }
  /*
  const receivedExcelFile = (req.file.path);
  
  console.log(receivedExcelFile);
  async function process () {
    for (let i = 0; i < receivedExcelFile.length; i++) {
      // check if student already exists
      // validate if student exist in our database
      const oldStudent = await Student.findOne({ addmissionNumber: receivedExcelFile[i]['addmissionNumber'] });

      if ( oldStudent ) {
        return res.status(409).send(` Student with admission number ${ receivedExcelFile[i]['addmissionNumber'] } already exist.`)
      }

      const clevel = await classLevel.findOne({className: receivedExcelFile[i]['classLevel']})

      let newStudent = {
        addmissionNumber: receivedExcelFile[i]['addmissionNumber'],
        lastName: receivedExcelFile[i]['firstName'],
        firstName: receivedExcelFile[i]['firstName'],
        gender: receivedExcelFile[i]['gender'],
        birthday: receivedExcelFile[i]['birthday'],
        classLevel: clevel,
        parentContact: receivedExcelFile[i]['parentContact']
      };
      
      // console.log(thisUser);
      //db.get('Students').push(newStudent).write();
    }
  }

   //process();*/
}


// update student
exports.updateStudent = async (req, res) => {
  try{
    const updatedStudent = await Student.findByIdAndUpdate(req.params.studentId, {$set: req.body}, { new: true })
    
    if (!updatedStudent) {
      return res.status(400).send({ message: "Could not update student"})
    }
    return res.status(200).send({ message: "Student updated successfully", updatedStudent})
  } catch (error) {
    console.log(error)
    res.status(400).send({ error: "An error has occured, unable to update student!"})
  }
}

// delete student
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.studentId) //the await is very important here
    if (!deletedStudent) {
      return res.status(400).send({ message: " Could not delete student"})
    }
    return res.status(200).send({ message: "Student deleted successfully"})
  } catch (error) {
    return res.status(400).send({ error: "An error has occurd, unable to delete student"})
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