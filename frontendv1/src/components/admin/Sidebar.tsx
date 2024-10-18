import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AddIcon from "@mui/icons-material/Add";
import BoyIcon from "@mui/icons-material/Boy";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { jwtDecode } from "jwt-decode";
import useAdminStore from "../../store/Actions/adminActions";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";
const isActiveStyle =
  "flex items-center px-5 gap-3 text-blue-600 transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";

interface DecodedToken {
  exp: number; // Expiration time as a Unix timestamp
  iat: number; // Issued at time as a Unix timestamp
  sub?: string; // Subject (can be user ID or similar)
  // Add any additional fields that are included in your JWT
}


interface User {
  token: string;
  // Add other relevant fields if necessary
}

const Sidebar: React.FC = () => {
  const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem("user") || "null"));
  const LOGOUT = useAdminStore(state => state.logout);
  const navigate = useNavigate();

  const logout = () => {
    alert("OOPS! Your session expired. Please login again.");
    LOGOUT();
    navigate("/login/adminLogin");
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token); // Adjust type if you have a specific shape
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("user") || "null"));
  }, [navigate, user]);

  return (
    <div className="flex-[0.2]">
      <div className="space-y-8 overflow-y-scroll scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-300 h-[33rem]">
        <div>
          <NavLink to="/admin/home" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <HomeIcon />
            <h1 className="font-normal">Dashboard</h1>
          </NavLink>
          <NavLink to="/admin/profile" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <AssignmentIndIcon />
            <h1 className="font-normal">Profile</h1>
          </NavLink>
        </div>
        <div>
          <NavLink to="/admin/createNotice" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <AddIcon />
            <h1 className="font-normal">Create Notice</h1>
          </NavLink>
        </div>
        <div>
          <NavLink to="/admin/addadmin" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <AddIcon />
            <h1 className="font-normal">Add Admin</h1>
          </NavLink>
          <NavLink to="/admin/deleteadmin" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <DeleteIcon />
            <h1 className="font-normal">Delete Admin</h1>
          </NavLink>
        </div>
        <div>
          <NavLink to="/admin/adddepartment" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <AddIcon />
            <h1 className="font-normal">Add Department</h1>
          </NavLink>
          <NavLink to="/admin/deletedepartment" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <DeleteIcon />
            <h1 className="font-normal">Delete Department</h1>
          </NavLink>
        </div>
        <div>
          <NavLink to="/admin/allfaculty" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <EngineeringIcon />
            <h1 className="font-normal">Our Faculty</h1>
          </NavLink>
          <NavLink to="/admin/addfaculty" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <AddIcon />
            <h1 className="font-normal">Add Faculty</h1>
          </NavLink>
          <NavLink to="/admin/deletefaculty" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <DeleteIcon />
            <h1 className="font-normal">Delete Faculty</h1>
          </NavLink>
        </div>
        <div>
          <NavLink to="/admin/allstudent" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <BoyIcon />
            <h1 className="font-normal">Our Students</h1>
          </NavLink>
          <NavLink to="/admin/addstudent" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <AddIcon />
            <h1 className="font-normal">Add Students</h1>
          </NavLink>
          <NavLink to="/admin/deletestudent" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <DeleteIcon />
            <h1 className="font-normal">Delete Student</h1>
          </NavLink>
        </div>
        <div>
          <NavLink to="/admin/allsubject" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <MenuBookIcon />
            <h1 className="font-normal">Subjects</h1>
          </NavLink>
          <NavLink to="/admin/addsubject" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <AddIcon />
            <h1 className="font-normal">Add Subject</h1>
          </NavLink>
          <NavLink to="/admin/deletesubject" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <DeleteIcon />
            <h1 className="font-normal">Delete Subject</h1>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
