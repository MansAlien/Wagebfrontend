import { TeacherLayout } from "../../components/TeacherLayout";
import { Card } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { Badge } from "../../components/ui/badge";
import { Link } from "react-router";
import {
  BookOpen,
  HardDrive,
  Clock,
  Users,
  AlertCircle,
} from "lucide-react";

export function TeacherDashboard() {
  // Mock data
  const stats = {
    classroomCount: 4,
    storageUsed: 2.4,
    storageTotal: 5,
    pendingEnrollments: 3,
  };

  const recentAssignments = [
    {
      id: 1,
      title: "Introduction to React Hooks",
      classroom: "Web Development 101",
      dueDate: "2026-03-08",
      submissions: 18,
      total: 24,
    },
    {
      id: 2,
      title: "Database Design Assignment",
      classroom: "CS 202",
      dueDate: "2026-03-10",
      submissions: 12,
      total: 28,
    },
    {
      id: 3,
      title: "Algorithm Analysis Quiz",
      classroom: "Data Structures",
      dueDate: "2026-03-12",
      submissions: 22,
      total: 22,
    },
  ];

  const storagePercentage = (stats.storageUsed / stats.storageTotal) * 100;

  return (
    <TeacherLayout>
      <div className="p-6 md:p-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Overview of your teaching activities</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Classrooms */}
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Classrooms</p>
                <p className="text-3xl font-semibold text-gray-900">
                  {stats.classroomCount}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <Link
              to="/teacher/classrooms"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium mt-4 inline-block"
            >
              View all classrooms →
            </Link>
          </Card>

          {/* Storage */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Storage Used</p>
                <p className="text-3xl font-semibold text-gray-900">
                  {stats.storageUsed} GB
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <HardDrive className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="space-y-2">
              <Progress value={storagePercentage} className="h-2" />
              <p className="text-xs text-gray-500">
                {stats.storageUsed} GB of {stats.storageTotal} GB used
              </p>
            </div>
          </Card>

          {/* Pending Enrollments */}
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Enrollments</p>
                <p className="text-3xl font-semibold text-gray-900">
                  {stats.pendingEnrollments}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <Link
              to="/teacher/enrollments"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium mt-4 inline-block"
            >
              Review requests →
            </Link>
          </Card>
        </div>

        {/* Recent Assignments */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Assignments
            </h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {recentAssignments.map((assignment) => (
              <Link
                key={assignment.id}
                to={`/teacher/assignment/${assignment.id}`}
                className="block p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {assignment.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {assignment.classroom}
                    </p>
                  </div>
                  <Badge
                    variant={
                      assignment.submissions === assignment.total
                        ? "default"
                        : "secondary"
                    }
                  >
                    {assignment.submissions}/{assignment.total} done
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Due {new Date(assignment.dueDate).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </TeacherLayout>
  );
}
