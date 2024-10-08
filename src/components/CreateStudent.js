import React, { useState } from 'react';
import axiosFetch from '../axiosFetch';
import { useNavigate } from 'react-router-dom';

const CreateStudent = () => {
  const navigate = useNavigate();
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
      await axiosFetch.post(`/api/students`, student);
      navigate('/students');
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const handleBack = () => {
    navigate('/students');
  };

  return (
    <div className="p-4 mt-20 lg:mx-28 md:mx-16 mx-4 my-8">
      <h1 className="text-3xl font-bold text-red-600 text-center mb-6">Create New Student</h1>

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
  <select 
    name="class" 
    value={student.class} 
    onChange={handleChange} 
    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" 
    required
  >
    <option value="">Select Class</option>
    <option value="1st">1st</option>
    <option value="2nd">2nd</option>
    <option value="3rd">3rd</option>
    <option value="4th">4th</option>
    <option value="5th">5th</option>
    <option value="6th">6th</option>
    <option value="7th">7th</option>
    <option value="8th">8th</option>
    <option value="9th">9th</option>
    <option value="10th">10th</option>
    <option value="11th">11th</option>
    <option value="12th">12th</option>
  </select>
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
          Create Student
        </button>
      </form>
    </div>
  );
};

export default CreateStudent;
