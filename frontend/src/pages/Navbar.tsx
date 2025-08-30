import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"
import { Link } from "react-router" // Fixed: should be react-router-dom

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground font-montserrat leading-none">
            EduManage
          </span>
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>

          <Link to="/login">
            <Button variant="outline" size="sm">
              Student Login
            </Button>
          </Link>

          <Link to="/staff">
            <Button variant="outline" size="sm">
              Faculty Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
