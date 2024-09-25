// src/components/EditStudent.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosFetch from '../axiosFetch';

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
      const response = await axiosFetch.get(`/api/students/${id}`);
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
      await axiosFetch.put(`/api/students/${id}`, student);
      navigate('/students'); // Redirect back to students listing
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleBack = () => {
    navigate('/students'); // Go back to the students list
  };

  return (
    <div className="p-4 lg:mx-28 md:mx-16 mx-4 my-8">
      <h1 className="text-2xl font-bold text-red-600 text-center mb-6">Edit {student.name} Details</h1>

      <div className="flex justify-center mb-4">
        <button 
          onClick={handleBack} 
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition duration-300 ease-in-out"
        >
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 space-y-4">
        
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Name:</label>
          <input 
            type="text" 
            name="name" 
            value={student.name} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" 
            required 
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Roll Number:</label>
          <input 
            type="text" 
            name="rollNumber" 
            value={student.rollNumber} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" 
            required 
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Student ID:</label>
          <input 
            type="text" 
            name="studentID" 
            value={student.studentID} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" 
            required 
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Class:</label>
          <input 
            type="text" 
            name="class" 
            value={student.class} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" 
            required 
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Father's Name:</label>
          <input 
            type="text" 
            name="fathersName" 
            value={student.fathersName} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" 
            required 
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Mother's Name:</label>
          <input 
            type="text" 
            name="mothersName" 
            value={student.mothersName} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" 
            required 
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Mobile Number:</label>
          <input 
            type="text" 
            name="mobileNumber" 
            value={student.mobileNumber} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" 
            required 
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Aadhar Card:</label>
          <input 
            type="text" 
            name="aadharCard" 
            value={student.aadharCard} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" 
            required 
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Fees:</label>
          <input 
            type="number" 
            name="fees" 
            value={student.fees} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" 
            required 
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Year of Admission:</label>
          <input 
            type="number" 
            name="yearOfAdmission" 
            value={student.yearOfAdmission} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" 
            required 
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Address:</label>
          <input 
            type="text" 
            name="address" 
            value={student.address} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" 
            required 
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        >
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
