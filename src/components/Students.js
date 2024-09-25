// src/components/Students.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState({ name: '', class: '', rollNumber: '' });
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchStudents = async (filters = {}) => {
    const response = await axios.get('http://localhost:5000/api/students', { params: filters });
    setStudents(response.data);
  };

  useEffect(() => {
    fetchStudents(); // Fetch all students initially
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    fetchStudents(searchTerm); // Fetch students based on search criteria
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // Redirect to edit page with student ID
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        fetchStudents(); // Refresh the student list after deletion
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleRowClick = (studentID) => {
    navigate(`/students/${studentID}`); // Redirect to the student detail page
  };

  const handleNewStudent = () => {
    navigate('/students/new'); // Redirect to create student page
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Students</h1>
      <button onClick={handleNewStudent} className="p-2 mt-4 text-white bg-green-500">New Student</button>

      <div className="mt-4">
        <input
          type="text"
          name="name"
          placeholder="Search by Name"
          value={searchTerm.name}
          onChange={handleSearchChange}
          className="p-2 mr-2 border"
        />
        <input
          type="text"
          name="class"
          placeholder="Search by Class"
          value={searchTerm.class}
          onChange={handleSearchChange}
          className="p-2 mr-2 border"
        />
        <input
          type="text"
          name="rollNumber"
          placeholder="Search by Roll Number"
          value={searchTerm.rollNumber}
          onChange={handleSearchChange}
          className="p-2 mr-2 border"
        />
        <button onClick={handleSearch} className="p-2 text-white bg-blue-500">Search</button>
      </div>

      <table className="min-w-full mt-4 border border-collapse border-gray-200">
        <thead>
          <tr>
            <th className="p-2 border border-gray-200">No.</th>
            <th className="p-2 border border-gray-200">Name</th>
            <th className="p-2 border border-gray-200">Roll Number</th>
            <th className="p-2 border border-gray-200">Class</th>
            <th className="p-2 border border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, i) => (
            <tr key={student.studentID}>
              <td className="p-2 border border-gray-200">{i + 1}</td>
              <td className="p-2 border border-gray-200" onClick={() => handleRowClick(student._id)}>{student.name}</td>
              <td className="p-2 border border-gray-200">{student.rollNumber}</td>
              <td className="p-2 border border-gray-200">{student.class}</td>
              <td className="p-2 border border-gray-200">
                <button 
                  className="text-blue-500"
                  onClick={() => handleEdit(student._id)} // Call handleEdit on click
                >
                  Edit
                </button>
                <button 
                  className="ml-2 text-red-500" 
                  onClick={() => handleDelete(student._id)} // Call handleDelete on click
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
