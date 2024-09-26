const express = require("express");
const {
  fetchAllTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  fetchTeacherById,
  searchTeachers,
} = require("../controller/teacherController");

const router = express.Router();

// Route to fetch all teachers
router.get("/", fetchAllTeachers);

// Route to create a new teacher
router.post("/", createTeacher);

// Route to update a teacher by ID
router.put("/:id", updateTeacher);

// Route to fetch a teacher by ID
router.get("/:id", fetchTeacherById);

// Route to delete a teacher by ID
router.delete("/:id", deleteTeacher);

// Route to search teachers
router.get("/search", searchTeachers);

module.exports = router;
