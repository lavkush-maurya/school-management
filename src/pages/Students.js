import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    name: "",
    class: "",
    rollNumber: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchStudents = async (filters = {}) => {
    try {
      const response = await axios.get("http://localhost:5000/api/students", {
        params: filters,
      });
      setStudents(response.data);
      if (response.data.length === 0) {
        setMessage("No students found.");
      } else {
        setMessage("");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setMessage("Error fetching students.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    fetchStudents(searchTerm);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const handleRowClick = (studentID) => {
    navigate(`/students/${studentID}`);
  };

  const handleNewStudent = () => {
    navigate("/students/new");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/students/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Data uploaded successfully!");

      if (response.data.errorsFile) {
        const link = document.createElement("a");
        link.href = response.data.errorsFile;
        link.download = "error-students.csv";
        link.click();
      }

      fetchStudents();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed.");
    }
  };

  return (
    <div className="p-4 lg:mx-28 md:mx-16 mx-0">
      <h1 className="text-3xl font-bold text-red-600 text-center">Students</h1>
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4">
        <button
          onClick={handleNewStudent}
          className="p-2 mt-2 md:mt-0 text-white bg-red-500 hover:bg-red-600 rounded transition duration-300 ease-in-out"
        >
          New Student
        </button>
        <label className="ml-0 md:ml-4 p-2 mt-2 md:mt-0 text-white bg-blue-500 hover:bg-blue-600 cursor-pointer rounded transition duration-300 ease-in-out">
          Upload Student Data
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-col md:flex-row">
        <input
          type="text"
          name="name"
          placeholder="Search by Name"
          value={searchTerm.name}
          onChange={handleSearchChange}
          className="p-2 mr-0 md:mr-2  border border-gray-300 rounded"
        />

        {/* Dropdown for Class Selection */}
        <select
          name="class"
          value={searchTerm.class}
          onChange={handleSearchChange}
          className="p-2 mr-0 md:mr-2 border border-gray-300 rounded"
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

        <input
          type="text"
          name="rollNumber"
          placeholder="Search by Roll Number"
          value={searchTerm.rollNumber}
          onChange={handleSearchChange}
          className="p-2 mr-0 md:mr-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSearch}
          className="p-2 mt-2 md:mt-0 text-white bg-blue-500 hover:bg-blue-400 rounded"
        >
          Search
        </button>
      </div>

      {message && <div className="mt-4 text-red-500">{message}</div>}

      {students.length > 0 && (
        <table className="min-w-full mt-4 border border-collapse border-gray-200 shadow-md rounded-md">
          <thead className="bg-red-500 text-white">
            <tr>
              <th className="p-2 border border-gray-300">No.</th>
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300">Roll No.</th>
              <th className="p-2 border border-gray-300">Class</th>
              <th className="p-2 border border-gray-300">Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => (
              <tr key={student.studentID} className="hover:bg-gray-100 transition duration-150">
                <td className="p-2 border border-gray-300 text-center">{i + 1}.</td>
                <td
                  className="p-2 border border-gray-300 text-center cursor-pointer"
                  onClick={() => handleRowClick(student._id)}
                >
                  {student.name}
                </td>
                <td className="p-2 border border-gray-300 text-center">{student.rollNumber}</td>
                <td className="p-2 border border-gray-300 text-center">{student.class}</td>
                <td className="p-2 border border-gray-300 text-center">
                  <button
                    className="text-blue-500 hover:text-blue-600 transition duration-200"
                    onClick={() => handleEdit(student._id)}
                  >
                    <FaEdit className="inline-block mr-1" />
                  </button>
                  <button
                    className="ml-2 text-red-500 hover:text-red-600 transition duration-200"
                    onClick={() => handleDelete(student._id)}
                  >
                    <FaTrash className="inline-block mr-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Students;
