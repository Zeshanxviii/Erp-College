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
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, useScroll } from "motion/react"

const Home = () => {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* Fixed scroll progress bar at the top */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto text-center"
          >
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
              Trusted by 500+ Educational Institutions
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 font-montserrat leading-tight">
              Empowering Educational
              <span className="text-primary block">Management</span>
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
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 font-semibold bg-transparent">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </section>

        {/* User Type Sections */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat">Built for Every User</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Tailored experiences for administrators, staff, and students with role-specific features and interfaces.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Admin */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card id="admin" className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 h-full">
                  <CardHeader className="text-center pb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Settings className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold font-montserrat">Admin</CardTitle>
                    <CardDescription className="text-base">
                      Complete institutional oversight with advanced management and analytics capabilities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">User Management & Role Assignment</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Advanced Analytics & Reporting</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Security & Compliance Management</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Database className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">System Configuration & Maintenance</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Academic Program Management</span>
                    </div>
                    <Button className="w-full mt-6 font-semibold">
                      Admin Dashboard
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Staff */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card id="staff" className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 h-full">
                  <CardHeader className="text-center pb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <UserCheck className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold font-montserrat">Staff</CardTitle>
                    <CardDescription className="text-base">
                      Efficient tools for faculty and administrative staff to manage courses and student interactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Course Creation & Content Management</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Grading & Assessment Tools</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Class Scheduling & Attendance</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Student Communication Hub</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Assignment & Resource Management</span>
                    </div>
                    <Button className="w-full mt-6 font-semibold">
                      Staff Portal
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Students */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card
                  id="students"
                  className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 h-full"
                >
                  <CardHeader className="text-center pb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold font-montserrat">Students</CardTitle>
                    <CardDescription className="text-base">
                      Comprehensive student portal for academic resources, grades, and campus life management
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Course Registration & Scheduling</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Grade Tracking & Progress Analytics</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Assignment Submission & Resources</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Faculty Communication & Support</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Academic Records & Transcripts</span>
                    </div>
                    <Button className="w-full mt-6 font-semibold">
                      Student Portal
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat">Powerful Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage your educational institution effectively and efficiently
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Clock,
                  title: "Real-time Updates",
                  desc: "Instant notifications and live data synchronization across all platforms"
                },
                {
                  icon: Shield,
                  title: "Secure & Compliant",
                  desc: "Enterprise-grade security with FERPA compliance and data protection"
                },
                {
                  icon: BarChart3,
                  title: "Advanced Analytics",
                  desc: "Comprehensive reporting and actionable insights for better decision making"
                },
                {
                  icon: MessageSquare,
                  title: "Seamless Communication",
                  desc: "Integrated messaging and collaboration tools for the entire campus"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center p-8 rounded-lg hover:bg-card transition-all duration-300 hover:shadow-lg"
                >
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-3 font-montserrat">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat">What Our Users Say</h2>
              <p className="text-xl text-muted-foreground">Trusted by educational institutions worldwide</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Settings,
                  quote: "EduManage has completely transformed our administrative processes. The comprehensive analytics and user management features have saved us countless hours every week.",
                  name: "Dr. Sarah Johnson",
                  role: "Academic Administrator"
                },
                {
                  icon: UserCheck,
                  quote: "The staff portal makes course management and student communication incredibly efficient. I can focus more on teaching and less on administrative tasks.",
                  name: "Prof. Michael Rodriguez",
                  role: "Faculty Member"
                },
                {
                  icon: BookOpen,
                  quote: "Having all my courses, grades, and schedules in one place is amazing. The mobile app keeps me organized and connected to campus life.",
                  name: "Alex Chen",
                  role: "Computer Science Student"
                }
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardContent className="pt-8">
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <testimonial.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold font-montserrat">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="container mx-auto text-center"
          >
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
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 border-t bg-muted/30">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <span className="text-xl font-bold font-montserrat">EduManage</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Empowering educational institutions with comprehensive ERP solutions for the digital age.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-4 font-montserrat">Quick Links</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4 font-montserrat">Support</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Training
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Status
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4 font-montserrat">Legal</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Security
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
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
    </>
  )
}

export default Home;