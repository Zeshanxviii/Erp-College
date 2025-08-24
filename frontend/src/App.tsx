import { Routes, Route } from "react-router"
import HomePage from './pages/HomePage'
import AdminPortal from "./pages/Adminportal"
import StaffPortal from "./pages/StaffPortal"
import StudentPortal from "./pages/StudentPortal"
import Navbar from "./pages/Navbar"

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/staff" element={<StaffPortal />} />
        <Route path="/students" element={<StudentPortal />} />
      </Routes>
    </div>
  )
}

export default App
