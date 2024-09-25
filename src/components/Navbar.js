import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-red-600 p-4 ">
      <div className="lg:mx-28 md:mx-16 mx-0">

        <div className="flex justify-between items-center mb-2">
          <div className="text-white text-lg font-bold">
            School Management
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isOpen ? <FaTimes /> : <FaBars />} {/* Using icons here */}
            </button>
          </div>
          <div className={`hidden md:flex space-x-4`}>
            <Link to="/" className="text-white hover:bg-red-500 px-3 py-2 rounded">
              Dashboard
            </Link>
            <Link to="/students" className="text-white hover:bg-red-500 px-3 py-2 rounded">
              Students
            </Link>
            <Link to="/teachers" className="text-white hover:bg-red-500 px-3 py-2 rounded">
              Teachers
            </Link>
          </div>
        </div>
        <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-red-700 p-2`}>
          <Link to="/" className="text-white block px-3 py-2 rounded">
            Dashboard
          </Link>
          <Link to="/students" className="text-white block px-3 py-2 rounded">
            Students
          </Link>
          <Link to="/teachers" className="text-white block px-3 py-2 rounded">
            Teachers
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
