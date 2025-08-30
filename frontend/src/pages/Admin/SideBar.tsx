import { NavLink } from "react-router";

export default function SideBar () {
    return(
        <div>
            <div className="space-y-8 overflow-y-scroll scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-300 h-[33rem]">
                <NavLink to={""}>
                    Create Profile
                </NavLink>
                <NavLink to={"" }>
                    Create Notice
                </NavLink>
                <NavLink to={"" }>
                    Admin
                </NavLink>
                <NavLink to={"" }>
                    Add Faculty
                </NavLink>
                <NavLink to={"" }>
                    Delete Faculty
                </NavLink>
                <NavLink to={"" }>
                    Add Student
                </NavLink>
                <NavLink to={"" }>
                    Delete Student
                </NavLink>
                <NavLink to={"" }>
                    Add Department
                </NavLink>
                <NavLink to={"" }>
                    Delete Department
                </NavLink>
                <NavLink to={"" }>
                    Add Course
                </NavLink>
                <NavLink to={"" }>
                    Delete Course
                </NavLink>
                <NavLink to={"" }>
                    Add Subject
                </NavLink>
                <NavLink to={"" }>
                    Delete Subject
                </NavLink>
                <NavLink to={"" }>
                    
                </NavLink>

            </div>
        </div>
    )
}