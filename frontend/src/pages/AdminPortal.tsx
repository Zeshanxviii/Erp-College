import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router"
import { GraduationCap, ArrowLeft, Users, BarChart3, Settings, Shield } from "lucide-react"

export default function AdminPortal() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-montserrat">Admin Portal</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 font-montserrat">Administrator Dashboard</h1>
          <p className="text-xl text-muted-foreground">Complete institutional oversight and management capabilities</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users, roles, and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Access User Management</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>View institutional performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Analytics</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Settings className="h-8 w-8 text-primary mb-2" />
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Configure system settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">System Settings</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Security & Compliance</CardTitle>
              <CardDescription>Manage security policies and compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Security Center</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
