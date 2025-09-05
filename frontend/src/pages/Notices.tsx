import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/authStore';
import { Search, Bell, AlertTriangle, Info, Calendar, User } from 'lucide-react';

interface Notice {
  _id: string;
  title: string;
  content: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  targetAudience: 'all' | 'students' | 'faculty' | 'admin';
  createdAt: string;
  expiryDate?: string;
  author: string;
}

const Notices = () => {
  const { user } = useAuthStore();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching notices from API
    const fetchNotices = async () => {
      // This would be replaced with actual API call
      const mockNotices: Notice[] = [
        {
          _id: '1',
          title: 'Mid-Term Examination Schedule',
          content: 'The mid-term examinations will be conducted from Week 8 to Week 9. All students are required to check their respective subject schedules and prepare accordingly.',
          priority: 'high',
          targetAudience: 'students',
          createdAt: '2024-01-15T10:00:00Z',
          author: 'Academic Office'
        },
        {
          _id: '2',
          title: 'Faculty Meeting - Department Heads',
          content: 'All department heads are requested to attend the monthly faculty meeting on Friday at 2:00 PM in the Conference Room.',
          priority: 'normal',
          targetAudience: 'faculty',
          createdAt: '2024-01-14T14:30:00Z',
          author: 'Dean of Academics'
        },
        {
          _id: '3',
          title: 'Library Hours Extended',
          content: 'The library will remain open until 10:00 PM during the examination period to accommodate students studying for their exams.',
          priority: 'low',
          targetAudience: 'all',
          createdAt: '2024-01-13T09:00:00Z',
          author: 'Library Department'
        },
        {
          _id: '4',
          title: 'System Maintenance Notice',
          content: 'The ERP system will be under maintenance from 2:00 AM to 6:00 AM on Sunday. During this time, the system may be temporarily unavailable.',
          priority: 'urgent',
          targetAudience: 'all',
          createdAt: '2024-01-12T16:00:00Z',
          author: 'IT Department'
        }
      ];
      
      setNotices(mockNotices);
      setFilteredNotices(mockNotices);
      setLoading(false);
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    let filtered = notices;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(notice =>
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by priority
    if (selectedPriority !== 'all') {
      filtered = filtered.filter(notice => notice.priority === selectedPriority);
    }

    // Filter by target audience
    if (user) {
      filtered = filtered.filter(notice => 
        notice.targetAudience === 'all' || 
        notice.targetAudience === user.role
      );
    }

    setFilteredNotices(filtered);
  }, [searchTerm, selectedPriority, notices, user]);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'high':
        return <Bell className="h-5 w-5 text-orange-600" />;
      case 'normal':
        return <Info className="h-5 w-5 text-blue-600" />;
      case 'low':
        return <Info className="h-5 w-5 text-gray-600" />;
      default:
        return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'normal':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading notices...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Notices & Announcements</h1>
        <p className="text-gray-600">Stay updated with the latest information from your institution</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Priority:</span>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg text-gray-600">No notices found</p>
              <p className="text-sm text-gray-500">Try adjusting your search criteria</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotices.map((notice) => (
            <Card key={notice._id} className={`${isExpired(notice.expiryDate) ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getPriorityIcon(notice.priority)}
                      <CardTitle className="text-xl">{notice.title}</CardTitle>
                      {isExpired(notice.expiryDate) && (
                        <Badge variant="destructive">Expired</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{notice.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(notice.createdAt)}</span>
                      </div>
                      {notice.expiryDate && (
                        <div className="flex items-center space-x-1">
                          <span>Expires: {formatDate(notice.expiryDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge className={`${getPriorityColor(notice.priority)}`}>
                    {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-700 leading-relaxed">
                  {notice.content}
                </CardDescription>
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant="outline">
                    {notice.targetAudience === 'all' ? 'All Users' : 
                     notice.targetAudience.charAt(0).toUpperCase() + notice.targetAudience.slice(1)}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common actions related to notices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="w-full justify-start" variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Subscribe to Notifications
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Advanced Search
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notices;

