import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import useStudentStore  from '@/store/studentStore';
import { TrendingUp, Calendar, BookOpen, Award, BarChart3, Download } from 'lucide-react';

const StudentResults = () => {
  const { 
    fetchTestResults, 
    testResults,
    loading 
  } = useStudentStore();

  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');

  useEffect(() => {
    fetchTestResults();
  }, [fetchTestResults]);

  const subjects = [...new Set(testResults.map(result => result.subjectName))];
  const semesters = [...new Set(testResults.map(result => result.semester))];

  const filteredResults = testResults.filter(result => {
    if (selectedSubject !== 'all' && result.subjectName !== selectedSubject) return false;
    if (selectedSemester !== 'all' && result.semester !== selectedSemester) return false;
    return true;
  });

  const calculateAverageScore = () => {
    if (filteredResults.length === 0) return 0;
    const total = filteredResults.reduce((sum, result) => sum + result.score, 0);
    return Math.round(total / filteredResults.length);
  };

//Something that change evaluvate grade
  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 70) return { grade: 'B+', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 60) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 50) return { grade: 'C+', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (score >= 40) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { grade: 'F', color: 'text-red-600', bg: 'bg-red-100' };
  };
// something that show student proformence
  const getPerformanceStatus = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Satisfactory';
    if (score >= 50) return 'Needs Improvement';
    return 'Poor';
  };
/// Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading results...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Results</h1>
        <p className="text-gray-600">View your test results and academic performance</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-gray-500" />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Semesters</option>
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>{semester} Semester</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">{calculateAverageScore()}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tests</p>
                <p className="text-2xl font-bold text-gray-900">{filteredResults.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Best Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredResults.length > 0 
                    ? Math.max(...filteredResults.map(r => r.score))
                    : 0
                  }%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Subjects</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(filteredResults.map(r => r.subjectName)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results List */}
      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
          <CardDescription>
            Detailed breakdown of your test performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredResults.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p>No results found for the selected filters</p>
              <p className="text-sm">Try changing your filter criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredResults.map((result) => {
                const gradeInfo = getGrade(result.score);
                const performance = getPerformanceStatus(result.score);
                
                return (
                  <Card key={result._id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{result.testName}</h3>
                            <p className="text-sm text-gray-600">{result.subjectName}</p>
                          </div>
                          <Badge variant="outline">{result.semester} Semester</Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>Date: {result.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4" />
                            <span>Max Marks: {result.maxMarks}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4" />
                            <span>Performance: {performance}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Score Progress</span>
                            <span className="font-medium">{result.score}%</span>
                          </div>
                          <Progress value={result.score} className="h-2" />
                        </div>
                      </div>

                      <div className="flex flex-col items-center space-y-3 ml-6">
                        <div className={`text-center p-3 rounded-lg ${gradeInfo.bg}`}>
                          <p className={`text-2xl font-bold ${gradeInfo.color}`}>
                            {gradeInfo.grade}
                          </p>
                          <p className={`text-sm ${gradeInfo.color}`}>
                            {result.score}%
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Analysis</CardTitle>
          <CardDescription>
            Insights into your academic performance trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Subject Performance</h4>
              {subjects.map((subject) => {
                const subjectResults = filteredResults.filter(r => r.subjectName === subject);
                if (subjectResults.length === 0) return null;
                
                const avgScore = Math.round(
                  subjectResults.reduce((sum, r) => sum + r.score, 0) / subjectResults.length
                );
                
                return (
                  <div key={subject} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{subject}</span>
                      <span className="text-sm text-gray-600">{avgScore}%</span>
                    </div>
                    <Progress value={avgScore} className="h-2" />
                  </div>
                );
              })}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Grade Distribution</h4>
              <div className="space-y-3">
                {['A+', 'A', 'B+', 'B', 'C+', 'C', 'F'].map((grade) => {
                  const count = filteredResults.filter(result => {
                    const gradeInfo = getGrade(result.score);
                    return gradeInfo.grade === grade;
                  }).length;
                  
                  if (count === 0) return null;
                  
                  return (
                    <div key={grade} className="flex items-center justify-between">
                      <span className="font-medium">{grade}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(count / filteredResults.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common actions related to your results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="w-full justify-start" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download All Results
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Performance Report
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              Academic Advisor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentResults;

