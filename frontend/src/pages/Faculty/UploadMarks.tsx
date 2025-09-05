// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { useFacultyStore } from '@/store/facultyStore';
// import { toast } from 'sonner';
// import { BookOpen, Users, Upload, Save } from 'lucide-react';

// const UploadMarks = () => {
//   const [selectedClass, setSelectedClass] = useState('');
//   const [selectedSubject, setSelectedSubject] = useState('');
//   const [testName, setTestName] = useState('');
//   const [testDate, setTestDate] = useState('');
//   const [maxMarks, setMaxMarks] = useState('');
//   const [marksData, setMarksData] = useState<{[key: string]: string}>({});
//   const [loading, setLoading] = useState(false);

//   const { 
//     getFacultyClasses, 
//     getClassStudents, 
//     uploadMarks,
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
//       const initialMarks: {[key: string]: string} = {};
//       classStudents.forEach(student => {
//         initialMarks[student._id] = '';
//       });
//       setMarksData(initialMarks);
//     }
//   }, [classStudents]);

//   const handleMarksChange = (studentId: string, marks: string) => {
//     const numMarks = parseFloat(marks);
//     if (marks === '' || (numMarks >= 0 && numMarks <= parseFloat(maxMarks))) {
//       setMarksData(prev => ({
//         ...prev,
//         [studentId]: marks
//       }));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!selectedClass || !selectedSubject || !testName || !testDate || !maxMarks) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     const validMarks = Object.keys(marksData).filter(id => marksData[id] !== '');
//     if (validMarks.length === 0) {
//       toast.error('Please enter marks for at least one student');
//       return;
//     }

//     setLoading(true);
//     try {
//       await uploadMarks({
//         classId: selectedClass,
//         subjectId: selectedSubject,
//         testName,
//         testDate,
//         maxMarks: parseFloat(maxMarks),
//         marks: marksData
//       });
//       toast.success('Marks uploaded successfully!');
//       // Reset form
//       setMarksData({});
//       setTestName('');
//       setTestDate('');
//       setMaxMarks('');
//     } catch (error) {
//       toast.error('Failed to upload marks');
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
//           <CardTitle>Upload Student Marks</CardTitle>
//           <CardDescription>
//             Upload test marks for your students
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {/* Test Information */}
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
//               <Label htmlFor="subject">Subject</Label>
//               <Input
//                 id="subject"
//                 value={selectedSubject}
//                 onChange={(e) => setSelectedSubject(e.target.value)}
//                 placeholder="Enter subject name"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="testName">Test Name</Label>
//               <Input
//                 id="testName"
//                 value={testName}
//                 onChange={(e) => setTestName(e.target.value)}
//                 placeholder="e.g., Mid-Term, Final, Quiz"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="testDate">Test Date</Label>
//               <Input
//                 id="testDate"
//                 type="date"
//                 value={testDate}
//                 onChange={(e) => setTestDate(e.target.value)}
//                 max={new Date().toISOString().split('T')[0]}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="maxMarks">Maximum Marks</Label>
//               <Input
//                 id="maxMarks"
//                 type="number"
//                 min="1"
//                 value={maxMarks}
//                 onChange={(e) => setMaxMarks(e.target.value)}
//                 placeholder="e.g., 100"
//                 required
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
//                     <span><strong>Year:</strong> {selectedClassInfo.year}</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Student Marks Input */}
//           {classStudents.length > 0 && (
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-semibold">Enter Student Marks</h3>
//                 <div className="text-sm text-gray-600">
//                   Max Marks: {maxMarks || 'Not set'}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 {classStudents.map((student) => (
//                   <div key={student._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center space-x-3">
//                       <div>
//                         <Label htmlFor={`marks-${student._id}`} className="font-medium cursor-pointer">
//                           {student.name}
//                         </Label>
//                         <p className="text-sm text-gray-600">{student.rollNo}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <Input
//                         id={`marks-${student._id}`}
//                         type="number"
//                         min="0"
//                         max={maxMarks || undefined}
//                         step="0.01"
//                         value={marksData[student._id] || ''}
//                         onChange={(e) => handleMarksChange(student._id, e.target.value)}
//                         placeholder="Enter marks"
//                         className="w-24"
//                       />
//                       <Badge variant="outline">{student.department}</Badge>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <Button 
//                 onClick={handleSubmit} 
//                 disabled={loading}
//                 className="w-full"
//               >
//                 {loading ? 'Uploading Marks...' : 'Upload Marks'}
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

// export default UploadMarks;
