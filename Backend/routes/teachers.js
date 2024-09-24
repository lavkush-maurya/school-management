// routes/students.js
const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

// CRUD Operations for Teachers
router.post('/', async (req, res) => {
  const newTeacher = new Teacher(req.body);
  await newTeacher.save();
  res.json(newTeacher);
});

router.put('/:id', async (req, res) => {
  const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTeacher);
});

router.delete('/:id', async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.json({ message: 'Teacher deleted' });
});

router.get('/', async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
});

module.exports = router;
