// src/components/EditStudent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditStudent = () => {
  const { id } = useParams(); // Get the student ID from the URL
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

  useEffect(() => {
    const fetchStudent = async () => {
      const response = await axios.get(`http://localhost:5000/api/students/${id}`);
      setStudent(response.data);
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/students/${id}`, student);
      navigate('/students'); // Redirect back to students listing
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous route
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Edit Student</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={student.name} onChange={handleChange} className="w-full p-2 border" />
        </div>
        <div>
          <label>Roll Number:</label>
          <input type="text" name="rollNumber" value={student.rollNumber} onChange={handleChange} className="w-full p-2 border" />
        </div>
        <div>
          <label>Student ID:</label>
          <input type="text" name="studentID" value={student.studentID} onChange={handleChange} className="w-full p-2 border" />
        </div>
        <div>
          <label>Class:</label>
          <input type="text" name="class" value={student.class} onChange={handleChange} className="w-full p-2 border" />
        </div>
        <div>
          <label>Father's Name:</label>
          <input type="text" name="fathersName" value={student.fathersName} onChange={handleChange} className="w-full p-2 border" />
        </div>
        <div>
          <label>Mother's Name:</label>
          <input type="text" name="mothersName" value={student.mothersName} onChange={handleChange} className="w-full p-2 border" />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input type="text" name="mobileNumber" value={student.mobileNumber} onChange={handleChange} className="w-full p-2 border" />
        </div>
        <div>
          <label>Aadhar Card:</label>
          <input type="text" name="aadharCard" value={student.aadharCard} onChange={handleChange} className="w-full p-2 border" />
        </div>
        <div>
          <label>Fees:</label>
          <input type="number" name="fees" value={student.fees} onChange={handleChange} className="w-full p-2 border" />
        </div>
        <div>
          <label>Year of Admission:</label>
          <input type="number" name="yearOfAdmission" value={student.yearOfAdmission} onChange={handleChange} className="w-full p-2 border" />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={student.address} onChange={handleChange} className="w-full p-2 border" />
        </div>
        <button type="submit" className="p-2 mt-4 text-white bg-blue-500">Update Student</button>
      </form>
      <button onClick={handleBack} className="p-2 mt-4 ml-4 text-white bg-gray-500">Back</button>
    </div>
  );
};

export default EditStudent;
