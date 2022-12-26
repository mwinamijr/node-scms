const mongoose = require("mongoose")

const classLevelSchema = new mongoose.Schema (
  {
    className: { type: String, lowercase: true, unique: true },
    abbr: { type: String, uppercase: true },
    value: { type: Number }
  }
)

const subjectSchema = new mongoose.Schema (
  {
    subjectName: { type: String, lowercase: true },
    abbr: { type: String, lowercase: true},
    subjectCode: { type: Number, unique: true }
  }
)

const ClassLevel = mongoose.model("ClassLevel", classLevelSchema)
const Subject = mongoose.model("Subject", subjectSchema)

module.exports = { ClassLevel, Subject }