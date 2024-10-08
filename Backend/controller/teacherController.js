const Teacher = require("../models/Teacher");
const { body, validationResult } = require("express-validator");

// Fetch all teachers
exports.fetchAllTeachers = async (req, res) => {
  const { name } = req.query; // Expecting query parameter
  const searchCriteria = {};

  // Check if name is provided and has a length greater than 0
  if (name && name.length > 0) {
    searchCriteria.name = { $regex: name, $options: "i" }; // Case-insensitive search
  }

  try {
    // If searchCriteria is empty, fetch all teachers
    const teachers =
      Object.keys(searchCriteria).length === 0
        ? await Teacher.find()
        : await Teacher.find(searchCriteria);

    // If no teachers are found
    if (teachers.length === 0) {
      return res.status(404).json({ message: "No teachers found." });
    }

    // Return the matching teachers
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new teacher with validation
exports.createTeacher = [
  body("name").notEmpty().withMessage("Name is required"),
  body("teacherID").notEmpty().withMessage("Teacher ID is required"),
  body("salary").isNumeric().withMessage("Salary must be a number"),
  body("mobileNumber")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile Number must be 10 digits"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("aadharCard")
    .isLength({ min: 12, max: 12 })
    .withMessage("Aadhar Card must be 12 digits"),
  body("address").notEmpty().withMessage("Address is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const teacher = new Teacher(req.body);
      await teacher.save();
      res.status(201).json(teacher);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
];

// Update a teacher by ID with validation
exports.updateTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    const teacherToUpdate = await Teacher.findById(id);
    if (!teacherToUpdate) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch a single teacher by ID
exports.fetchTeacherById = async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a teacher by ID
exports.deleteTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

