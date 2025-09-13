import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useAdminStore from '@/store/adminStore';
import { toast } from 'sonner';
import { useAdminCreateDepartment } from "@/store/adminStore"
import apiService from "@/api";

const AddDepartment = () => {
  const [formData, setFormData] = useState({
     department: '',
    // code: '',
    // description: '',
    // hod: '',
    // totalSeats: '',
    // establishedYear: ''
  });

  const { loading } = useAdminStore();
  const createDepartment = useAdminCreateDepartment();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(formData)
      await apiService.admin.createDepartment(formData);
      await createDepartment(formData);
      toast.success('Department added successfully!');
      setFormData({
        department: '',
        // code: '',
        // description: '',
        // hod: '',
        // totalSeats: '',
        // establishedYear: ''
      });
    } catch (error) {
      toast.error('Failed to add department');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Department</CardTitle>
          <CardDescription>
            Enter department information to add it to the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department Name</Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  placeholder="Enter department name"
                />
              </div>
              
              {/* <div className="space-y-2">
                <Label htmlFor="code">Department Code</Label>
                <Input
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  placeholder="Enter department code"
                />
              </div> */}

              {/* <div className="space-y-2">
                <Label htmlFor="hod">Head of Department</Label>
                <Input
                  id="hod"
                  name="hod"
                  value={formData.hod}
                  onChange={handleChange}
                  required
                  placeholder="Enter HOD name"
                />
              </div> */}

              {/* <div className="space-y-2">
                <Label htmlFor="totalSeats">Total Seats</Label>
                <Input
                  id="totalSeats"
                  name="totalSeats"
                  type="number"
                  min="1"
                  value={formData.totalSeats}
                  onChange={handleChange}
                  required
                  placeholder="Enter total seats"
                />
              </div> */}

              {/* <div className="space-y-2">
                <Label htmlFor="establishedYear">Established Year</Label>
                <Input
                  id="establishedYear"
                  name="establishedYear"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.establishedYear}
                  onChange={handleChange}
                  required
                  placeholder="Enter established year"
                />
              </div> */}
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter department description"
              />
            </div> */}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Adding Department...' : 'Add Department'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddDepartment;
