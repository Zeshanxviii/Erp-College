import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router"
import { GraduationCap, ArrowLeft, Calendar, BarChart3, FileText, Award } from "lucide-react"

export default function StudentPortal() {
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
              <span className="text-xl font-bold font-montserrat">Student Portal</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 font-montserrat">Student Dashboard</h1>
          <p className="text-xl text-muted-foreground">Your academic hub for courses, grades, and campus resources</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Course Registration</CardTitle>
              <CardDescription>Register for courses and view your schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Register for Courses</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Grades & Progress</CardTitle>
              <CardDescription>Track your academic progress and grades</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Grades</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Assignments</CardTitle>
              <CardDescription>View and submit your assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Assignments</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Award className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Academic Records</CardTitle>
              <CardDescription>Access transcripts and academic history</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Records</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
