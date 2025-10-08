import { Routes, Route, Navigate } from "react-router";
import HomePage from './pages/HomePage';
import StaffPortal from "./pages/StaffPortal";
import StudentPortal from "./pages/StudentPortal";
import Navbar from "./pages/Navbar";
import LoginPage from "./pages/Login/login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";
// import FacultyLayout from "./components/layout/FacultyLayout";
import StudentLayout from "./components/layout/StudentLayout";

// Admin Components
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddFaculty from "./pages/Admin/features/AddFaculty";
// import AddStudent from "./pages/Admin/features/AddStudent";
import AddSubject from "./pages/Admin/features/AddSubject";
import AddDepartment from "./pages/Admin/features/AddDepartment";
// import CreateNotice from "./pages/Admin/features/CreateNotice";
import GetStudents from "./pages/Admin/features/GetStudents";
import GetFaculty from "./pages/Admin/features/GetFaculty";
import GetSubjects from "./pages/Admin/features/GetSubjects";

// Faculty Components
// import FacultyDashboard from "./pages/Faculty/FacultyDashboard";
// import MarkAttendance from "./pages/Faculty/MarkAttendance";
// import UploadMarks from "./pages/Faculty/UploadMarks";
// import CreateTest from "./pages/Faculty/CreateTest";

// // Student Components
// import StudentDashboard from "./pages/Student/StudentDashboard";
// import StudentAttendance from "./pages/Student/StudentAttendance";
import StudentSubjects from "./pages/Student/StudentSubjects";
import StudentResults from "./pages/Student/StudentResults";
import { useAuthIsAdmin } from "./store/authStore";

function App() {

  const IsAdminLogin = useAuthIsAdmin()

  return (
    <div className="dark bg-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Admin Routes with nested layout */}
        <Route path="/admin" element={
            !IsAdminLogin ?
            <Navigate to="/login" replace /> :
            <AdminLayout />
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="faculty/add" element={<AddFaculty />} />
          {/* <Route path="student/add" element={<AddStudent />} /> */}
          <Route path="subject/add" element={<AddSubject />} />
          <Route path="department/add" element={<AddDepartment />} />
          {/* <Route path="notice/create" element={<CreateNotice />} /> */}
          <Route path="students" element={<GetStudents />} />
          <Route path="faculty" element={<GetFaculty />} />
          <Route path="subjects" element={<GetSubjects />} />
        </Route>

        {/* Faculty Routes with nested layout */}
        {/* <Route path="/faculty" element={
          <ProtectedRoute requiredRole="faculty">
            <FacultyLayout />
          </ProtectedRoute>
        }>
          <Route index element={<FacultyDashboard />} />
          <Route path="attendance" element={<MarkAttendance />} />
          <Route path="upload-marks" element={<UploadMarks />} />
          <Route path="create-test" element={<CreateTest />} />
        </Route> */}

        {/* Student Routes with nested layout */}
        <Route path="/student" element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout />
          </ProtectedRoute>
        }>
          {/* <Route index element={<StudentDashboard />} /> */}
          {/* <Route path="attendance" element={<StudentAttendance />} /> */}
          <Route path="subjects" element={<StudentSubjects />} />
          <Route path="results" element={<StudentResults />} />
        </Route>

        <Route path="/staff-portal" 
          element={
            <ProtectedRoute requiredRole="faculty">
              <StaffPortal />
            </ProtectedRoute>
          } 
        />
        <Route path="/student-portal" 
          element={
            <ProtectedRoute requiredRole="student">
              <StudentPortal />
            </ProtectedRoute>
            } 
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
