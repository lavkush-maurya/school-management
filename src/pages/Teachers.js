import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/teachers`); // Update to your teachers API
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };
    fetchTeachers();
  }, []);

  const handleEdit = (teacherID) => {
    console.log(`Edit teacher with ID: ${teacherID}`);
    // Add navigation logic here (e.g., navigate to edit page)
  };

  const handleDelete = async (teacherID) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/teachers/${teacherID}`);
        setTeachers(teachers.filter((teacher) => teacher.teacherID !== teacherID));
      } catch (error) {
        console.error('Error deleting teacher:', error);
      }
    }
  };

  return (
    <div className="p-4 lg:mx-28 md:mx-16 mx-0">
      <h1 className="text-3xl font-bold text-red-600 text-center">Teachers</h1>

      <table className="min-w-full mt-6 border border-collapse border-gray-200 shadow-md rounded-md">
        <thead className="bg-red-500 text-white">
          <tr>
            <th className="p-2 border border-gray-300">No.</th>
            <th className="p-2 border border-gray-300">Teacher ID</th>
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Salary</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, i) => (
            <tr key={teacher.teacherID} className="hover:bg-gray-100 transition duration-150">
              <td className="p-2 border border-gray-300">{i + 1}</td>
              <td className="p-2 border border-gray-300">{teacher.teacherID}</td>
              <td className="p-2 border border-gray-300">{teacher.name}</td>
              <td className="p-2 border border-gray-300">{teacher.salary}</td>
              <td className="p-2 border border-gray-300">
                <button
                  className="text-blue-500 hover:text-blue-600 transition duration-200"
                  onClick={() => handleEdit(teacher.teacherID)}
                >
                  <FaEdit className="inline-block mr-1" /> Edit
                </button>
                <button
                  className="ml-2 text-red-500 hover:text-red-600 transition duration-200"
                  onClick={() => handleDelete(teacher.teacherID)}
                >
                  <FaTrash className="inline-block mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teachers;
