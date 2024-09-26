import React, { useEffect, useState } from 'react';
import axiosFetch from '../axiosFetch';
import { useParams, useNavigate } from 'react-router-dom';

const StudentDetail = () => {
  const { id } = useParams(); // Get the student ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const response = await axiosFetch.get(`/api/students/${id}`);
      setStudent(response.data);
    };
    fetchStudent();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous route
  };

  if (!student) {
    return <div className="text-center text-lg py-4">Loading...</div>; // Loading state
  }

  return (
    <div className="p-4 mt-20 lg:mx-28 md:mx-16 mx-4 my-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">{student.name} Details</h1>

      {/* Card for student details */}
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><span className="font-semibold text-gray-700">Name:</span> {student.name}</p>
          <p><span className="font-semibold text-gray-700">Roll Number:</span> {student.rollNumber}</p>
          <p><span className="font-semibold text-gray-700">Student ID:</span> {student.studentID}</p>
          <p><span className="font-semibold text-gray-700">Class:</span> {student.class}</p>
          <p><span className="font-semibold text-gray-700">Father's Name:</span> {student.fathersName}</p>
          <p><span className="font-semibold text-gray-700">Mother's Name:</span> {student.mothersName}</p>
          <p><span className="font-semibold text-gray-700">Mobile Number:</span> <a href={`tel:${student.mobileNumber}`}>{student.mobileNumber}</a></p>
          <p><span className="font-semibold text-gray-700">Aadhar Card:</span> {student.aadharCard}</p>
          <p><span className="font-semibold text-gray-700">Fees:</span> {student.fees}</p>
          <p><span className="font-semibold text-gray-700">Year of Admission:</span> {student.yearOfAdmission}</p>
          <p className="md:col-span-2"><span className="font-semibold text-gray-700">Address:</span> {student.address}</p>
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

export default StudentDetail;
