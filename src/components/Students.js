// src/components/Students.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    };
    fetchStudents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Students</h1>
      <table className="min-w-full border-collapse border border-gray-200 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">Name</th>
            <th className="border border-gray-200 p-2">Roll Number</th>
            <th className="border border-gray-200 p-2">Class</th>
            <th className="border border-gray-200 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentID}>
              <td className="border border-gray-200 p-2">{student.name}</td>
              <td className="border border-gray-200 p-2">{student.rollNumber}</td>
              <td className="border border-gray-200 p-2">{student.class}</td>
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

export default Students;
