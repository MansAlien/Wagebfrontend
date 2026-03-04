import { useState } from "react";
import { TeacherLayout } from "../../components/TeacherLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { EmptyState } from "../../components/EmptyState";
import { Link, useParams } from "react-router";
import {
  Copy,
  Plus,
  Users,
  FileText,
  Clock,
  CheckCircle2,
  MoreVertical,
} from "lucide-react";
import { toast } from "sonner";

export function TeacherClassroomDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("assignments");

  // Mock data
  const classroom = {
    id: 1,
    name: "Web Development 101",
    accessCode: "WEB101X",
    studentCount: 24,
    is_active: true,
    color: "indigo",
  };

  const assignments = [
    {
      id: 1,
      title: "Introduction to React Hooks",
      dueDate: "2026-03-08",
      submissions: 18,
      total: 24,
      status: "active",
    },
    {
      id: 2,
      title: "Building a Todo App",
      dueDate: "2026-03-15",
      submissions: 0,
      total: 24,
      status: "draft",
    },
    {
      id: 3,
      title: "State Management with Context",
      dueDate: "2026-03-01",
      submissions: 24,
      total: 24,
      status: "completed",
    },
  ];

  const students = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", completed: 8 },
    { id: 2, name: "Bob Smith", email: "bob@example.com", completed: 7 },
    { id: 3, name: "Carol Williams", email: "carol@example.com", completed: 8 },
    { id: 4, name: "David Brown", email: "david@example.com", completed: 6 },
  ];

  const copyAccessCode = () => {
    navigator.clipboard.writeText(classroom.accessCode);
    toast.success("Access code copied to clipboard!");
  };

  const getStatusBadge = (status: string) => {
    if (status === "completed") {
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          Completed
        </Badge>
      );
    }
    if (status === "draft") {
      return (
        <Badge variant="secondary">
          Draft
        </Badge>
      );
    }
    return (
      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
        Active
      </Badge>
    );
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      indigo: "bg-indigo-500",
      purple: "bg-purple-500",
      blue: "bg-blue-500",
      teal: "bg-teal-500",
      amber: "bg-amber-500",
      rose: "bg-rose-500",
    };
    return colors[color] || colors.indigo;
  };

  return (
    <TeacherLayout>
      <div className="p-6 md:p-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold text-gray-900">
                {classroom.name}
              </h1>
              {!classroom.is_active && (
                <Badge className="bg-gray-500 text-white hover:bg-gray-500">
                  Inactive
                </Badge>
              )}
            </div>
            <Button variant="outline" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>

          {/* Access Code Card */}
          {classroom.is_active ? (
            <Card className="p-4 bg-indigo-50 border-indigo-200 relative overflow-hidden">
              {/* Color bar at the top */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${getColorClasses(classroom.color)}`} />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-0.5">Access Code</p>
                    <p className="text-xl font-semibold font-mono text-gray-900">
                      {classroom.accessCode}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyAccessCode}
                  className="bg-white"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-4 bg-gray-100 border-gray-300">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-gray-500" />
                </div>
                <p className="text-sm text-gray-600">
                  This classroom is inactive. Students cannot join using the access code.
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b border-gray-200 mb-6">
            <TabsList className="bg-transparent">
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="students">
                Students ({classroom.studentCount})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Assignments Tab */}
          <TabsContent value="assignments">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Assignments
              </h2>
              <Link to={`/teacher/classroom/${id}/create-assignment`}>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Assignment
                </Button>
              </Link>
            </div>

            {assignments.length > 0 ? (
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <Link
                    key={assignment.id}
                    to={`/teacher/assignment/${assignment.id}`}
                  >
                    <Card className="p-5 hover:shadow-md hover:border-indigo-300 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium text-gray-900">
                              {assignment.title}
                            </h3>
                            {getStatusBadge(assignment.status)}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            Due {new Date(assignment.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-sm font-medium text-gray-900 mb-1">
                            <CheckCircle2 className="w-4 h-4 mr-1 text-green-600" />
                            {assignment.submissions}/{assignment.total}
                          </div>
                          <p className="text-xs text-gray-500">completed</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-8">
                <EmptyState
                  icon={<FileText className="w-8 h-8 text-gray-400" />}
                  title="No assignments yet"
                  description="Create your first assignment for this classroom."
                  action={
                    <Link to={`/teacher/classroom/${id}/create-assignment`}>
                      <Button className="bg-indigo-600 hover:bg-indigo-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Assignment
                      </Button>
                    </Link>
                  }
                />
              </Card>
            )}
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Completed
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr
                        key={student.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                              <span className="text-sm font-medium text-indigo-700">
                                {student.name.charAt(0)}
                              </span>
                            </div>
                            <div className="font-medium text-gray-900">
                              {student.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {student.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="secondary">
                            {student.completed} / {assignments.length}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TeacherLayout>
  );
}