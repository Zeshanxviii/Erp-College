// import { useEffect, useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import useStudentStore from '@/store/studentStore';
// import { CheckCircle, XCircle, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

// const StudentAttendance = () => {
//   const {  
//     attendance,
//     loading 
//   } = useStudentStore();

//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//   useEffect(() => {
//     getStudentAttendance(selectedYear, selectedMonth + 1);
//   }, [getStudentAttendance, selectedYear, selectedMonth]);

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   const years = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i);

//   const calculateAttendancePercentage = (present: number, total: number) => {
//     if (total === 0) return 0;
//     return Math.round((present / total) * 100);
//   };

//   const getAttendanceColor = (percentage: number) => {
//     if (percentage >= 90) return 'text-green-600';
//     if (percentage >= 75) return 'text-yellow-600';
//     return 'text-red-600';
//   };

//   const getAttendanceStatus = (percentage: number) => {
//     if (percentage >= 90) return 'Excellent';
//     if (percentage >= 75) return 'Good';
//     if (percentage >= 60) return 'Fair';
//     return 'Poor';
//   };

//   const getAttendanceIcon = (percentage: number) => {
//     if (percentage >= 90) return <CheckCircle className="h-5 w-5 text-green-600" />;
//     if (percentage >= 75) return <TrendingUp className="h-5 w-5 text-yellow-600" />;
//     return <AlertCircle className="h-5 w-5 text-red-600" />;
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-lg">Loading attendance...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header with Month/Year Selection */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">My Attendance</h1>
//           <p className="text-gray-600">Track your attendance across all subjects</p>
//         </div>
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2">
//             <Calendar className="h-4 w-4 text-gray-500" />
//             <select
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//               className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {months.map((month, index) => (
//                 <option key={index} value={index}>{month}</option>
//               ))}
//             </select>
//             <select
//               value={selectedYear}
//               onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//               className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {years.map((year) => (
//                 <option key={year} value={year}>{year}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Overall Attendance Summary */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <CheckCircle className="h-6 w-6 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Present Days</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {attendance.reduce((sum, subject) => sum + subject.present, 0)}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-red-100 rounded-lg">
//                 <XCircle className="h-6 w-6 text-red-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Absent Days</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {attendance.reduce((sum, subject) => sum + (subject.total - subject.present), 0)}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <TrendingUp className="h-6 w-6 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Overall Percentage</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {attendance.length > 0 
//                     ? Math.round(
//                         attendance.reduce((sum, subject) => 
//                           sum + calculateAttendancePercentage(subject.present, subject.total), 0
//                         ) / attendance.length
//                       )
//                     : 0
//                   }%
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Subject-wise Attendance */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Subject-wise Attendance</CardTitle>
//           <CardDescription>
//             Detailed attendance breakdown for each subject
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {attendance.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               No attendance data available for the selected period
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {attendance.map((subject) => {
//                 const percentage = calculateAttendancePercentage(subject.present, subject.total);
//                 const status = getAttendanceStatus(percentage);
                
//                 return (
//                   <div key={subject.subjectId} className="border rounded-lg p-4">
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center space-x-3">
//                         {getAttendanceIcon(percentage)}
//                         <div>
//                           <h3 className="font-semibold text-lg">{subject.subjectName}</h3>
//                           <p className="text-sm text-gray-600">{subject.department}</p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <Badge 
//                           variant={percentage >= 75 ? "default" : "destructive"}
//                           className="mb-2"
//                         >
//                           {status}
//                         </Badge>
//                         <p className={`text-lg font-bold ${getAttendanceColor(percentage)}`}>
//                           {percentage}%
//                         </p>
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between text-sm">
//                         <span>Attendance Progress</span>
//                         <span className="text-gray-600">
//                           {subject.present} / {subject.total} days
//                         </span>
//                       </div>
//                       <Progress value={percentage} className="h-2" />
                      
//                       <div className="grid grid-cols-2 gap-4 text-sm">
//                         <div className="flex items-center space-x-2">
//                           <CheckCircle className="h-4 w-4 text-green-600" />
//                           <span>Present: {subject.present} days</span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <XCircle className="h-4 w-4 text-red-600" />
//                           <span>Absent: {subject.total - subject.present} days</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Attendance Tips */}
//       <Card className="bg-blue-50 border-blue-200">
//         <CardHeader>
//           <CardTitle className="text-blue-900">Attendance Tips</CardTitle>
//         </CardHeader>
//         <CardContent className="text-blue-800">
//           <ul className="space-y-2 text-sm">
//             <li>• Maintain at least 75% attendance to be eligible for exams</li>
//             <li>• Regular attendance helps in better understanding of subjects</li>
//             <li>• Contact your faculty if you need to miss classes due to emergencies</li>
//             <li>• Use the monthly view to track your attendance trends</li>
//           </ul>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default StudentAttendance;
