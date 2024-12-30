import './App.css'
import StudentLogin from './components/student/studentpages/studentLogin';
import Mainpage from './landing'
import { BrowserRouter, Routes, Route } from "react-router";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login/student" element={<StudentLogin />} />
        {/* <Route path="/" element={<Mainpage />} /> */}
      </Routes>
    </BrowserRouter>

  )
}

export default App
