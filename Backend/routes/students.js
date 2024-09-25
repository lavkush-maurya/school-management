// routes/studentRoutes.js
const express = require('express');
const { 
  fetchAllStudents, 
  createStudent, 
  updateStudent, 
  deleteStudent, 
  searchStudents,
  fetchStudentById
} = require('../controller/studentController');

const router = express.Router();

// Route to fetch all students
router.get('/', fetchAllStudents);

// Route to create a new student
router.post('/', createStudent);

// Route to update a student by ID
router.put('/:id', updateStudent);

router.get('/:id', fetchStudentById);

// Route to delete a student by ID
router.delete('/:id', deleteStudent);

router.get('/search', searchStudents);

module.exports = router;
