import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const location = useLocation(); // Get current location

  // Set the active link based on the current path
  const activeLink = location.pathname;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-red-600 p-4 fixed w-full z-20 top-0 left-0 border-b border-red-700">
      <div className="lg:mx-28 md:mx-16 mx-0">
        <div className="flex justify-between items-center mb-2">
          <div className="text-white text-lg font-bold">School Management</div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none" aria-expanded={isOpen}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <div className={`hidden md:flex space-x-4`}>
            <Link
              to="/"
              onClick={handleLinkClick}
              className={`text-white hover:bg-red-500 px-3 py-2 rounded ${activeLink === "/" ? "bg-red-500" : ""}`}
            >
              Dashboard
            </Link>
            <Link
              to="/students"
              onClick={handleLinkClick}
              className={`text-white hover:bg-red-500 px-3 py-2 rounded ${activeLink === "/students" ? "bg-red-500" : ""}`}
            >
              Students
            </Link>
            <Link
              to="/teachers"
              onClick={handleLinkClick}
              className={`text-white hover:bg-red-500 px-3 py-2 rounded ${activeLink === "/teachers" ? "bg-red-500" : ""}`}
            >
              Teachers
            </Link>
            <button
              onClick={handleInstallClick}
              disabled={!deferredPrompt}
              className={`text-white hover:bg-red-500 px-3 py-2 rounded ${!deferredPrompt ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Install
            </button>
          </div>
        </div>
        <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-red-700 p-2`}>
          <Link
            to="/"
            onClick={handleLinkClick}
            className={`text-white block px-3 py-2 rounded ${activeLink === "/" ? "bg-red-500" : ""}`}
          >
            Dashboard
          </Link>
          <Link
            to="/students"
            onClick={handleLinkClick}
            className={`text-white block px-3 py-2 rounded ${activeLink === "/students" ? "bg-red-500" : ""}`}
          >
            Students
          </Link>
          <Link
            to="/teachers"
            onClick={handleLinkClick}
            className={`text-white block px-3 py-2 rounded ${activeLink === "/teachers" ? "bg-red-500" : ""}`}
          >
            Teachers
          </Link>
          <button
            onClick={handleInstallClick}
            disabled={!deferredPrompt}
            className={`text-white block px-3 py-2 rounded ${!deferredPrompt ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Install
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
