import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { 
  // BookOpen, 
  GraduationCap, 
  Building2, 
  FileText, 
  Settings,
  Home,
  UserPlus,
  // UserMinus,
  // Trash2,
  // Users,
  Eye
} from "lucide-react";

const adminMenuItems = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: Home,
    variant: "default" as const
  },
  {
    title: "User Management",
    items: [
      { title: "Add Faculty", path: "/admin/faculty/add", icon: UserPlus, variant: "outline" as const },
      { title: "View Faculty", path: "/admin/faculty", icon: Eye, variant: "outline" as const },
      { title: "Add Student", path: "/admin/student/add", icon: UserPlus, variant: "outline" as const },
      { title: "View Students", path: "/admin/students", icon: Eye, variant: "outline" as const },
    ]
  },
  {
    title: "Academic Management",
    items: [
      { title: "Add Department", path: "/admin/department/add", icon: Building2, variant: "outline" as const },
      { title: "Add Subject", path: "/admin/subject/add", icon: GraduationCap, variant: "outline" as const },
      { title: "View Subjects", path: "/admin/subjects", icon: Eye, variant: "outline" as const },
    ]
  },
  {
    title: "System",
    items: [
      { title: "Create Notice", path: "/admin/notice/create", icon: FileText, variant: "outline" as const },
      { title: "Settings", path: "/admin/settings", icon: Settings, variant: "outline" as const },
    ]
  }
];

export default function SideBar() {
  return (
    <div className="w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground p-4 space-y-6">
      <nav className="space-y-2 ">
        {adminMenuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-2 font-bold text-xl">
            {section.title && section.path ? (
              <NavLink to={section.path} end>
                {({ isActive }) => (
                  <Button
                    variant={section.variant}
                    className={`w-full justify-start ${
                      isActive ? "bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-accent" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    {section.icon && <section.icon className="h-4 w-4 mr-2" />}
                    {section.title}
                  </Button>
                )}
              </NavLink>
            ) : (
              <div className="">
                <h3 className="px-2 text-sm font-semibold text-muted-foreground  uppercase tracking-wider">
                  {section.title}
                </h3>
                <div className="space-y-1 pl-2">
                  {section.items?.map((item, itemIndex) => (
                    <NavLink key={itemIndex} to={item.path}>
                      {({ isActive }) => (
                        <Button
                          variant={item.variant}
                          size="sm"
                          className={`w-full justify-start text-muted-foreground mt-2 ${
                            isActive ? "bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-accent" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          }`}
                        >
                          {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                          {item.title}
                        </Button>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
