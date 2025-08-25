import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"
import { Link, Outlet } from "react-router"

const Navbar = () => {
  return (
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
          <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Button variant="outline" size="sm">
              Student Login
            </Button>
          </Link>
          <Link
            to="/staff"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <Button variant="outline" size="sm">
              Faculty Login
            </Button>
          </Link>
          {/* <Link
              to="/admin"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Button variant="outline" size="sm">
              Sign In
            </Button>
            </Link> */}
        </div>
      </div>
      <Outlet />
    </header>

  )
}

export default Navbar