// src/components/CreateStudent.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateStudent = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [student, setStudent] = useState({
    name: '',
    rollNumber: '',
    studentID: '',
    class: '',
    fathersName: '',
    mothersName: '',
    mobileNumber: '',
    aadharCard: '',
    fees: '',
    yearOfAdmission: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/students', student);
      navigate('/students'); // Redirect to students listing
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const handleBack = () => {
    navigate('/students'); // Navigate back to students listing
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Create New Student</h1>
      <button onClick={handleBack} className="p-2 mt-4 text-black bg-gray-300">
        Back
      </button>
      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={student.name} onChange={handleChange} className="w-full p-2 border" required />
        </div>
        <div>
          <label>Roll Number:</label>
          <input type="text" name="rollNumber" value={student.rollNumber} onChange={handleChange} className="w-full p-2 border" required />
        </div>
        <div>
          <label>Student ID:</label>
          <input type="text" name="studentID" value={student.studentID} onChange={handleChange} className="w-full p-2 border" required />
        </div>
        <div>
          <label>Class:</label>
          <input type="text" name="class" value={student.class} onChange={handleChange} className="w-full p-2 border" required />
        </div>
        <div>
          <label>Father's Name:</label>
          <input type="text" name="fathersName" value={student.fathersName} onChange={handleChange} className="w-full p-2 border" required />
        </div>
        <div>
          <label>Mother's Name:</label>
          <input type="text" name="mothersName" value={student.mothersName} onChange={handleChange} className="w-full p-2 border" required />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input type="text" name="mobileNumber" value={student.mobileNumber} onChange={handleChange} className="w-full p-2 border" required />
        </div>
        <div>
          <label>Aadhar Card:</label>
          <input type="text" name="aadharCard" value={student.aadharCard} onChange={handleChange} className="w-full p-2 border" required />
        </div>
        <div>
          <label>Fees:</label>
          <input type="number" name="fees" value={student.fees} onChange={handleChange} className="w-full p-2 border" required />
        </div>
        <div>
          <label>Year of Admission:</label>
          <input type="number" name="yearOfAdmission" value={student.yearOfAdmission} onChange={handleChange} className="w-full p-2 border" required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={student.address} onChange={handleChange} className="w-full p-2 border" required />
        </div>
        <button type="submit" className="p-2 mt-4 text-white bg-blue-500">Create Student</button>
      </form>
    </div>
  );
};

export default CreateStudent;
