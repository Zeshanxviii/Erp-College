import { Outlet } from "react-router";
import Navbar from "./pages/Navbar";

export default function RootLayout() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
