import React, { useState , useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
// import Calendar from "react-calendar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MenuBookIcon from "@mui/icons-material/MenuBook";
// import "react-calendar/dist/Calendar.css";
// import { useSelector } from "react-redux";
// import Notice from "../notices/Notice";   temporary
// import ShowNotice from "../notices/ShowNotice"; temperary
import ReplyIcon from "@mui/icons-material/Reply";
import useAdminStore from "../../store/Actions/admin";
const Body = () => {

  const {
    notices,
    allStudent,
    allFaculty,
    allAdmin,
    allDepartment,
    getNotice,
    getAllStudent,
    getAllFaculty,
    getAllAdmin,
    getAllDepartment,
  } = useAdminStore();

  useEffect(() => {
    getNotice({}); // Pass any required parameters
    getAllStudent();
    getAllFaculty();
    getAllAdmin();
    getAllDepartment();
  }, [getNotice, getAllStudent, getAllFaculty, getAllAdmin, getAllDepartment]);

  const [open, setOpen] = useState(false);
  const [openNotice, setOpenNotice] = useState({});

  return (
    <div className="flex-[0.8] mt-3">
    <div className="space-y-5">
      <div className="flex text-gray-400 items-center space-x-2">
        <HomeIcon />
        <h1>Dashboard</h1>
      </div>
      <div className="flex flex-col mr-5 space-y-4 overflow-y-hidden">
        <div className="bg-white h-[8rem] rounded-xl shadow-lg grid grid-cols-4 justify-between px-8 items-center space-x-4">
          <div className="flex items-center space-x-4 border-r-2">
            <EngineeringIcon className="rounded-full py-2 bg-orange-300" sx={{ fontSize: 40 }} />
            <div className="flex flex-col">
              <h1>Faculty</h1>
              <h2 className="text-2xl font-bold">{allFaculty.length}</h2>
            </div>
          </div>
          <div className="flex items-center space-x-4 border-r-2">
            <BoyIcon className="rounded-full py-2 bg-orange-300" sx={{ fontSize: 40 }} />
            <div className="flex flex-col">
              <h1>Student</h1>
              <h2 className="text-2xl font-bold">{allStudent.length}</h2>
            </div>
          </div>
          <div className="flex items-center space-x-4 border-r-2">
            <SupervisorAccountIcon className="rounded-full py-2 bg-orange-300" sx={{ fontSize: 40 }} />
            <div className="flex flex-col">
              <h1>Admin</h1>
              <h2 className="text-2xl font-bold">{allAdmin.length}</h2>
            </div>
          </div>
          <div className="flex items-center space-x-4 ">
            <MenuBookIcon className="rounded-full py-2 bg-orange-300" sx={{ fontSize: 40 }} />
            <div className="flex flex-col">
              <h1>Department</h1>
              <h2 className="text-2xl font-bold">{allDepartment.length}</h2>
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex flex-col space-y-4 w-2/6">
            <div className="bg-white h-[17rem] rounded-xl shadow-lg">
              {/* You can add a calendar or other components here */}
            </div>
          </div>
          <div className="bg-white h-[17rem] w-full rounded-xl shadow-lg flex flex-col pt-3">
            <div className="flex px-3">
              {open && (
                <ReplyIcon onClick={() => setOpen(false)} className="cursor-pointer" />
              )}
              <h1 className="font-bold text-xl w-full text-center">Notices</h1>
            </div>
            {/* <div className="mx-5 mt-5 space-y-3 overflow-y-auto h-[12rem]">
              {!open ? (
                notices.map((notice, idx) => (
                  <div key={idx} onClick={() => {
                    setOpen(true);
                    setOpenNotice(notice);
                  }}>
                    <div>{notice.title}</div> // Replace with your Notice component
                  </div>
                ))
              ) : (
                <div>{openNotice?.description}</div> // Replace with your ShowNotice component
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  </div>
);
};


export default Body;
