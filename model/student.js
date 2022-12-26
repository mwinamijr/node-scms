const { model, Schema } = require("mongoose")

mongoose = require("mongoose")

const studentSchema = new mongoose.Schema(
  {
    addmissionNumber: { type: Number, unique: true },
    firstName: { type: String, lowercase: true },
    middleName: { type: String, lowercase: true, default: null },
    lastName: { type: String, lowercase: true },
    gender: {type: String, lowercase:true },
    birthday: { type: Date, default: null },
    classLevel: { 
      type: Schema.Types.ObjectId,
      ref: "ClassLevel"
     },
    parentContact: { type: String, match: /^[0-9]{10}$/ },
    premsNumber: { type: String, default: null },
    stdViiNumber: { type: String, default: null },
    address: {
      region: { type: String, default: null, lowercase: true },
      city: { type: String, default: null, lowercase: true },
      street: { type: String, default: null, lowercase: true },
    },
  },
  { timestamps: true}
)

module.exports = Student = mongoose.model("Student", studentSchema)