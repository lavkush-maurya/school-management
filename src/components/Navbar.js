// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track menu visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu visibility
  };

  return (
    <nav className="bg-red-600 p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-white text-lg font-bold">School Management System</div>
        <div className="md:hidden"> {/* Hamburger Icon for mobile */}
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? '✖' : '☰'} {/* Display X when open, hamburger when closed */}
          </button>
        </div>
        <div className={`hidden md:flex space-x-4`}> {/* Show links in desktop view only */}
          <Link to="/dashboard" className="text-white hover:bg-red-500 hover:text-white px-3 py-2 rounded">
            Dashboard
          </Link>
          <Link to="/students" className="text-white hover:bg-red-500 hover:text-white px-3 py-2 rounded">
            Students
          </Link>
          <Link to="/teachers" className="text-white hover:bg-red-500 hover:text-white px-3 py-2 rounded">
            Teachers
          </Link>
          <Link to="/attendance" className="text-white hover:bg-red-500 hover:text-white px-3 py-2 rounded">
            Attendance
          </Link>
        </div>
      </div>
      {/* Mobile menu items */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-red-700 p-2`}>
        <Link to="/dashboard" className="text-white block px-3 py-2 rounded">
          Dashboard
        </Link>
        <Link to="/students" className="text-white block px-3 py-2 rounded">
          Students
        </Link>
        <Link to="/teachers" className="text-white block px-3 py-2 rounded">
          Teachers
        </Link>
        <Link to="/attendance" className="text-white block px-3 py-2 rounded">
          Attendance
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
