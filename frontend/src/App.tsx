import { Routes, Route, Navigate } from "react-router"
import HomePage from './pages/HomePage'
import AdminPortal from "./pages/AdminPortal"
import StaffPortal from "./pages/StaffPortal"
import StudentPortal from "./pages/StudentPortal"
import Navbar from "./pages/Navbar"
import LoginPage from "./pages/Login/login"

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-portal" element={<AdminPortal />} />
        <Route path="/staff-portal" element={<StaffPortal />} />
        <Route path="/student-portal" element={<StudentPortal />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
