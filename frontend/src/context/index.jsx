import React from 'react';
import { AdminProvider } from './admin/adminContext';
import { FacultyProvider } from './faculty/facultyContext';
import { StudentProvider } from './student/studentContext';

export const MainProvider = ({ children }) => {
    return (
        <AdminProvider>
            <FacultyProvider>
                <StudentProvider>
                {children}
                </StudentProvider>
            </FacultyProvider>
        </AdminProvider>
    );
};

// Custom hooks (you can place these in a separate file if preferred)
export { useStudent } from './student/studentContext'
export { useAdmin } from './admin/adminContext';
export { useFaculty } from './faculty/facultyContext';