// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import  useFacultyStore  from '@/store/facultyStore';
// import { toast } from "sonner"
// import { BookOpen, Users, Calendar, Clock, FileText, Plus, Trash2 } from 'lucide-react';

// interface Question {
//   id: string;
//   question: string;
//   marks: string;
//   type: 'mcq' | 'descriptive' | 'numerical';
//   options?: string[];
// }

// const CreateTest = () => {
//   const [selectedClass, setSelectedClass] = useState('');
//   const [testName, setTestName] = useState('');
//   const [testDate, setTestDate] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [duration, setDuration] = useState('');
//   const [totalMarks, setTotalMarks] = useState('');
//   const [instructions, setInstructions] = useState('');
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [loading, setLoading] = useState(false);

//   const { 
//     getFacultyClasses, 
//     createTest,
//     classes,
//     loading: storeLoading 
//   } = useFacultyStore();

//   useEffect(() => {
//     getFacultyClasses();
//   }, [getFacultyClasses]);

//   const addQuestion = () => {
//     const newQuestion: Question = {
//       id: Date.now().toString(),
//       question: '',
//       marks: '',
//       type: 'descriptive'
//     };
//     setQuestions([...questions, newQuestion]);
//   };

//   const removeQuestion = (id: string) => {
//     setQuestions(questions.filter(q => q.id !== id));
//   };

//   const updateQuestion = (id: string, field: keyof Question, value: string | string[]) => {
//     setQuestions(questions.map(q => 
//       q.id === id ? { ...q, [field]: value } : q
//     ));
//   };

//   const addOption = (questionId: string) => {
//     setQuestions(questions.map(q => {
//       if (q.id === questionId) {
//         const options = q.options || [];
//         return { ...q, options: [...options, ''] };
//       }
//       return q;
//     }));
//   };

//   const removeOption = (questionId: string, optionIndex: number) => {
//     setQuestions(questions.map(q => {
//       if (q.id === questionId) {
//         const options = q.options || [];
//         return { ...q, options: options.filter((_, index) => index !== optionIndex) };
//       }
//       return q;
//     }));
//   };

//   const updateOption = (questionId: string, optionIndex: number, value: string) => {
//     setQuestions(questions.map(q => {
//       if (q.id === questionId) {
//         const options = q.options || [];
//         const newOptions = [...options];
//         newOptions[optionIndex] = value;
//         return { ...q, options: newOptions };
//       }
//       return q;
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!selectedClass || !testName || !testDate || !startTime || !duration || !totalMarks) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     if (questions.length === 0) {
//       toast.error('Please add at least one question');
//       return;
//     }

//     // Validate questions
//     for (const question of questions) {
//       if (!question.question || !question.marks) {
//         toast.error('Please fill in all question details');
//         return;
//       }
//       if (question.type === 'mcq' && (!question.options || question.options.length < 2)) {
//         toast.error('MCQ questions must have at least 2 options');
//         return;
//       }
//     }

//     setLoading(true);
//     try {
//       await createTest({
//         classId: selectedClass,
//         testName,
//         testDate,
//         startTime,
//         duration: parseInt(duration),
//         totalMarks: parseInt(totalMarks),
//         instructions,
//         questions
//       });
//       toast.success('Test created successfully!');
//       // Reset form
//       setTestName('');
//       setTestDate('');
//       setStartTime('');
//       setDuration('');
//       setTotalMarks('');
//       setInstructions('');
//       setQuestions([]);
//     } catch (error) {
//       toast.error('Failed to create test');
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
//           <CardTitle>Create New Test</CardTitle>
//           <CardDescription>
//             Create a new test or assignment for your students
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {/* Basic Test Information */}
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
//               <Label htmlFor="testName">Test Name</Label>
//               <Input
//                 id="testName"
//                 value={testName}
//                 onChange={(e) => setTestName(e.target.value)}
//                 placeholder="e.g., Mid-Term Exam, Final Assignment"
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
//                 min={new Date().toISOString().split('T')[0]}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="startTime">Start Time</Label>
//               <Input
//                 id="startTime"
//                 type="time"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="duration">Duration (minutes)</Label>
//               <Input
//                 id="duration"
//                 type="number"
//                 min="15"
//                 max="300"
//                 value={duration}
//                 onChange={(e) => setDuration(e.target.value)}
//                 placeholder="e.g., 120"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="totalMarks">Total Marks</Label>
//               <Input
//                 id="totalMarks"
//                 type="number"
//                 min="1"
//                 value={totalMarks}
//                 onChange={(e) => setTotalMarks(e.target.value)}
//                 placeholder="e.g., 100"
//                 required
//               />
//             </div>
//           </div>

//           {/* Instructions */}
//           <div className="space-y-2">
//             <Label htmlFor="instructions">Test Instructions</Label>
//             <textarea
//               id="instructions"
//               value={instructions}
//               onChange={(e) => setInstructions(e.target.value)}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter test instructions for students..."
//             />
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

//           {/* Questions Section */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold">Test Questions</h3>
//               <Button onClick={addQuestion} variant="outline" size="sm">
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Question
//               </Button>
//             </div>

//             {questions.length === 0 ? (
//               <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
//                 <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
//                 <p>No questions added yet</p>
//                 <p className="text-sm">Click "Add Question" to get started</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {questions.map((question, index) => (
//                   <Card key={question.id} className="p-4">
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <h4 className="font-medium">Question {index + 1}</h4>
//                         <Button
//                           onClick={() => removeQuestion(question.id)}
//                           variant="outline"
//                           size="sm"
//                           className="text-red-600 hover:text-red-700"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                           <Label>Question Type</Label>
//                           <select
//                             value={question.type}
//                             onChange={(e) => updateQuestion(question.id, 'type', e.target.value as any)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           >
//                             <option value="descriptive">Descriptive</option>
//                             <option value="mcq">Multiple Choice</option>
//                             <option value="numerical">Numerical</option>
//                           </select>
//                         </div>

//                         <div className="space-y-2">
//                           <Label>Marks</Label>
//                           <Input
//                             type="number"
//                             min="1"
//                             value={question.marks}
//                             onChange={(e) => updateQuestion(question.id, 'marks', e.target.value)}
//                             placeholder="Marks"
//                             required
//                           />
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <Label>Question Text</Label>
//                         <textarea
//                           value={question.question}
//                           onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
//                           rows={2}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           placeholder="Enter your question..."
//                           required
//                         />
//                       </div>

//                       {/* MCQ Options */}
//                       {question.type === 'mcq' && (
//                         <div className="space-y-2">
//                           <Label>Options</Label>
//                           <div className="space-y-2">
//                             {question.options?.map((option, optionIndex) => (
//                               <div key={optionIndex} className="flex items-center space-x-2">
//                                 <Input
//                                   value={option}
//                                   onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
//                                   placeholder={`Option ${optionIndex + 1}`}
//                                   className="flex-1"
//                                 />
//                                 <Button
//                                   onClick={() => removeOption(question.id, optionIndex)}
//                                   variant="outline"
//                                   size="sm"
//                                   className="text-red-600 hover:text-red-700"
//                                 >
//                                   <Trash2 className="h-4 w-4" />
//                                 </Button>
//                               </div>
//                             ))}
//                             <Button
//                               onClick={() => addOption(question.id)}
//                               variant="outline"
//                               size="sm"
//                             >
//                               <Plus className="h-4 w-4 mr-2" />
//                               Add Option
//                             </Button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <Button 
//             onClick={handleSubmit} 
//             disabled={loading || questions.length === 0}
//             className="w-full"
//           >
//             {loading ? 'Creating Test...' : 'Create Test'}
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default CreateTest;
