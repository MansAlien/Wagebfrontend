import { ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { LayoutDashboard, BookOpen, UserCheck } from "lucide-react";

interface TeacherLayoutProps {
  children: ReactNode;
}

export function TeacherLayout({ children }: TeacherLayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: "/teacher", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/teacher/classrooms", icon: BookOpen, label: "Classrooms" },
    { path: "/teacher/enrollments", icon: UserCheck, label: "Enrollments" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="font-semibold text-xl text-gray-900">Wageb</h1>
          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded">
            Teacher
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between h-full px-4">
          <h1 className="font-semibold text-xl text-gray-900">Wageb</h1>
          <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded">
            Teacher
          </span>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        {children}
      </main>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center px-3 py-2 text-xs font-medium ${
                  isActive ? "text-indigo-700" : "text-gray-600"
                }`}
              >
                <item.icon className="w-5 h-5 mb-1" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
