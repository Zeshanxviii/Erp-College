import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router"
import { GraduationCap, ArrowLeft, BookOpen, Calendar, MessageSquare, FileText } from "lucide-react"

export default function StaffPortal() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-montserrat">Staff Portal</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 font-montserrat">Faculty & Staff Dashboard</h1>
          <p className="text-xl text-muted-foreground">Efficient tools for course management and student interaction</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Course Management</CardTitle>
              <CardDescription>Create and manage your courses and content</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Manage Courses</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Class Schedule</CardTitle>
              <CardDescription>View and manage your class schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Schedule</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageSquare className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Student Communication</CardTitle>
              <CardDescription>Communicate with students and parents</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Messages</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Assignments & Grading</CardTitle>
              <CardDescription>Manage assignments and grade submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Grade Center</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
