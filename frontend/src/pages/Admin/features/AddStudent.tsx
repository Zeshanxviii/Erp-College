import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useAdminStore, { useAdminDepartments } from '@/store/adminStore';
import { toast } from 'sonner';

const AddStudent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        dob: '',
        contactNumber: '',
        section: '',
        gender: '',
        batch: '',
        year: '',
        fatherName: '',
        motherName: '',
        fatherContactNumber: '',
        motherContactNumber: '',
        avatar: '',
    });

    const { createStudent, createDepartment, loading, fetchDepartments } = useAdminStore();
    const departments = useAdminDepartments();

    useEffect(() => {
        // Fetch departments when component mounts
        fetchDepartments();
    }, [fetchDepartments]);

    // Function to handle department creation and refresh
    // const handleCreateDepartment = async (data: any) => {
    //   await createDepartment(data);
    //   fetchDepartments(); // Refresh departments after creation
    // };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createStudent(formData);
            toast.success('Student added successfully!');
            setFormData({
                name: '',
                email: '',
                department: '',
                dob: '',
                contactNumber: '',
                section: '',
                gender: '',
                batch: '',
                year: '',
                fatherName: '',
                motherName: '',
                fatherContactNumber: '',
                motherContactNumber: '',
                avatar: '',
            });
        } catch (error) {
            toast.error('Failed to add student');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Add New Student</CardTitle>
                    <CardDescription>Enter all required details to register a student.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Personal Info */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        minLength={2}
                                        maxLength={50}
                                        placeholder="Enter full name (2-50 characters)"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter email address"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <Input
                                        id="dob"
                                        name="dob"
                                        type="date"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        required
                                        pattern="\d{4}-\d{2}-\d{2}"
                                        title="Date of Birth (YYYY-MM-DD)"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contactNumber">Contact Number</Label>
                                    <Input
                                        id="contactNumber"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        required
                                        placeholder="10-digit phone number"
                                        pattern="\d{10}"
                                        title="10-digit phone number"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="avatar">Avatar URL (optional)</Label>
                                    <Input
                                        id="avatar"
                                        name="avatar"
                                        value={formData.avatar}
                                        onChange={handleChange}
                                        placeholder="https://example.com/avatar.jpg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Academic Info */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Academic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="department">Department</Label>
                                    <select
                                        id="department"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map((dept) => (
                                            <option key={dept.id} value={dept.name}>
                                                {dept.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="section">Section</Label>
                                    <Input
                                        id="section"
                                        name="section"
                                        value={formData.section}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., A, B"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="batch">Batch</Label>
                                    <Input
                                        id="batch"
                                        name="batch"
                                        value={formData.batch}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., 2023"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="year">Year</Label>
                                    <select
                                        id="year"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="">Select Year</option>
                                        <option value="1">1st Year</option>
                                        <option value="2">2nd Year</option>
                                        <option value="3">3rd Year</option>
                                        <option value="4">4th Year</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Parent Info */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Parent Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fatherName">Father's Name</Label>
                                    <Input
                                        id="fatherName"
                                        name="fatherName"
                                        value={formData.fatherName}
                                        onChange={handleChange}
                                        required
                                        minLength={2}
                                        maxLength={50}
                                        placeholder="Enter father's name (2-50 characters)"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="motherName">Mother's Name</Label>
                                    <Input
                                        id="motherName"
                                        name="motherName"
                                        value={formData.motherName}
                                        onChange={handleChange}
                                        required
                                        minLength={2}
                                        maxLength={50}
                                        placeholder="Enter mother's name (2-50 characters)"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="fatherContactNumber">Father's Contact</Label>
                                    <Input
                                        id="fatherContactNumber"
                                        name="fatherContactNumber"
                                        value={formData.fatherContactNumber}
                                        onChange={handleChange}
                                        required
                                        placeholder="10-digit number"
                                        pattern="\d{10}"
                                        title="10-digit phone number"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="motherContactNumber">Mother's Contact</Label>
                                    <Input
                                        id="motherContactNumber"
                                        name="motherContactNumber"
                                        value={formData.motherContactNumber}
                                        onChange={handleChange}
                                        required
                                        placeholder="10-digit number"
                                        pattern="\d{10}"
                                        title="10-digit phone number"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Adding Student...' : 'Add Student'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddStudent;
