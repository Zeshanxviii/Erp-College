import { Outlet, NavLink } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Home, 
  User, 
  BookOpen, 
  Calendar, 
  TrendingUp,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const StudentLayout = () => {
  const { user, logout } = useAuthStore();

  const navigationItems = [
    { to: '/student', icon: Home, label: 'Dashboard' },
    { to: '/student/profile', icon: User, label: 'Profile' },
    { to: '/student/attendance', icon: Calendar, label: 'My Attendance' },
    { to: '/student/subjects', icon: BookOpen, label: 'My Subjects' },
    { to: '/student/results', icon: TrendingUp, label: 'Test Results' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Student Portal</h1>
                <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
              </div>
            </div>
            <Button variant="outline" onClick={logout} className="flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;
