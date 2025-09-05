// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Users, 
//   BookOpen, 
//   Calendar, 
//   TrendingUp, 
//   Clock,
//   AlertCircle,
//   CheckCircle,
//   Upload
// } from 'lucide-react';
// import { useFacultyStore } from '@/store/facultyStore';
// import { useAuthStore } from '@/store/authStore';

// const FacultyDashboard = () => {
//   const { user } = useAuthStore();
//   const { 
//     getFacultyStats, 
//     getTodayClasses, 
//     getPendingAttendance,
//     stats,
//     todayClasses,
//     pendingAttendance,
//     loading 
//   } = useFacultyStore();

//   useEffect(() => {
//     if (user) {
//       getFacultyStats();
//       getTodayClasses();
//       getPendingAttendance();
//     }
//   }, [user, getFacultyStats, getTodayClasses, getPendingAttendance]);

//   const getTimeString = (time: string) => {
//     return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-lg">Loading dashboard...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
//         <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
//         <p className="text-blue-100">
//           Here's what's happening in your classes today
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <Users className="h-6 w-6 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Students</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats?.totalStudents || 0}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <BookOpen className="h-6 w-6 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Active Subjects</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats?.activeSubjects || 0}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-yellow-100 rounded-lg">
//                 <Calendar className="h-6 w-6 text-yellow-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Today's Classes</p>
//                 <p className="text-2xl font-bold text-gray-900">{todayClasses?.length || 0}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-red-100 rounded-lg">
//                 <AlertCircle className="h-6 w-6 text-red-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Pending Attendance</p>
//                 <p className="text-2xl font-bold text-gray-900">{pendingAttendance?.length || 0}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Today's Classes */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <Clock className="h-5 w-5" />
//               <span>Today's Classes</span>
//             </CardTitle>
//             <CardDescription>
//               Your scheduled classes for today
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {todayClasses && todayClasses.length > 0 ? (
//               <div className="space-y-3">
//                 {todayClasses.map((classItem, index) => (
//                   <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div>
//                       <h4 className="font-medium">{classItem.subject}</h4>
//                       <p className="text-sm text-gray-600">
//                         {classItem.department} - {classItem.year} Year
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-medium text-sm">
//                         {getTimeString(classItem.startTime)} - {getTimeString(classItem.endTime)}
//                       </p>
//                       <Badge variant="secondary">{classItem.room}</Badge>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-6 text-gray-500">
//                 No classes scheduled for today
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Quick Actions */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Quick Actions</CardTitle>
//             <CardDescription>
//               Common tasks you can perform
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-3">
//             <Button className="w-full justify-start" variant="outline">
//               <Calendar className="h-4 w-4 mr-2" />
//               Mark Attendance
//             </Button>
//             <Button className="w-full justify-start" variant="outline">
//               <Upload className="h-4 w-4 mr-2" />
//               Upload Marks
//             </Button>
//             <Button className="w-full justify-start" variant="outline">
//               <BookOpen className="h-4 w-4 mr-2" />
//               Create Test
//             </Button>
//             <Button className="w-full justify-start" variant="outline">
//               <TrendingUp className="h-4 w-4 mr-2" />
//               View Reports
//             </Button>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Activity */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Activity</CardTitle>
//           <CardDescription>
//             Your recent actions and updates
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3">
//             <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
//               <CheckCircle className="h-5 w-5 text-green-600" />
//               <div>
//                 <p className="font-medium">Attendance marked for Computer Science - 3rd Year</p>
//                 <p className="text-sm text-gray-600">2 hours ago</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
//               <Upload className="h-5 w-5 text-blue-600" />
//               <div>
//                 <p className="font-medium">Marks uploaded for Data Structures</p>
//                 <p className="text-sm text-gray-600">1 day ago</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
//               <BookOpen className="h-5 w-5 text-purple-600" />
//               <div>
//                 <p className="font-medium">New test created: Algorithms Mid-Term</p>
//                 <p className="text-sm text-gray-600">2 days ago</p>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default FacultyDashboard;
