// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'faculty' | 'student';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Faculty Types
export interface Faculty {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: string;
  departmentName: string;
  position: string;
  qualification: string;
  experience: number;
  hireDate: string;
  status: 'active' | 'inactive';
}

export interface CreateFacultyData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: string;
  position: string;
  qualification: string;
  experience: number;
}

// Student Types
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: string;
  departmentName: string;
  enrollmentDate: string;
  graduationYear: number;
  status: 'enrolled' | 'graduated' | 'dropped';
}

export interface CreateStudentData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: string;
  graduationYear: number;
}

// Department Types
export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string;
  headOfDepartment?: string;
  totalFaculty: number;
  totalStudents: number;
}

export interface CreateDepartmentData {
  name: string;
  code: string;
  description?: string;
}

// Course Types
export interface Course {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  departmentName: string;
  credits: number;
  duration: number; // in months
  description?: string;
  status: 'active' | 'inactive';
}

export interface CreateCourseData {
  name: string;
  code: string;
  departmentId: string;
  credits: number;
  duration: number;
  description?: string;
}

// Subject Types
export interface Subject {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  departmentName: string;
  courseId: string;
  courseName: string;
  credits: number;
  description?: string;
}

export interface CreateSubjectData {
  name: string;
  code: string;
  departmentId: string;
  courseId: string;
  credits: number;
  description?: string;
}

// Notice Types
export interface Notice {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  targetAudience: 'all' | 'faculty' | 'students' | 'admin';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  expiresAt?: string;
  isActive: boolean;
}

export interface CreateNoticeData {
  title: string;
  content: string;
  targetAudience: 'all' | 'faculty' | 'students' | 'admin';
  priority: 'low' | 'medium' | 'high';
  expiresAt?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Dashboard Stats Types
export interface DashboardStats {
  totalStudents: number;
  totalFaculty: number;
  totalDepartments: number;
  totalCourses: number;
  totalSubjects: number;
  recentEnrollments: number;
  recentGraduations: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  entityType: 'student' | 'faculty' | 'department' | 'course' | 'subject';
  entityId: string;
  userId: string;
  userName: string;
  timestamp: string;
  details?: Record<string, any>;
}
