// controllers/studentController.js
const Student = require("../models/Student");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const csv = require("fast-csv");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
// Multer setup for file upload
const upload = multer({ dest: "uploads/" });

exports.uploadStudents = async (req, res) => {
  const fileRows = [];
  const errorRows = [];
  const errorFilePath = path.join(__dirname, "../uploads/error-students.csv");

  // Read and parse the CSV file
  fs.createReadStream(req.file.path)
    .pipe(csv.parse({ headers: true }))
    .on("data", async (row) => {
      try {
        // Validate and create student data
        const existingStudent = await Student.findOne({
          rollNumber: row.rollNumber,
          class: row.class,
        });

        if (existingStudent) {
          throw new Error("Duplicate roll number in class");
        }

        const newStudent = new Student(row);
        await newStudent.save();
      } catch (error) {
        // Store rows with errors
        errorRows.push(row);
      }
    })
    .on("end", async () => {
      fs.unlinkSync(req.file.path); // Remove the uploaded CSV file after reading

      if (errorRows.length > 0) {
        // Generate a CSV with errors
        const writeStream = fs.createWriteStream(errorFilePath);
        csv.write(errorRows, { headers: true }).pipe(writeStream);

        writeStream.on("finish", () => {
          // Return the path to the error CSV file
          return res.status(200).json({
            message: "Upload completed with errors.",
            errorsFile: `${process.env.BASE_URL}/uploads/error-students.csv`, // Send the URL
          });
        });
      } else {
        res
          .status(200)
          .json({ message: "All students uploaded successfully!" });
      }
    });
};

// Fetch all students
exports.fetchAllStudents = async (req, res) => {
  const { name, class: studentClass, rollNumber } = req.query; // Expecting query parameters
  const searchCriteria = {};

  // Check if name is provided and has a length greater than 0
  if (name && name.length > 0) {
    searchCriteria.name = { $regex: name, $options: "i" }; // Case-insensitive search
  }

  // Check if class is provided and has a length greater than 0
  if (studentClass && studentClass.length > 0) {
    searchCriteria.class = studentClass;
  }

  // Check if rollNumber is provided and has a length greater than 0
  if (rollNumber && rollNumber.length > 0) {
    searchCriteria.rollNumber = rollNumber;
  }

  try {
    // If searchCriteria is empty, fetch all students
    const students =
      Object.keys(searchCriteria).length === 0
        ? await Student.find()
        : await Student.find(searchCriteria);

    // If no students are found
    if (students.length === 0) {
      return res.status(404).json({ message: "No students found." });
    }

    // Return the matching students
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new student with validation
exports.createStudent = [
  body("name").notEmpty().withMessage("Name is required"),
  body("rollNumber").notEmpty().withMessage("Roll Number is required"),
  body("class").notEmpty().withMessage("Class is required"),
  body("fathersName").notEmpty().withMessage("Father's Name is required"),
  body("mothersName").notEmpty().withMessage("Mother's Name is required"),
  body("mobileNumber")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile Number must be 10 digits"),
  body("aadharCard")
    .isLength({ min: 12, max: 12 })
    .withMessage("Aadhar Card must be 12 digits"),
  body("fees").isNumeric().withMessage("Fees must be a number"),
  body("yearOfAdmission")
    .isNumeric()
    .withMessage("Year of Admission must be a number"),
  body("address").notEmpty().withMessage("Address is required"),

  // Custom validation to check for unique roll number within the same class
  async (req, res, next) => {
    const { rollNumber, class: studentClass } = req.body;

    const existingStudent = await Student.findOne({
      rollNumber,
      class: studentClass,
    });
    if (existingStudent) {
      return res.status(400).json({
        errors: [{ msg: "Roll Number must be unique within the same class." }],
      });
    }

    next();
  },

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const student = new Student(req.body);
      await student.save();
      res.status(201).json(student);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
];

// Update a student by ID with validation
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { rollNumber, class: studentClass } = req.body;

  try {
    // Find the student being updated
    const studentToUpdate = await Student.findById(id);
    if (!studentToUpdate) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if the rollNumber or class has changed
    const rollNumberChanged =
      rollNumber && rollNumber !== studentToUpdate.rollNumber;
    const classChanged = studentClass && studentClass !== studentToUpdate.class;

    if (rollNumberChanged || classChanged) {
      // Check for uniqueness if the roll number or class has changed
      const existingStudent = await Student.findOne({
        rollNumber: rollNumberChanged ? rollNumber : studentToUpdate.rollNumber,
        class: classChanged ? studentClass : studentToUpdate.class,
      });

      if (existingStudent) {
        return res.status(400).json({
          errors: [
            { msg: "Roll Number must be unique within the same class." },
          ],
        });
      }
    }

    // Proceed to update the student
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Search students based on name, class, and roll number
exports.searchStudents = async (req, res) => {
  const { name, class: studentClass, rollNumber } = req.query; // Expecting query parameters
  const searchCriteria = {};

  // Check if name is provided and has a length greater than 0
  if (name && name.length > 0) {
    searchCriteria.name = { $regex: name, $options: "i" }; // Case-insensitive search
  }

  // Check if class is provided and has a length greater than 0
  if (studentClass && studentClass.length > 0) {
    searchCriteria.class = studentClass;
  }

  // Check if rollNumber is provided and has a length greater than 0
  if (rollNumber && rollNumber.length > 0) {
    searchCriteria.rollNumber = rollNumber;
  }

  try {
    // Search for students based on the constructed criteria
    const students = await Student.find(searchCriteria);

    // If no students are found
    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found matching the criteria." });
    }

    // Return the matching students
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch a single student by ID
exports.fetchStudentById = async (req, res) => {
  const { id } = req.params; // Get the ID from the URL parameters

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student); // Return the student data
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
