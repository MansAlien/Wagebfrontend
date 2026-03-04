import { StudentLayout } from "../../components/StudentLayout";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { EmptyState } from "../../components/EmptyState";
import { Button } from "../../components/ui/button";
import { Link } from "react-router";
import { BookOpen, User, AlertCircle, Plus, X } from "lucide-react";
import { useState } from "react";

export function StudentClassroomList() {
  const [dismissedRejections, setDismissedRejections] = useState<number[]>([]);

  // Mock data
  const classrooms = [
    {
      id: 1,
      name: "Web Development 101",
      teacher: "Prof. Sarah Johnson",
      totalAssignments: 8,
      pendingAssignments: 2,
      color: "indigo",
      status: "approved",
    },
    {
      id: 2,
      name: "CS 202 - Data Structures",
      teacher: "Dr. Michael Chen",
      totalAssignments: 12,
      pendingAssignments: 4,
      color: "purple",
      status: "approved",
    },
    {
      id: 3,
      name: "Mobile App Development",
      teacher: "Prof. Emily Davis",
      totalAssignments: 5,
      pendingAssignments: 0,
      color: "teal",
      status: "approved",
    },
  ];

  const pendingEnrollments = [
    {
      id: 4,
      name: "Advanced React Patterns",
      teacher: "Dr. James Wilson",
      color: "blue",
    },
    {
      id: 5,
      name: "Database Design",
      teacher: "Prof. Maria Garcia",
      color: "amber",
    },
  ];

  const rejectedEnrollments = [
    {
      id: 6,
      name: "Machine Learning Basics",
    },
  ];

  const visibleRejections = rejectedEnrollments.filter(
    (r) => !dismissedRejections.includes(r.id)
  );

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      indigo: { bg: "bg-indigo-500", text: "text-indigo-700" },
      purple: { bg: "bg-purple-500", text: "text-purple-700" },
      teal: { bg: "bg-teal-500", text: "text-teal-700" },
      blue: { bg: "bg-blue-500", text: "text-blue-700" },
      amber: { bg: "bg-amber-500", text: "text-amber-700" },
    };
    return colors[color] || colors.indigo;
  };

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              My Classrooms
            </h1>
            <p className="text-gray-600">
              Access your enrolled classrooms and assignments
            </p>
          </div>
          <Link to="/student/join">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              Join Classroom
            </Button>
          </Link>
        </div>

        {/* Rejected Enrollments Notice */}
        {visibleRejections.map((rejection) => (
          <div
            key={rejection.id}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start justify-between"
          >
            <p className="text-sm text-red-900">
              Your request to join <strong>{rejection.name}</strong> was not approved.
            </p>
            <button
              onClick={() =>
                setDismissedRejections([...dismissedRejections, rejection.id])
              }
              className="text-red-600 hover:text-red-700 flex-shrink-0 ml-4"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}

        {/* Pending Enrollments Section */}
        {pendingEnrollments.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Pending Requests
            </h2>
            <div className="space-y-4">
              {pendingEnrollments.map((enrollment) => {
                const colors = getColorClasses(enrollment.color);
                return (
                  <Card key={enrollment.id} className="p-6 opacity-80">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Color indicator */}
                        <div
                          className={`w-12 h-1 rounded-full mb-4 ${colors.bg}`}
                        />

                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {enrollment.name}
                        </h3>

                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <User className="w-4 h-4 mr-1" />
                          {enrollment.teacher}
                        </div>
                      </div>

                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        Pending Approval
                      </Badge>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Approved Classrooms List */}
        {classrooms.length > 0 && (
          <>
            {pendingEnrollments.length > 0 && (
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                My Classrooms
              </h2>
            )}
            <div className="space-y-4">
              {classrooms.map((classroom) => {
                const colors = getColorClasses(classroom.color);
                return (
                  <Link
                    key={classroom.id}
                    to={`/student/classroom/${classroom.id}`}
                  >
                    <Card className="p-6 hover:shadow-lg hover:border-indigo-300 transition-all duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          {/* Color indicator */}
                          <div
                            className={`w-12 h-1 rounded-full mb-4 ${colors.bg}`}
                          />

                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {classroom.name}
                          </h3>

                          <div className="flex items-center text-sm text-gray-600 mb-4">
                            <User className="w-4 h-4 mr-1" />
                            {classroom.teacher}
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-600">
                              <span className="font-medium text-gray-900">
                                {classroom.totalAssignments}
                              </span>{" "}
                              total assignments
                            </div>
                            {classroom.pendingAssignments > 0 && (
                              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                {classroom.pendingAssignments} pending
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Pending count indicator */}
                        {classroom.pendingAssignments > 0 && (
                          <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-amber-100">
                            <span className="text-2xl font-bold text-amber-700">
                              {classroom.pendingAssignments}
                            </span>
                            <span className="text-xs text-amber-600">
                              pending
                            </span>
                          </div>
                        )}
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* Empty state */}
        {classrooms.length === 0 && pendingEnrollments.length === 0 && (
          <Card className="p-8">
            <EmptyState
              icon={<BookOpen className="w-8 h-8 text-gray-400" />}
              title="No classrooms yet"
              description="Join your first classroom using an access code from your teacher."
              action={
                <Link to="/student/join">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Join Classroom
                  </Button>
                </Link>
              }
            />
          </Card>
        )}
      </div>
    </StudentLayout>
  );
}