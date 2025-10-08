import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap, Building2, TrendingUp, Calendar } from "lucide-react";

export default function AdminDashboard() {
  // Mock data - replace with actual data from your API
  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      change: "+12%",
      icon: Users,
      description: "Enrolled students"
    },
    {
      title: "Total Faculty",
      value: "89",
      change: "+5%",
      icon: GraduationCap,
      description: "Teaching staff"
    },
    {
      title: "Departments",
      value: "12",
      change: "+2",
      icon: Building2,
      description: "Academic departments"
    },
    {
      title: "Active Courses",
      value: "156",
      change: "+8%",
      icon: BookOpen,
      description: "Running courses"
    }
  ];

  const recentActivities = [
    { action: "New student enrolled", time: "2 hours ago", type: "student" },
    { action: "Faculty member added", time: "4 hours ago", type: "faculty" },
    { action: "New course created", time: "1 day ago", type: "course" },
    { action: "Department updated", time: "2 days ago", type: "department" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your institution.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest changes in your system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 text-left  border border-gray-200 ring rounded-lg hover:bg-background transition-colors">
                <Users className="h-5 w-5 text-blue-600 mb-2" />
                <p className="text-sm font-medium">Add Student</p>
                <p className="text-xs text-gray-500">Enroll new student</p>
              </button>
              <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <GraduationCap className="h-5 w-5 text-green-600 mb-2" />
                <p className="text-sm font-medium">Add Faculty</p>
                <p className="text-xs text-gray-500">Hire new teacher</p>
              </button>
              <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <BookOpen className="h-5 w-5 text-purple-600 mb-2" />
                <p className="text-sm font-medium">Create Course</p>
                <p className="text-xs text-gray-500">Add new course</p>
              </button>
              <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="h-5 w-5 text-orange-600 mb-2" />
                <p className="text-sm font-medium">Schedule</p>
                <p className="text-xs text-gray-500">Manage timetables</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}