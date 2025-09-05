import  { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useStudentStore from '@/store/studentStore';
import { BookOpen, Clock, User, Calendar, GraduationCap, MapPin } from 'lucide-react';

const StudentSubjects = () => {
  const { 
    fetchSubjects, 
    subjects,
    loading 
  } = useStudentStore();

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const getYearLabel = (year: string) => {
    const yearMap: { [key: string]: string } = {
      '1': '1st Year',
      '2': '2nd Year',
      '3': '3rd Year',
      '4': '4th Year'
    };
    return yearMap[year] || year;
  };

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
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading subjects...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Subjects</h1>
        <p className="text-gray-600">View all your enrolled subjects for this semester</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Subjects</p>
                <p className="text-2xl font-bold text-gray-900">{subjects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Credits</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subjects.reduce((sum, subject) => sum + (subject.credits || 0), 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Department</p>
                <p className="text-lg font-bold text-gray-900">
                  {subjects.length > 0 ? subjects[0].department : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Current Semester</p>
                <p className="text-lg font-bold text-gray-900">
                  {subjects.length > 0 ? getSemesterLabel(subjects[0].semester) : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subjects List */}
      <Card>
        <CardHeader>
          <CardTitle>Enrolled Subjects</CardTitle>
          <CardDescription>
            Detailed information about each subject you're enrolled in
          </CardDescription>
        </CardHeader>
        <CardContent>
          {subjects.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p>No subjects enrolled yet</p>
              <p className="text-sm">Contact your academic advisor for enrollment</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {subjects.map((subject) => (
                <Card key={subject._id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{subject.name}</h3>
                          <p className="text-sm text-gray-600 font-mono">{subject.code}</p>
                        </div>
                        <Badge variant="secondary">{subject.credits} Credits</Badge>
                      </div>

                      {subject.description && (
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {subject.description}
                        </p>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span><strong>Department:</strong> {subject.department}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="h-4 w-4 text-gray-500" />
                          <span><strong>Year:</strong> {getYearLabel(subject.year)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span><strong>Semester:</strong> {getSemesterLabel(subject.semester)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span><strong>Faculty:</strong> {subject.faculty || 'TBD'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        View Schedule
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Academic Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Calendar</CardTitle>
          <CardDescription>
            Important dates and deadlines for this semester
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Upcoming Events</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Mid-Term Examinations</p>
                    <p className="text-sm text-gray-600">Week 8-9</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Assignment Due Dates</p>
                    <p className="text-sm text-gray-600">Check individual subjects</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium">Final Examinations</p>
                    <p className="text-sm text-gray-600">End of semester</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Quick Actions</h4>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Download Course Materials
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Class Schedule
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <User className="h-4 w-4 mr-2" />
                  Contact Faculty
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Academic Calendar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentSubjects;

