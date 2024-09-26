import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosFetch from '../axiosFetch';

const EditTeacher = () => {
  const { id } = useParams(); // Get the teacher ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [teacher, setTeacher] = useState({
    name: '',
    teacherID: '',
    salary: '',
    mobileNumber: '',
    email: '',
    aadharCard: '',
    address: ''
  });

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axiosFetch.get(`/api/teachers/${id}`);
        setTeacher(response.data);
      } catch (error) {
        console.error('Error fetching teacher:', error);
      }
    };
    fetchTeacher();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prevTeacher) => ({ ...prevTeacher, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosFetch.put(`/api/teachers/${id}`, teacher);
      navigate('/teachers'); // Redirect back to teachers listing
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  const handleBack = () => {
    navigate('/teachers'); // Go back to the teachers list
  };

  return (
    <div className="p-4 mt-20 lg:mx-28 md:mx-16 mx-4 my-8">
      <h1 className="text-2xl font-bold text-red-600 text-center mb-6">Edit {teacher.name} Details</h1>

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
            value={teacher.name} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" 
            required 
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Teacher ID:</label>
          <input 
            type="text" 
            name="teacherID" 
            value={teacher.teacherID} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" 
            required 
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Salary:</label>
          <input 
            type="text" 
            name="salary" 
            value={teacher.salary} 
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
            value={teacher.mobileNumber} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" 
            required 
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Email:</label>
          <input 
            type="email" 
            name="email" 
            value={teacher.email} 
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
            value={teacher.aadharCard} 
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
            value={teacher.address} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" 
            required 
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        >
          Update Teacher
        </button>
      </form>
    </div>
  );
};

export default EditTeacher;
