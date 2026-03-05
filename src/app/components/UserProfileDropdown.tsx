import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { Settings, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserProfileDropdownProps {
  userRole: "teacher" | "student";
  position?: "top" | "bottom";
}

export function UserProfileDropdown({ userRole, position = "bottom" }: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock user data - replace with actual user data from your auth system
  const user = {
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@example.com",
    avatarUrl: "", // Empty for now to show fallback
  };

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    window.location.href = "/";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full"
      >
        <Avatar className="h-8 w-8 cursor-pointer border-2 border-gray-200 hover:border-indigo-300 transition-colors">
          <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
          <AvatarFallback className="bg-indigo-100 text-indigo-700 text-sm font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute right-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 ${
          position === "top" ? "bottom-full mb-2" : "top-full mt-2"
        }`}>
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
                <AvatarFallback className="bg-indigo-100 text-indigo-700 font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              to={`/${userRole}/settings`}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4 mr-3 text-gray-500" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3 text-red-500" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
