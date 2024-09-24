// models/Teacher.js
const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: String,
  teacherID: String,
  salary: Number,
  mobileNumber: String,
  email: String,
  aadharCard: String,
  address: String
});

module.exports = mongoose.model('Teacher', TeacherSchema);
