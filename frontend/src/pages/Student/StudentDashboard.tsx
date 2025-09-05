import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import  useStudentStore  from '@/store/studentStore';
import { useAuthStore } from '@/store/authStore';

const StudentDashboard = () => {
  const { user } = useAuthStore();
  const { 
    getStudentStats, 
    getStudentSubjects, 
    getAttendanceSummary,
    getRecentResults,
    stats,
    subjects,
    attendanceSummary,
    recentResults,
    loading 
  } = useStudentStore();

  useEffect(() => {
    if (user) {
      getStudentStats();
      getStudentSubjects();
      getAttendanceSummary();
      getRecentResults();
    }
  }, [user, getStudentStats, getStudentSubjects, getAttendanceSummary, getRecentResults]);

  const calculateAttendancePercentage = (present: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((present / total) * 100);
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-green-100">
          Here's your academic overview and recent activities
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Subjects</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalSubjects || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.attendancePercentage || 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">CGPA</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.cgpa || 'N/A'}</p>
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
                <p className="text-sm font-medium text-gray-600">Next Class</p>
                <p className="text-lg font-bold text-gray-900">
                  {stats?.nextClass || 'No classes'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Subjects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Current Subjects</span>
            </CardTitle>
            <CardDescription>
              Your enrolled subjects this semester
            </CardDescription>
          </CardHeader>
          <CardContent>
            {subjects && subjects.length > 0 ? (
              <div className="space-y-3">
                {subjects.map((subject) => (
                  <div key={subject._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{subject.name}</h4>
                      <p className="text-sm text-gray-600">{subject.code}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{subject.credits} Credits</Badge>
                      <p className="text-xs text-gray-500 mt-1">{subject.department}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No subjects enrolled
              </div>
            )}
          </CardContent>
        </Card>

        {/* Attendance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Attendance Summary</span>
            </CardTitle>
            <CardDescription>
              Your attendance overview for this semester
            </CardDescription>
          </CardHeader>
          <CardContent>
            {attendanceSummary && attendanceSummary.length > 0 ? (
              <div className="space-y-4">
                {attendanceSummary.map((subject) => {
                  const percentage = calculateAttendancePercentage(subject.present, subject.total);
                  return (
                    <div key={subject.subjectId} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{subject.subjectName}</span>
                        <span className={`text-sm font-bold ${getAttendanceColor(percentage)}`}>
                          {percentage}%
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Present: {subject.present}</span>
                        <span>Total: {subject.total}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No attendance data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Test Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Recent Test Results</span>
          </CardTitle>
          <CardDescription>
            Your latest test scores and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentResults && recentResults.length > 0 ? (
            <div className="space-y-3">
              {recentResults.map((result) => (
                <div key={result._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {result.score >= 70 ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : result.score >= 50 ? (
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <div>
                      <h4 className="font-medium">{result.testName}</h4>
                      <p className="text-sm text-gray-600">{result.subjectName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{result.score}%</p>
                    <p className="text-xs text-gray-500">{result.date}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              No test results available
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks you can perform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              View Attendance
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              View Subjects
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Results
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
