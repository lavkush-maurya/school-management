// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import StudentDetail from "./pages/StudentDetail";
import TeacherDetail from "./pages/TeacherDetail";
import CreateStudent from "./components/CreateStudent";
import EditStudent from "./components/EditStudent";
import Navbar from "./components/Navbar";
import CreateTeacher from "./components/Createteacher";
import EditTeacher from "./components/EditTeacher";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/new" element={<CreateStudent />} />
        <Route path="/teachers/new" element={<CreateTeacher />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/teachers/:id" element={<TeacherDetail />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/edit/:id" element={<EditStudent />} />
        <Route path="/edit-teacher/:id" element={<EditTeacher />} />
      </Routes>
    </Router>
  );
};

export default App;
