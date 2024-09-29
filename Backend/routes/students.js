// routes/studentRoutes.js
const express = require("express");
const {
  fetchAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  uploadStudents,
  fetchStudentById,
} = require("../controller/studentController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

// Route to upload CSV file
router.post("/upload", upload.single("file"), uploadStudents);

// Route to fetch all students
router.get("/", fetchAllStudents);

// Route to create a new student
router.post("/", createStudent);

// Route to update a student by ID
router.put("/:id", updateStudent);

router.get("/:id", fetchStudentById);

// Route to delete a student by ID
router.delete("/:id", deleteStudent);

module.exports = router;
