import {Routes, Route} from 'react-router-dom'
import './App.css'
import MainPage from './components/pages/Mainpage'
import StudentLogin from './components/pages/student/StudentLogin'
import FacultyLogin from './components/pages/faculty/FacultyLogin'
import AdminLogin from './components/pages/admin/AdminLogin'

function App() {
  

  return (
    <>
      <Routes>
        <Route index element={<MainPage/>} />
        <Route path="/login/student" element={<StudentLogin/>} />
        <Route path="/login/faculty" element={<FacultyLogin/>} />
        <Route path="/login/admin" element={<AdminLogin/>} />

        {/*<Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="concerts">
          <Route index element={<ConcertsHome />} />
          <Route path=":city" element={<City />} />
          <Route path="trending" element={<Trending />} /> */}
        {/* </Route> */}
      </Routes>
    </>
  )
}

export default App
