import { Link } from "react-router";
import { GraduationCap, Users } from "lucide-react";
import { Button } from "../components/ui/button";

export function RoleSelector() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Logo & Welcome */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Wageb</h1>
          <p className="text-lg text-gray-600">
            Welcome back! Choose how you'd like to continue.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Teacher Card */}
          <Link
            to="/teacher"
            className="group block bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-indigo-500 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-4 group-hover:bg-indigo-500 transition-colors">
                <Users className="w-10 h-10 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Teacher
              </h2>
              <p className="text-gray-600 mb-6">
                Manage classrooms, create assignments, and track student progress
              </p>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6">
                Continue as Teacher
              </Button>
            </div>
          </Link>

          {/* Student Card */}
          <Link
            to="/student"
            className="group block bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-teal-500 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mb-4 group-hover:bg-teal-500 transition-colors">
                <GraduationCap className="w-10 h-10 text-teal-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Student
              </h2>
              <p className="text-gray-600 mb-6">
                Access your classrooms, view assignments, and track your work
              </p>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6">
                Continue as Student
              </Button>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Simple, trustworthy classroom management for everyone
        </p>
      </div>
    </div>
  );
}
