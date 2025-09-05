import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAdminFetchSubjects, useAdminLoading, useAdminSubjects } from '@/store/adminStore';
import { Search, Edit, Trash2, Eye, BookOpen } from 'lucide-react';

const GetSubjects = () => {
  const getAllSubjects = useAdminFetchSubjects()
  const subjects = useAdminSubjects()
  const loading = useAdminLoading();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);

  useEffect(() => {
    getAllSubjects();
  }, [getAllSubjects]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = subjects.filter(subject =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSubjects(filtered);
    } else {
      setFilteredSubjects(subjects);
    }
  }, [searchTerm, subjects]);

  const getYearLabel = (year: string) => {
    const yearMap: { [key: string]: string } = {
      '1': '1st Year',
      '2': '2nd Year',
      '3': '3rd Year',
      '4': '4th Year'
    };
    return yearMap[year] || year;
  };
//@ts-ignore implement it later
  const getSemesterLabel = (semester: string) => {
    const semesterMap: { [key: string]: string } = {
      '1': '1st Semester',
      '2': '2nd Semester',
      '3': '3rd Semester',
      '4': '4th Semester',
      '5': '5th Semester',
      '6': '6th Semester',
      '7': '7th Semester',
      '8': '8th Semester'
    };
    return semesterMap[semester] || semester;
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading subjects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Subject Management</CardTitle>
          <CardDescription>
            View and manage all subjects in the system
          </CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSubjects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No subjects found
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredSubjects.map((subject) => (
                  <Card key={subject.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                            <div>
                              <h3 className="font-semibold text-lg">{subject.name}</h3>
                              <p className="text-sm text-muted-foreground">{subject.code}</p>
                            </div>
                          </div>
                          <Badge variant="secondary">{subject.credits} Credits</Badge>
                        </div>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{subject.departmentName}</span>
                          <span>•</span>
                          <span>{getYearLabel(subject.code)}</span>
                          <span>•</span>
                          {/* <span>{getSemesterLabel(subject.)}</span> */}
                        </div>
                        {subject.description && (
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {subject.description}
                          </p>
                        )}
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

export default GetSubjects;
