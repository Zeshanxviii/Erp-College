import axios from 'axios';

// Import or define types for admin login
export interface AdminLoginData {
  username: string;
  password: string;
}

// Define FacultyCreateData type (replace fields as needed)
export interface FacultyCreateData {
  name: string;
  departmentId: string;
  email: string;
  // Add other fields as required
}

// Define FacultyResponse type (replace fields as needed)
export interface FacultyResponse {
  id: string;
  name: string;
  departmentId: string;
  email: string;
  // Add other fields as required
}

// Define DepartmentCreateData type (replace fields as needed)
export interface DepartmentCreateData {
  name: string;
  // Add other fields as required
}

// Define DepartmentResponse type (replace fields as needed)
export interface DepartmentResponse {
  id: string;
  name: string;
  // Add other fields as required
}

// Define StudentCreateData type (replace fields as needed)
export interface StudentCreateData {
  name: string;
  email: string;
  departmentId: string;
  // Add other fields as required
}

// Define StudentResponse type (replace fields as needed)
export interface StudentResponse {
  id: string;
  name: string;
  email: string;
  departmentId: string;
  // Add other fields as required
}

// Define SubjectCreateData type (replace fields as needed)
export interface SubjectCreateData {
  name: string;
  code: string;
  departmentId: string;
  // Add other fields as required
}

// Define SubjectResponse type (replace fields as needed)
export interface SubjectResponse {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  // Add other fields as required
}

// Define CourseResponse type (replace fields as needed)
export interface CourseResponse {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  // Add other fields as required
}

// Define UpdateTestResultsData type (replace fields as needed)
export interface UpdateTestResultsData {
  studentId: string;
  subjectId: string;
  testResults: {
    testName: string;
    score: number;
    // Add other fields as required
  }[];
}

// Define CreateAttendanceData type (replace fields as needed)
export interface CreateAttendanceData {
  studentId: string;
  subjectId: string;
  date: string; // ISO date string
  status: 'present' | 'absent';
  // Add other fields as required
}

// Define AttendanceResponse type (replace fields as needed)
export interface AttendanceResponse {
  id: string;
  studentId: string;
  subjectId: string;
  date: string;
  status: 'present' | 'absent';
  // Add other fields as required
}

// Define TestResultsResponse type (replace fields as needed)
export interface TestResultsResponse {
  id: string;
  studentId: string;
  subjectId: string;
  testResults: {
    testName: string;
    score: number;
    // Add other fields as required
  }[];
}

export interface AdminLoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    // Add other fields as needed
  };
}

// Base configuration
const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authorization token
api.interceptors.request.use(config => {
  const userType = localStorage.getItem('userType');
  const token = localStorage.getItem(`${userType}Token`);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

// API endpoints
const apiService = {
  // Admin endpoints
admin: {
    login: (data: AdminLoginData) => api.post<AdminLoginResponse>('/admin/login', data),
    logout: () => api.post<void>('/admin/logout'),
    createDepartment: (data: DepartmentCreateData) => api.post<DepartmentResponse>('/admin/department', data),
    createFaculty: (data: FacultyCreateData) => api.post<FacultyResponse>('/admin/faculty', data),
    createStudent: (data: StudentCreateData) => api.post<StudentResponse>('/admin/student', data),
    createSubject: (data: SubjectCreateData) => api.post<SubjectResponse>('/admin/subject', data),
    getDepartments: () => api.get<DepartmentResponse[]>('/admin/departments'),
    getFaculty: () => api.get<FacultyResponse[]>('/admin/faculty'),
    getStudents: () => api.get<StudentResponse[]>('/admin/students'),
    getSubjects: () => api.get<SubjectResponse[]>('/admin/subjects'),
    // Add more endpoints as needed
  },

  // Faculty endpoints
faculty: {
    login: (data: { username: string; password: string }) => api.post<{ token: string; user: { id: string; username: string } }>('/faculty/login', data),
    logout: () => api.post<void>('/faculty/logout'),
    getCourses: () => api.get<CourseResponse[]>('/faculty/courses'),
    createAttendance: (data: CreateAttendanceData) => api.post<AttendanceResponse>('/faculty/attendance', data),
    updateTestResults: (data: UpdateTestResultsData) => api.put<TestResultsResponse>('/faculty/test-results', data),
    // Add more endpoints as needed
  },

  // Student endpoints
student: {
    login: (data: { username: string; password: string }) => api.post<{ token: string; user: { id: string; username: string } }>('/student/login', data),
    logout: () => api.post<void>('/student/logout'),
    getAttendance: (id: string) => api.get<AttendanceResponse[]>(`/student/attendance/${id}`),
    getSubjects: (id: string) => api.get<SubjectResponse[]>(`/student/subjects/${id}`),
    getTestResults: (id: string) => api.get<TestResultsResponse[]>(`/student/test-results/${id}`),
    // Add more endpoints as needed
  }
};

export default apiService;
