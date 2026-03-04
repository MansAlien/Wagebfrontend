import { TeacherLayout } from "../../components/TeacherLayout";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { EmptyState } from "../../components/EmptyState";
import { Link } from "react-router";
import { Plus, Users, FileText, Key, BookOpen } from "lucide-react";

export function TeacherClassroomList() {
  // Mock data
  const classrooms = [
    {
      id: 1,
      name: "Web Development 101",
      accessCode: "WEB101X",
      studentCount: 24,
      assignmentCount: 8,
      color: "indigo",
    },
    {
      id: 2,
      name: "CS 202 - Data Structures",
      accessCode: "CS202AB",
      studentCount: 28,
      assignmentCount: 12,
      color: "purple",
    },
    {
      id: 3,
      name: "Advanced Algorithms",
      accessCode: "ALG401Z",
      studentCount: 22,
      assignmentCount: 6,
      color: "blue",
    },
    {
      id: 4,
      name: "Mobile App Development",
      accessCode: "MOB301Y",
      studentCount: 18,
      assignmentCount: 5,
      color: "teal",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      indigo: "bg-indigo-500",
      purple: "bg-purple-500",
      blue: "bg-blue-500",
      teal: "bg-teal-500",
    };
    return colors[color] || colors.indigo;
  };

  return (
    <TeacherLayout>
      <div className="p-6 md:p-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              My Classrooms
            </h1>
            <p className="text-gray-600">
              Manage your classrooms and track student progress
            </p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            New Classroom
          </Button>
        </div>

        {/* Classrooms Grid */}
        {classrooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classrooms.map((classroom) => (
              <Link
                key={classroom.id}
                to={`/teacher/classroom/${classroom.id}`}
              >
                <Card className="p-6 hover:shadow-lg hover:border-indigo-300 transition-all duration-200 h-full">
                  {/* Color bar */}
                  <div
                    className={`w-full h-2 rounded-full mb-4 ${getColorClasses(
                      classroom.color
                    )}`}
                  />

                  {/* Classroom name */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {classroom.name}
                  </h3>

                  {/* Access code */}
                  <div className="flex items-center mb-4">
                    <Key className="w-4 h-4 text-gray-400 mr-2" />
                    <Badge variant="secondary" className="font-mono">
                      {classroom.accessCode}
                    </Badge>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{classroom.studentCount} students</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="w-4 h-4 mr-1" />
                      <span>{classroom.assignmentCount} assignments</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="p-8">
            <EmptyState
              icon={<BookOpen className="w-8 h-8 text-gray-400" />}
              title="No classrooms yet"
              description="Create your first classroom to start managing assignments and students."
              action={
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Classroom
                </Button>
              }
            />
          </Card>
        )}
      </div>
    </TeacherLayout>
  );
}
