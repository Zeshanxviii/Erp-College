import axios from "axios";

const API = axios.create({
    baseURL: "https://college-erp-jishans-projects-80682501.vercel.app/",
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
});

API.interceptors.request.use((req) => {
    const user = localStorage.getItem("user");
    
    if (user) {
        try {
            const parsedUser = JSON.parse(user);
            req.headers.Authorization = `Bearer ${parsedUser.token}`;
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
        }
    }

    return req;
});

// Admin

export const adminSignIn = (formData:any) => API.post("/api/admin/login", formData);

export const adminUpdatePassword = (updatedPassword:any) =>
    API.post("/api/admin/updatepassword", updatedPassword);

export const getAllStudent = () => API.get("/api/admin/getallstudent");

export const getAllFaculty = () => API.get("/api/admin/getallfaculty");

export const getAllAdmin = () => API.get("/api/admin/getalladmin");

export const getAllDepartment = () => API.get("/api/admin/getalldepartment");
export const getAllSubject = () => API.get("/api/admin/getallsubject");

export const updateAdmin = (updatedAdmin:any) =>
    API.post("/api/admin/updateprofile", updatedAdmin);

export const addAdmin = (admin:any) => API.post("/api/admin/addadmin", admin);
export const createNotice = (notice:any) =>
    API.post("/api/admin/createnotice", notice);
export const deleteAdmin = (data:any) => API.post("/api/admin/deleteadmin", data);
export const deleteFaculty = (data:any) =>
    API.post("/api/admin/deletefaculty", data);
export const deleteStudent = (data:any) =>
    API.post("/api/admin/deletestudent", data);
export const deleteSubject = (data:any) =>
    API.post("/api/admin/deletesubject", data);
export const deleteDepartment = (data:any) =>
    API.post("/api/admin/deletedepartment", data);

export const getAdmin = (admin:any) => API.post("/api/admin/getadmin", admin);

export const addDepartment = (department:any) =>
    API.post("/api/admin/adddepartment", department);

export const addFaculty = (faculty:any) =>
    API.post("/api/admin/addfaculty", faculty);

export const getFaculty = (department:any) =>
    API.post("/api/admin/getfaculty", department);

export const addSubject = (subject:any) =>
    API.post("/api/admin/addsubject", subject);
export const getSubject = (subject:any) =>
    API.post("/api/admin/getsubject", subject);

export const addStudent = (student: any) =>
    API.post("/api/admin/addstudent", student);

export const getStudent = (student: any) =>
    API.post("/api/admin/getstudent", student);
export const getNotice = (notice: any) => API.post("/api/admin/getnotice", notice);

// Faculty

export const facultySignIn = (formData:any) =>
    API.post("/api/faculty/login", formData);

export const facultyUpdatePassword = (updatedPassword:any) =>
    API.post("/api/faculty/updatepassword", updatedPassword);

export const updateFaculty = (updatedFaculty:any) =>
    API.post("/api/faculty/updateprofile", updatedFaculty);

export const createTest = (test:any) => API.post("/api/faculty/createtest", test);
export const getTest = (test:any) => API.post("/api/faculty/gettest", test);
export const getMarksStudent = (student:any) =>
    API.post("/api/faculty/getstudent", student);
export const uploadMarks = (data:any) => API.post("/api/faculty/uploadmarks", data);
export const markAttendance = (data:any) =>
    API.post("/api/faculty/markattendance", data);

// Student

export const studentSignIn = (formData: any) =>
    API.post("/api/student/login", formData);

export const studentUpdatePassword = (updatedPassword: any) =>
    API.post("/api/student/updatepassword", updatedPassword);

export const updateStudent = (updatedStudent: any) =>
    API.post("/api/student/updateprofile", updatedStudent);
export const getTestResult = (testResult: any) =>
    API.post("/api/student/testresult", testResult);
export const getAttendance = (attendance: any) =>
    API.post("/api/student/attendance", attendance);

