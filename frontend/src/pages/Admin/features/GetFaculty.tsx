import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  useAdminFaculties, 
  useAdminFetchFaculties, 
  useAdminLoading, 
  useAdminError 
} from '@/store/adminStore';
import { Search, Edit, Trash2, Eye, Phone } from 'lucide-react';

const GetFaculty = () => {
  const fetchFaculties = useAdminFetchFaculties();
  const faculties = useAdminFaculties();
  const loading = useAdminLoading();
  const error = useAdminError();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaculty, setFilteredFaculty] = useState(faculties);

  useEffect(() => {
    fetchFaculties();
  }, [fetchFaculties]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = faculties.filter(facultyMember =>
        facultyMember.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facultyMember.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facultyMember.departmentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facultyMember.position?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFaculty(filtered);
    } else {
      setFilteredFaculty(faculties);
    }
  }, [searchTerm, faculties]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading faculty data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700">Error Loading Faculty</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 mb-4">{error}</p>
            <Button 
              variant="destructive"
              onClick={() => fetchFaculties()}
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Faculty Management</CardTitle>
          <CardDescription>
            View and manage all faculty members in the system
          </CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFaculty.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No faculty members found
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredFaculty.map((facultyMember) => (
                  <Card key={facultyMember.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <h3 className="font-semibold text-lg">{facultyMember.firstName}</h3>
                            <p className="text-sm text-muted-foreground">{facultyMember.email}</p>
                          </div>
                          <Badge variant="secondary">{facultyMember.position}</Badge>
                        </div>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <span>{facultyMember.departmentName}</span>
                          </span>
                          {facultyMember.phone && (
                            <>
                              <span>•</span>
                              <span className="flex items-center space-x-1">
                                <Phone className="h-3 w-3" />
                                <span>{facultyMember.phone}</span>
                              </span>
                            </>
                          )}
                          {facultyMember.qualification && (
                            <>
                              <span>•</span>
                              <span>{facultyMember.qualification}</span>
                            </>
                          )}
                        </div>
                        {facultyMember.qualification && (
                          <div className="mt-2">
                            <Badge variant="outline" className="text-xs">
                              {facultyMember.qualification}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GetFaculty;
