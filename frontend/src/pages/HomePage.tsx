import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router"
// import AuthDebugger from "@/components/AuthDebugger"
import {
  GraduationCap,
  Users,
  Settings,
  BookOpen,
  Calendar,
  BarChart3,
  MessageSquare,
  FileText,
  Shield,
  Clock,
  UserCheck,
  Database,
  Award,
  ChevronRight,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-primary text-primary-foreground rounded-full px-4 py-2">
            Trusted by 500+ Educational Institutions 🚀
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 font-montserrat leading-tight">
            Empowering Educational
            <span className="text-primary  block">Management</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            A comprehensive ERP solution designed specifically for administrators, staff, and students to enhance
            academic excellence and streamline institutional operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3 font-semibold">
              Get Started Today
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 text-white font-semibold bg-transparent">
              Schedule Demo
            </Button>
          </div>
          
          {/* Temporary Auth Debugger - Remove in production */}
          <div className="mt-8 flex justify-center">
            {/* <AuthDebugger /> */}
          </div>
        </div>
      </section>

      {/* User Type Sections */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-foreground font-bold mb-4 font-montserrat">Built for Every User</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tailored experiences for administrators, staff, and students with role-specific features and interfaces.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Admin */}
            <Card id="admin" className="hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/20">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-2xl font-bold font-montserrat">Admin</CardTitle>
                <CardDescription className="text-base">
                  Complete institutional oversight with advanced management and analytics capabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">User Management & Role Assignment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Advanced Analytics & Reporting</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Security & Compliance Management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Database className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">System Configuration & Maintenance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Academic Program Management</span>
                </div>
                <Link to="/admin">
                  <Button className="w-full mt-6 font-semibold">
                    Admin Dashboard
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Staff */}
            <Card id="staff" className="hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/20">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserCheck className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-2xl font-bold font-montserrat">Staff</CardTitle>
                <CardDescription className="text-base">
                  Efficient tools for faculty and administrative staff to manage courses and student interactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Course Creation & Content Management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Grading & Assessment Tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Class Scheduling & Attendance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Student Communication Hub</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Assignment & Resource Management</span>
                </div>
                <Link to="/staff">
                  <Button className="w-full mt-6 font-semibold">
                    Staff Portal
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Students */}
            <Card id="students" className="hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/20">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-2xl font-bold font-montserrat">Students</CardTitle>
                <CardDescription className="text-base">
                  Comprehensive student portal for academic resources, grades, and campus life management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Course Registration & Scheduling</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Grade Tracking & Progress Analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Assignment Submission & Resources</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Faculty Communication & Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Academic Records & Transcripts</span>
                </div>
                <Link to="/students">
                  <Button className="w-full mt-6 font-semibold">
                    Student Portal
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-foreground font-bold mb-4 font-montserrat">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your educational institution effectively and efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-lg hover:bg-card transition-all duration-300 hover:shadow-lg">
              <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-bold mb-3 text-foreground font-montserrat">Real-time Updates</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Instant notifications and live data synchronization across all platforms
              </p>
            </div>

            <div className="text-center p-8 rounded-lg hover:bg-card transition-all duration-300 hover:shadow-lg">
              <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-bold mb-3 text-foreground font-montserrat">Secure & Compliant</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enterprise-grade security with FERPA compliance and data protection
              </p>
            </div>

            <div className="text-center p-8 rounded-lg hover:bg-card transition-all duration-300 hover:shadow-lg">
              <BarChart3 className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-bold mb-3 text-foreground font-montserrat">Advanced Analytics</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Comprehensive reporting and actionable insights for better decision making
              </p>
            </div>

            <div className="text-center p-8 rounded-lg hover:bg-card transition-all duration-300 hover:shadow-lg">
              <MessageSquare className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-bold mb-3 text-foreground font-montserrat">Seamless Communication</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Integrated messaging and collaboration tools for the entire campus
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">Ready to Transform Your Institution?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join hundreds of educational institutions already using EduManage to streamline their operations and enhance
            student success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3 font-semibold">
              Start Free Trial
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 font-semibold border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <GraduationCap className="h-8 w-8 text-accent" />
                <span className="text-xl font-bold text-foreground font-montserrat">EduManage</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Empowering educational institutions with comprehensive ERP solutions for the digital age.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-foreground font-montserrat">Quick Links</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-foreground font-montserrat">Support</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Training
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-foreground font-montserrat">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 EduManage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
