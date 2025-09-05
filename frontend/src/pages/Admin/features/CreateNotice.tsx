// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import useAdminStore from '@/store/adminStore';
// import { toast } from 'sonner';

// const CreateNotice = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     priority: 'normal',
//     targetAudience: 'all',
//     expiryDate: ''
//   });

//   const { createNotice, loading } = useAdminStore();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await createNotice(formData);
//       toast.success('Notice created successfully!');
//       setFormData({
//         title: '',
//         content: '',
//         priority: 'normal',
//         targetAudience: 'all',
//         expiryDate: ''
//       });
//     } catch (error) {
//       toast.error('Failed to create notice');
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <Card className="max-w-3xl mx-auto">
//         <CardHeader>
//           <CardTitle>Create New Notice</CardTitle>
//           <CardDescription>
//             Create and publish a new notice for students, faculty, or all users
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="title">Notice Title</Label>
//               <Input
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter notice title"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="priority">Priority</Label>
//                 <select
//                   id="priority"
//                   name="priority"
//                   value={formData.priority}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="low">Low</option>
//                   <option value="normal">Normal</option>
//                   <option value="high">High</option>
//                   <option value="urgent">Urgent</option>
//                 </select>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="targetAudience">Target Audience</Label>
//                 <select
//                   id="targetAudience"
//                   name="targetAudience"
//                   value={formData.targetAudience}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="all">All Users</option>
//                   <option value="students">Students Only</option>
//                   <option value="faculty">Faculty Only</option>
//                   <option value="admin">Admin Only</option>
//                 </select>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
//               <Input
//                 id="expiryDate"
//                 name="expiryDate"
//                 type="date"
//                 value={formData.expiryDate}
//                 onChange={handleChange}
//                 min={new Date().toISOString().split('T')[0]}
//                 placeholder="Select expiry date"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="content">Notice Content</Label>
//               <textarea
//                 id="content"
//                 name="content"
//                 value={formData.content}
//                 onChange={handleChange}
//                 rows={6}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter the complete notice content..."
//               />
//             </div>

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? 'Creating Notice...' : 'Create Notice'}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default CreateNotice;
