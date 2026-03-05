import { ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { BookOpen, Plus } from "lucide-react";
import { UserProfileDropdown } from "./UserProfileDropdown";

interface StudentLayoutProps {
  children: ReactNode;
}

export function StudentLayout({ children }: StudentLayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: "/student", icon: BookOpen, label: "My Classrooms" },
    { path: "/student/join", icon: Plus, label: "Join" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="font-semibold text-xl text-gray-900">Wageb</h1>
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-teal-100 text-teal-700 rounded">
                Student
              </span>
            </div>

            <nav className="flex items-center space-x-4">
              <div className="flex space-x-1">
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
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <UserProfileDropdown userRole="student" />
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>{children}</main>
    </div>
  );
}
