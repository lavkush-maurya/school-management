// src/components/StudentDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StudentDetail = () => {
  const { id } = useParams(); // Get the student ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const response = await axios.get(`http://localhost:5000/api/students/${id}`);
      setStudent(response.data);
    };
    fetchStudent();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous route
  };

  if (!student) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Student Details</h1>
      <div className="mt-4">
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Roll Number:</strong> {student.rollNumber}</p>
        <p><strong>Student ID:</strong> {student.studentID}</p>
        <p><strong>Class:</strong> {student.class}</p>
        <p><strong>Father's Name:</strong> {student.fathersName}</p>
        <p><strong>Mother's Name:</strong> {student.mothersName}</p>
        <p><strong>Mobile Number:</strong> {student.mobileNumber}</p>
        <p><strong>Aadhar Card:</strong> {student.aadharCard}</p>
        <p><strong>Fees:</strong> {student.fees}</p>
        <p><strong>Year of Admission:</strong> {student.yearOfAdmission}</p>
        <p><strong>Address:</strong> {student.address}</p>
      </div>
      <button onClick={handleBack} className="p-2 mt-4 text-white bg-gray-500">Back</button>
    </div>
  );
};

export default StudentDetail;
