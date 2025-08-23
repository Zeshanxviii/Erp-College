import { createBrowserRouter, createRoutesFromElements } from "react-router";
import { Route } from "react-router";
import RootLayout from "./RootLayout";
import Home from "./pages/Home";
import AdminLogin from "./pages/Login/adminLogin";
import StudentLogin from "./pages/Login/studentLogin";
import StaffLogin from "./pages/Login/staffLogin";
import { RouterProvider } from "react-router";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/home" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/staff" element={<StaffLogin />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}