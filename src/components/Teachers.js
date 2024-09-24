// src/components/Teachers.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await axios.get('http://localhost:5000/api/teachers'); // Update to your teachers API
      setTeachers(response.data);
    };
    fetchTeachers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Teachers</h1>
      <table className="min-w-full border-collapse border border-gray-200 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">Name</th>
            <th className="border border-gray-200 p-2">Teacher ID</th>
            <th className="border border-gray-200 p-2">Salary</th>
            <th className="border border-gray-200 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.teacherID}>
              <td className="border border-gray-200 p-2">{teacher.name}</td>
              <td className="border border-gray-200 p-2">{teacher.teacherID}</td>
              <td className="border border-gray-200 p-2">{teacher.salary}</td>
              <td className="border border-gray-200 p-2">
                {/* Add buttons for edit/delete here */}
                <button className="text-blue-500">Edit</button>
                <button className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teachers;
