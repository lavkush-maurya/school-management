import React, { useEffect, useState } from "react";
import axiosFetch from "../axiosFetch";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchTeachers = async (filter = {}) => {
    try {
      const response = await axiosFetch.get(`/api/teachers`, {
        params: { name: filter },
      });
      setTeachers(response.data);
      if (response.data.length === 0) {
        setMessage("No teachers found.");
      } else {
        setMessage("");
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setMessage("Error fetching teachers.");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    fetchTeachers(searchTerm);
  };

  const handleEdit = (id) => {
    navigate(`/edit-teacher/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await axiosFetch.delete(`/api/teachers/${id}`);
        fetchTeachers();
      } catch (error) {
        console.error("Error deleting teacher:", error);
      }
    }
  };

  const handleRowClick = (teacherID) => {
    navigate(`/teachers/${teacherID}`);
  };

  const handleNewTeacher = () => {
    navigate("/teachers/new");
  };

  return (
    <div className="p-4 mt-20 lg:mx-28 md:mx-16 mx-0">
      <h1 className="text-3xl font-bold text-red-600 text-center">Teachers</h1>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4">
        <button
          onClick={handleNewTeacher}
          className="p-2 mt-2 md:mt-0 text-white bg-red-500 hover:bg-red-600 rounded transition duration-300 ease-in-out"
        >
          New Teacher
        </button>
      </div>

      <div className="mt-4 flex flex-col md:flex-row">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
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

      {teachers.length > 0 && (
        <table className="min-w-full mt-4 border border-collapse border-gray-200 shadow-md rounded-md">
          <thead className="bg-red-500 text-white">
            <tr>
              <th className="p-2 border border-gray-300">No.</th>
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300">Mobile No.</th>
              <th className="p-2 border border-gray-300">Salary</th>
              <th className="p-2 border border-gray-300">Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, i) => (
              <tr key={teacher.teacherID} className="hover:bg-gray-100 transition duration-150">
                <td className="p-2 border border-gray-300 text-center">{i + 1}.</td>
                <td
                  className="p-2 border border-gray-300 text-center cursor-pointer"
                  onClick={() => handleRowClick(teacher._id)}
                >
                  {teacher.name}
                </td>
                <td className="p-2 border border-gray-300 text-center">{teacher.mobileNumber}</td>
                <td className="p-2 border border-gray-300 text-center">{teacher.salary}</td>
                <td className="p-2 border border-gray-300 text-center">
                  <button
                    className="text-blue-500 hover:text-blue-600 transition duration-200"
                    onClick={() => handleEdit(teacher._id)}
                  >
                    <FaEdit className="inline-block mr-1" />
                  </button>
                  <button
                    className="ml-2 text-red-500 hover:text-red-600 transition duration-200"
                    onClick={() => handleDelete(teacher._id)}
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

export default Teachers;
