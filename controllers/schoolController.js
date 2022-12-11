const jwt = require("jsonwebtoken")

const ClassLevel = require("../model/school")
const { classLevelValidation } = require("../middleware/school.validation")


//add class level
exports.addClassLevel = async (req, res) => {
  //our add class level logic goes here
  try {
    // validate class level input
    const { error, value } = classLevelValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    // check if class level already exists
    // validate if student exist in our database

    const oldClass = await ClassLevel.findOne({ className: req.body.className });

    if ( oldClass ) {
      return res.status(409).send(` class level with that name already exist.`)
    }

    const createClassLevelObj = async (req) => {
      return {
        className: req.body.className,
        abbr: req.body.abbr,
        value: req.body.value
      };
    }

    const newClass = await createClassLevelObj(req)
    const savedClass = await ClassLevel.create(newClass)
    return res.status(200).send({message: "Class level created successfully!", Class: savedClass})
  } catch (error) {
    console.log(error)
    return res.status(400).send({ message: "Class level not created!", error: error})
  }
    
}

// update class level
exports.updateClassLevel = async (req, res) => {
  try{
    const updatedClassLevel = await ClassLevel.findByIdAndUpdate(req.params.classId, {$set: req.body}, { new: true })
    
    if (!updatedClassLevel) {
      return res.status(400).send({ message: "Could not update class level"})
    }
    return res.status(200).send({ message: "Class level updated successfully", updatedClassLevel})
  } catch (error) {
    res.status(400).send({ error: "An error has occured, unable to update class level!"})
  }
}

// delete class level
exports.deleteClassLevel = async (req, res) => {
  try {
    const deletedClassLevel = await User.findByIdAndDelete(req.params.classId) //the await is very important here
    if (!deletedClassLevel) {
      return res.status(400).send({ message: " Could not delete class level"})
    }
    return res.status(200).send({ message: "Class level deleted successfully"})
  } catch (error) {
    return res.status(400).send({ error: "An error has occurd, unable to delete class level"})
  }
}

exports.classLevelList = async (req, res, next) => {
  try {
    const classes = await ClassLevel.find({})
    res.json(classes)
  } catch (error) {
    res.status(400)
    next(Error)
  }
};

exports.classLevelDetails = async (req, res, next) => {
    try {
        const classLevel = await ClassLevel.findById(req.params.classId)
        res.json(classLevel)
    } catch (error) {
        res.status(400).send({ message: "Class level Not found!"})
    }
}