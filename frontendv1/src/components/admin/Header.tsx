import React from "react";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../../store/Actions/admin"; // Adjust the import path

const Header: React.FC = () => {
  const { authData, logout } = useAdminStore(); // Get authData and logout from the store
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/login/adminLogin"); // Redirect after logout
  };

  if (!authData) return null; // Render nothing if there's no user logged in

  return (
    <div className="flex-[0.05] flex justify-between items-center mx-5 my-2">
      <div className="flex items-center ">
        <img
          src="https://icon-library.com/images/cms-icon/cms-icon-11.jpg"
          alt=""
          className="h-7"
        />
        <h1 className="font-bold text-blue-600 text-sm">CMS</h1>
      </div>
      <h1 className="font-semibold text-black">Welcome</h1>
      <div className="flex items-center space-x-3">
        <Avatar
          src={authData?.avatar}
          alt={authData?.name.charAt(0)}
          sx={{ width: 24, height: 24 }}
          className="border-blue-600 border-2"
        />
        <h1>{authData?.name.split(" ")[0]}</h1>
        <LogoutIcon
          onClick={handleLogout}
          className="cursor-pointer hover:scale-125 transition-all"
        />
      </div>
    </div>
  );
};

export default Header;
