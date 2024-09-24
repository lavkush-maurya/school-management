// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// CRUD Operations for Students
router.post('/', async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.json(newStudent);
});

router.put('/:id', async (req, res) => {
  const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedStudent);
});

router.delete('/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted' });
});

router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

module.exports = router;
