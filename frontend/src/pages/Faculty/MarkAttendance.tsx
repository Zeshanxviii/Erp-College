// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { Checkbox } from '@/components/ui/checkbox';
// import { useFacultyStore } from '@/store/facultyStore';
// import { toast } from 'sonner';
// import { Calendar, Users, Clock, MapPin, BookOpen } from 'lucide-react';

// const MarkAttendance = () => {
//   const [selectedClass, setSelectedClass] = useState('');
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [attendanceData, setAttendanceData] = useState<{[key: string]: boolean}>({});
//   const [loading, setLoading] = useState(false);

//   const { 
//     getFacultyClasses, 
//     getClassStudents, 
//     markAttendance,
//     classes,
//     classStudents,
//     loading: storeLoading 
//   } = useFacultyStore();

//   useEffect(() => {
//     getFacultyClasses();
//   }, [getFacultyClasses]);

//   useEffect(() => {
//     if (selectedClass) {
//       getClassStudents(selectedClass);
//     }
//   }, [selectedClass, getClassStudents]);

//   useEffect(() => {
//     if (classStudents.length > 0) {
//       const initialAttendance: {[key: string]: boolean} = {};
//       classStudents.forEach(student => {
//         initialAttendance[student._id] = false;
//       });
//       setAttendanceData(initialAttendance);
//     }
//   }, [classStudents]);

//   const handleAttendanceChange = (studentId: string, present: boolean) => {
//     setAttendanceData(prev => ({
//       ...prev,
//       [studentId]: present
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!selectedClass || !selectedDate) {
//       toast.error('Please select class and date');
//       return;
//     }

//     const presentStudents = Object.keys(attendanceData).filter(id => attendanceData[id]);
//     const absentStudents = Object.keys(attendanceData).filter(id => !attendanceData[id]);

//     if (presentStudents.length === 0 && absentStudents.length === 0) {
//       toast.error('Please mark attendance for at least one student');
//       return;
//     }

//     setLoading(true);
//     try {
//       await markAttendance({
//         classId: selectedClass,
//         date: selectedDate,
//         attendance: attendanceData
//       });
//       toast.success('Attendance marked successfully!');
//       // Reset form
//       setAttendanceData({});
//     } catch (error) {
//       toast.error('Failed to mark attendance');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const selectedClassInfo = classes.find(cls => cls._id === selectedClass);

//   if (storeLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-lg">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Mark Attendance</CardTitle>
//           <CardDescription>
//             Mark attendance for your students in different classes
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {/* Class and Date Selection */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="class">Select Class</Label>
//               <select
//                 id="class"
//                 value={selectedClass}
//                 onChange={(e) => setSelectedClass(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Choose a class</option>
//                 {classes.map((cls) => (
//                   <option key={cls._id} value={cls._id}>
//                     {cls.subject} - {cls.department} {cls.year} Year
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="date">Date</Label>
//               <Input
//                 id="date"
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 max={new Date().toISOString().split('T')[0]}
//               />
//             </div>
//           </div>

//           {/* Class Information */}
//           {selectedClassInfo && (
//             <Card className="bg-blue-50 border-blue-200">
//               <CardContent className="p-4">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                   <div className="flex items-center space-x-2">
//                     <BookOpen className="h-4 w-4 text-blue-600" />
//                     <span><strong>Subject:</strong> {selectedClassInfo.subject}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Users className="h-4 w-4 text-blue-600" />
//                     <span><strong>Department:</strong> {selectedClassInfo.department}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Clock className="h-4 w-4 text-blue-600" />
//                     <span><strong>Time:</strong> {selectedClassInfo.startTime} - {selectedClassInfo.endTime}</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Student List */}
//           {classStudents.length > 0 && (
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-semibold">Student Attendance</h3>
//                 <div className="flex items-center space-x-4 text-sm">
//                   <span className="text-green-600">
//                     Present: {Object.values(attendanceData).filter(Boolean).length}
//                   </span>
//                   <span className="text-red-600">
//                     Absent: {Object.values(attendanceData).filter(present => !present).length}
//                   </span>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 {classStudents.map((student) => (
//                   <div key={student._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center space-x-3">
//                       <Checkbox
//                         id={`student-${student._id}`}
//                         checked={attendanceData[student._id] || false}
//                         onCheckedChange={(checked) => 
//                           handleAttendanceChange(student._id, checked as boolean)
//                         }
//                       />
//                       <div>
//                         <Label htmlFor={`student-${student._id}`} className="font-medium cursor-pointer">
//                           {student.name}
//                         </Label>
//                         <p className="text-sm text-gray-600">{student.rollNo}</p>
//                       </div>
//                     </div>
//                     <Badge variant="outline">{student.department}</Badge>
//                   </div>
//                 ))}
//               </div>

//               <Button 
//                 onClick={handleSubmit} 
//                 disabled={loading}
//                 className="w-full"
//               >
//                 {loading ? 'Marking Attendance...' : 'Submit Attendance'}
//               </Button>
//             </div>
//           )}

//           {selectedClass && classStudents.length === 0 && (
//             <div className="text-center py-8 text-gray-500">
//               No students found for this class
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default MarkAttendance;
