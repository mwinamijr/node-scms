const { model } = require("mongoose")

mongoose = require("mongoose")

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, lowercase: true},
    middleName: { type: String, lowercase: true},
    lastName: { type: String, lowercase: true},
    gender: {type: String, lowercase:true},
    birthday: { type: Date},
    parentContact: { type: String, match: /^[0-9]{10}$/ }
  },
  { timestamps: true}
)

module.exports = monngoose.model("student", studentSchema)