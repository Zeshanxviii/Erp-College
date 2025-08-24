import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"
import { Link, Outlet } from "react-router"

const Navbar = () => {
    return(
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground font-montserrat">EduManage</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/students" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Student Login
            </Link>
            <Link
              to="/staff"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Staff Login
            </Link>
            <Link
              to="/admin"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Admin Login
            </Link>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </div>
        <Outlet />
      </header>
      
    )
}

export default Navbar