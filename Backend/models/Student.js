// models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  studentID: String,
  class: String,
  fathersName: String,
  mothersName: String,
  mobileNumber: String,
  aadharCard: String,
  fees: Number,
  yearOfAdmission: Number,
  address: String
});

module.exports = mongoose.model('Student', StudentSchema);
