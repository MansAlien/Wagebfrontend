import { StudentLayout } from "../../components/StudentLayout";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { EmptyState } from "../../components/EmptyState";
import { Button } from "../../components/ui/button";
import { Link } from "react-router";
import { BookOpen, User, AlertCircle, Plus } from "lucide-react";

export function StudentClassroomList() {
  // Mock data
  const classrooms = [
    {
      id: 1,
      name: "Web Development 101",
      teacher: "Prof. Sarah Johnson",
      totalAssignments: 8,
      pendingAssignments: 2,
      color: "indigo",
    },
    {
      id: 2,
      name: "CS 202 - Data Structures",
      teacher: "Dr. Michael Chen",
      totalAssignments: 12,
      pendingAssignments: 4,
      color: "purple",
    },
    {
      id: 3,
      name: "Mobile App Development",
      teacher: "Prof. Emily Davis",
      totalAssignments: 5,
      pendingAssignments: 0,
      color: "teal",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      indigo: { bg: "bg-indigo-500", text: "text-indigo-700" },
      purple: { bg: "bg-purple-500", text: "text-purple-700" },
      teal: { bg: "bg-teal-500", text: "text-teal-700" },
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

        {/* Classrooms List */}
        {classrooms.length > 0 ? (
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
        ) : (
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
