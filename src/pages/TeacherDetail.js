import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TeacherDetail = () => {
  const { id } = useParams(); // Get the teacher ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/teachers/${id}`);
        setTeacher(response.data);
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }
    };
    fetchTeacher();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous route
  };

  if (!teacher) {
    return <div className="text-center text-lg py-4">Loading...</div>; // Loading state
  }

  return (
    <div className="p-4 lg:mx-28 md:mx-16 mx-4 my-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">{teacher.name} Details</h1>

      {/* Card for teacher details */}
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><span className="font-semibold text-gray-700">Name:</span> {teacher.name}</p>
          <p><span className="font-semibold text-gray-700">Teacher ID:</span> {teacher.teacherID}</p>
          <p><span className="font-semibold text-gray-700">Salary:</span> ₹{teacher.salary}</p>
          <p><span className="font-semibold text-gray-700">Mobile Number:</span> <a href={`tel:${teacher.mobileNumber}`}>{teacher.mobileNumber}</a></p>
          <p><span className="font-semibold text-gray-700">Email:</span> <a href={`mailto:${teacher.email}`}>{teacher.email}</a></p>
          <p><span className="font-semibold text-gray-700">Aadhar Card:</span> {teacher.aadharCard}</p>
          <p className="md:col-span-2"><span className="font-semibold text-gray-700">Address:</span> {teacher.address}</p>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-6">
        <button 
          onClick={handleBack} 
          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TeacherDetail;
