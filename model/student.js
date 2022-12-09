const { model } = require("mongoose")

mongoose = require("mongoose")

const studentSchema = new mongoose.Schema(
  {
    addmissionNumber: { type: Number, unique: true },
    firstName: { type: String, lowercase: true },
    middleName: { type: String, lowercase: true, default: null },
    lastName: { type: String, lowercase: true },
    gender: {type: String, lowercase:true },
    birthday: { type: Date, default: null },
    classLevel: { type: String, lowercase: true },
    parentContact: { type: String, match: /^[0-9]{10}$/ },
    premsNumber: { type: String, default: null },
    stdViiNumber: { type: String, default: null },
    region: { type: String, default: null, lowercase: true },
    city: { type: String, default: null, lowercase: true },
    street: { type: String, default: null, lowercase: true },
  },
  { timestamps: true}
)

module.exports = mongoose.model("student", studentSchema)