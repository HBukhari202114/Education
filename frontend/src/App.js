import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ChooseUser from './pages/ChooseUser';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
// import Chat from "./components/chat";
import ChatPage from "./components/chat"; 


const App = () => {
  const { currentRole } = useSelector(state => state.user);

  return (
    <Router>
      {currentRole === null &&
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/choose" element={<ChooseUser visitor="normal" />} />
          <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />

          <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
          <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
          <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />

          <Route path="/Adminregister" element={<AdminRegisterPage />} />

          {/* <Route path='*' element={<Navigate to="/" />} />
          {currentRole === "Admin" && <Route path="/admin/chat/:teacherId" element={<ChatPage sender="Admin" receiver="Teacher" />} />}
  {currentRole === "Teacher" && <Route path="/teacher/chat/:adminId" element={<ChatPage sender="Teacher" receiver="Admin" />} />}
  {currentRole === "Student" && <Route path="/student/chat/:parentId" element={<ChatPage sender="Student" receiver="Parent" />} />} */}
  {/* Chat Routes for Admin */}
  {currentRole === "Admin" && (
    <Route path="/admin/chat/:receiverId" element={<ChatPage />} />
  )}

  {/* Chat Routes for Teacher */}
  {currentRole === "Teacher" && (
    <Route path="/teacher/chat/:receiverId" element={<ChatPage />} />
  )}

  {/* Chat Routes for Student */}
  {currentRole === "Student" && (
    <Route path="/student/chat/:receiverId" element={<ChatPage />} />
  )}
        </Routes>}

      {currentRole === "Admin" &&
        <>
          <AdminDashboard />
        </>
      }

      {currentRole === "Student" &&
        <>
          <StudentDashboard />
        </>
      }

      {currentRole === "Teacher" &&
        <>
          <TeacherDashboard />
        </>
      }
    </Router>
  )
}

export default App