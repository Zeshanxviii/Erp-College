"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "../form/login-form"
import { GraduationCap, Users, Shield } from "lucide-react"

export function LoginTabs() {
  const [activeTab, setActiveTab] = useState("student")

  const userTypes = [
    {
      id: "student",
      label: "Student",
      icon: GraduationCap,
      title: "Student Login",
      description: "Access your courses, grades, and academic information",
    },
    {
      id: "faculty",
      label: "Faculty",
      icon: Users,
      title: "Faculty Login",
      description: "Manage courses, students, and academic resources",
    },
    {
      id: "admin",
      label: "Admin",
      icon: Shield,
      title: "Administrator Login",
      description: "System administration and management access",
    },
  ]

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {userTypes.map((type) => {
              const Icon = type.icon
              return (
                <TabsTrigger key={type.id} value={type.id} className="flex items-center gap-2 text-sm">
                  <Icon className="h-4 w-4" />
                  {type.label}
                </TabsTrigger>
              )
            })}
          </TabsList>

          {userTypes.map((type) => {
            const Icon = type.icon
            return (
              <TabsContent key={type.id} value={type.id} className="mt-6">
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold">{type.title}</CardTitle>
                  <CardDescription className="mt-2">{type.description}</CardDescription>
                </div>
                <LoginForm userType={type.id} />
              </TabsContent>
            )
          })}
        </Tabs>
      </CardHeader>
    </Card>
  )
}
