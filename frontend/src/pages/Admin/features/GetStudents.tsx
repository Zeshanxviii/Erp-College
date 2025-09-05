import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import useAdminStore from '@/store/adminStore';
import { Search, Edit, Trash2, Eye } from 'lucide-react';
import { useAdminStudents, useAdminFetchStudents } from '@/store/adminStore';
const GetStudents = () => {
  const { loading } = useAdminStore();
  const students = useAdminStudents();
  const fetchStudents = useAdminFetchStudents();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(students);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = students.filter((student: any) => {
        const fullName = `${student.firstName ?? ''} ${student.lastName ?? ''}`.trim();
        const dept = student.departmentName ?? student.department ?? '';
        const roll = student.rollNo ?? '';
        return (
          fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (student.email ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (roll ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (dept ?? '').toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [searchTerm, students]);

  // Removed unused year/semester helpers after model alignment

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading students...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>
            View and manage all students in the system
          </CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No students found
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredStudents.map((student: any) => (
                  <Card key={student.id ?? student._id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <h3 className="font-semibold text-lg">{`${student.firstName ?? ''} ${student.lastName ?? ''}`.trim()}</h3>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                          {student.rollNo && <Badge variant="secondary">{student.rollNo}</Badge>}
                        </div>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{student.departmentName ?? student.department}</span>
                          <span>•</span>
                          {student.graduationYear && <span>{student.graduationYear}</span>}
                          <span>•</span>
                          {student.enrollmentDate && <span>{new Date(student.enrollmentDate).toLocaleDateString()}</span>}
                          {student.phone && (
                            <>
                              <span>•</span>
                              <span>{student.phone}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GetStudents;
