import { Button } from "@/components/ui/button"
import { GraduationCap, LogOut } from "lucide-react"
import { Link } from "react-router"
import { useAuthLogout, useAuthUser } from "@/store/authStore";

const Navbar = () => {
  // const { user, logout } = useAuthStore()
  const logout = useAuthLogout()
  const user = useAuthUser()
  // Debug logging
  console.log("Navbar rendered, user state:", user)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground font-montserrat leading-none">
            {user?.role =='admin'?'Admin' : 'EduManage'}
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

          {user ? (
            // User is logged in - show user menu
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.name}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="flex items-center `space-x-2 text-muted-foreground"
              >
                <LogOut className="h-4 w-4 " />
                Logout
              </Button>
            </div>
          ) : (
            // User is not logged in - show login buttons
              <Link to="/login">
                <Button variant="outline" className="text-muted-foreground" size="sm">
                  Login
                </Button>
              </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
