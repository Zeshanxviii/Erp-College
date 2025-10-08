import { Outlet } from "react-router";
import SideBar from "@/components/navigation/SideBar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-background">
      <SideBar />
      <main className="flex-1 overflow-y-auto p-6 ">
        <Outlet />
      </main>
    </div>
  );
}
