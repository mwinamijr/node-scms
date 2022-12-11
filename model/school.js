const mongoose = require("mongoose")

const classLevelSchema = new mongoose.Schema (
  {
    className: { type: String, lowercase: true, unique: true },
    abbr: { type: String, uppercase: true },
    value: { type: Number }
  }
)

module.exports = mongoose.model("ClassLevel", classLevelSchema)