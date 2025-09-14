

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router"
import apiService from "../../api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { useAuthStore } from "@/store/authStore"

interface LoginFormProps {
  userType: string
}

export function LoginForm({ userType }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  // Store hooks - now using unified authStore
  const { login: authLogin, setLoading: setAuthLoading} = useAuthStore()
  
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setAuthLoading(true)
    setIsLoading(true)

    // Enhanced validation
    if (!email || !password) {
      setError("Please fill in all fields")
      setAuthLoading(false)
      setIsLoading(false)
      return
    }

    try {
      // Make API call based on user type
      let response;
      let userData;
      
      switch (userType) {
        case "admin":
          response = await apiService.admin.login({ username: email, password })
          
          // Create admin user data
          userData = {
            id: response.data.user?.id || '1',
            email: email,
            name: response.data.user?.username || email.split('@')[0],
            role: 'admin' as const,
            permissions: [],
            lastLogin: new Date().toISOString()
          };
          break
          
        case "faculty":
          response = await apiService.faculty.login({ username: email, password })
          
          // Create faculty user data
          userData = {
            id: response.data.user?.id || '1',
            email: email,
            name: response.data.user?.username || email.split('@')[0],
            role: 'faculty' as const,
            department: 'Computer Science' // Default value since API doesn't provide this
          };
          break
          
        case "student":
          response = await apiService.student.login({ username: email, password })
          
          // Create student user data
          userData = {
            id: response.data.user?.id || '1',
            email: email,
            name: response.data.user?.username || email.split('@')[0],
            role: 'student' as const,
            department: 'Computer Science', // Default value since API doesn't provide this
            year: 2, // Default value since API doesn't provide this
            semester: 3 // Default value since API doesn't provide this
          };
          break
          
        default:
          throw new Error("Invalid user type")
      }

      // Use unified auth store for all user types
      if (userData && response.data.token) {
        console.log('LoginForm: Logging in user with unified auth store:', userData)
        authLogin(userData, response.data.token)
      }

      // Redirect to appropriate portal using React Router
      switch (userType) {
        case "admin":
          navigate("/admin")
          break
        case "faculty":
          navigate("/staff-portal")
          break
        case "student":
          navigate("/student-portal")
          break
      }

    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.response?.data?.message || "Login failed. Please check your credentials.")
    } finally {
      setAuthLoading(false)
      setIsLoading(false)
    }
  }

  const getPlaceholderEmail = () => {
    switch (userType) {
      case "student":
        return "student@university.edu"
      case "faculty":
        return "faculty@university.edu"
      case "admin":
        return "admin@university.edu"
      default:    
        return "your.email@university.edu"
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="string"
            placeholder={getPlaceholderEmail()}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button type="button" variant="link" className="px-0 text-sm text-muted-foreground hover:text-primary">
          Forgot password?
        </Button>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : `Sign in as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Need help? Contact{" "}
        <Button variant="link" className="px-0 text-sm">
          IT Support
        </Button>
      </div>
    </form>
  )
}
