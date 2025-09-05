// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://college-erp-omega.vercel.app';
export const API_TIMEOUT = 10000; // 10 seconds

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  
  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_STATS: '/admin/stats',
  
  // Faculty
  FACULTY: '/faculty',
  FACULTY_BY_ID: (id: string) => `/faculty/${id}`,
  FACULTY_BY_DEPARTMENT: (deptId: string) => `/faculty/department/${deptId}`,
  
  // Students
  STUDENTS: '/students',
  STUDENT_BY_ID: (id: string) => `/students/${id}`,
  STUDENT_BY_DEPARTMENT: (deptId: string) => `/students/department/${deptId}`,
  
  // Departments
  DEPARTMENTS: '/departments',
  DEPARTMENT_BY_ID: (id: string) => `/departments/${id}`,
  
  // Courses
  COURSES: '/courses',
  COURSE_BY_ID: (id: string) => `/courses/${id}`,
  COURSE_BY_DEPARTMENT: (deptId: string) => `/courses/department/${deptId}`,
  
  // Subjects
  SUBJECTS: '/subjects',
  SUBJECT_BY_ID: (id: string) => `/subjects/${id}`,
  SUBJECT_BY_COURSE: (courseId: string) => `/subjects/course/${courseId}`,
  
  // Notices
  NOTICES: '/notices',
  NOTICE_BY_ID: (id: string) => `/notices/${id}`,
  ACTIVE_NOTICES: '/notices/active',
  
  // Attendance
  ATTENDANCE: '/attendance',
  ATTENDANCE_BY_STUDENT: (studentId: string) => `/attendance/student/${studentId}`,
  ATTENDANCE_BY_SUBJECT: (subjectId: string) => `/attendance/subject/${subjectId}`,
  
  // Results
  RESULTS: '/results',
  RESULTS_BY_STUDENT: (studentId: string) => `/results/student/${studentId}`,
  RESULTS_BY_SUBJECT: (subjectId: string) => `/results/subject/${subjectId}`,
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  FACULTY: 'faculty',
  STUDENT: 'student',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ADMIN: '/admin',
  STAFF_PORTAL: '/staff-portal',
  STUDENT_PORTAL: '/student-portal',
  
  // Admin Routes
  ADMIN_DASHBOARD: '/admin',
  ADMIN_FACULTY_ADD: '/admin/faculty/add',
  ADMIN_FACULTY_REMOVE: '/admin/faculty/remove',
  ADMIN_STUDENT_ADD: '/admin/student/add',
  ADMIN_STUDENT_REMOVE: '/admin/student/remove',
  ADMIN_DEPARTMENT_ADD: '/admin/department/add',
  ADMIN_DEPARTMENT_REMOVE: '/admin/department/remove',
  ADMIN_COURSE_ADD: '/admin/course/add',
  ADMIN_COURSE_REMOVE: '/admin/course/remove',
  ADMIN_SUBJECT_ADD: '/admin/subject/add',
  ADMIN_SUBJECT_REMOVE: '/admin/subject/remove',
  ADMIN_NOTICE_CREATE: '/admin/notice/create',
  ADMIN_SETTINGS: '/admin/settings',
} as const;

// Form Validation
export const VALIDATION_RULES = {
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  PHONE: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    message: 'Please enter a valid phone number'
  },
  PASSWORD: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message: 'Password must be at least 8 characters with uppercase, lowercase, number and special character'
  },
  NAME: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
    message: 'Name must be 2-50 characters and contain only letters and spaces'
  }
} as const;

// UI Constants
export const UI_CONSTANTS = {
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
  
  // Table
  DEFAULT_SORT_FIELD: 'createdAt',
  DEFAULT_SORT_ORDER: 'desc' as const,
  
  // Date Formats
  DATE_FORMAT: 'YYYY-MM-DD',
  DATETIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  DISPLAY_DATE_FORMAT: 'MMM DD, YYYY',
  DISPLAY_DATETIME_FORMAT: 'MMM DD, YYYY HH:mm',
  
  // File Upload
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
  
  // Debounce
  SEARCH_DEBOUNCE: 300, // milliseconds
  
  // Toast
  TOAST_DURATION: 5000, // milliseconds
} as const;

// Status Constants
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  ENROLLED: 'enrolled',
  GRADUATED: 'graduated',
  DROPPED: 'dropped',
} as const;

export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CREATED: 'Successfully created.',
  UPDATED: 'Successfully updated.',
  DELETED: 'Successfully deleted.',
  SAVED: 'Successfully saved.',
  LOGIN_SUCCESS: 'Successfully logged in.',
  LOGOUT_SUCCESS: 'Successfully logged out.',
} as const;
