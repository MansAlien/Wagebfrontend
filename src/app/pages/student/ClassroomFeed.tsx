import { StudentLayout } from "../../components/StudentLayout";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { EmptyState } from "../../components/EmptyState";
import { Link, useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";

export function StudentClassroomFeed() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data
  const classroom = {
    id: 1,
    name: "Web Development 101",
    teacher: "Prof. Sarah Johnson",
  };

  const assignments = [
    {
      id: 1,
      title: "Introduction to React Hooks",
      dueDate: "2026-03-08",
      status: "pending",
      description:
        "Learn about React Hooks and implement useState and useEffect",
    },
    {
      id: 2,
      title: "Building a Todo App",
      dueDate: "2026-03-15",
      status: "pending",
      description: "Create a fully functional todo application with CRUD operations",
    },
    {
      id: 3,
      title: "CSS Flexbox Layout",
      dueDate: "2026-02-28",
      status: "completed",
      completedDate: "2026-02-27",
      description: "Master CSS Flexbox by creating responsive layouts",
    },
    {
      id: 4,
      title: "JavaScript Async Programming",
      dueDate: "2026-02-25",
      status: "completed",
      completedDate: "2026-02-24",
      description: "Understand promises, async/await, and API calls",
    },
  ];

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date("2026-03-04");
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (assignment: typeof assignments[0]) => {
    if (assignment.status === "completed") {
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Completed
        </Badge>
      );
    }

    const daysUntilDue = getDaysUntilDue(assignment.dueDate);

    if (daysUntilDue < 0) {
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          <AlertCircle className="w-3 h-3 mr-1" />
          Overdue
        </Badge>
      );
    }

    if (daysUntilDue <= 2) {
      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
          <Clock className="w-3 h-3 mr-1" />
          Due Soon
        </Badge>
      );
    }

    return (
      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
        <Clock className="w-3 h-3 mr-1" />
        Pending
      </Badge>
    );
  };

  const pendingAssignments = assignments.filter((a) => a.status === "pending");
  const completedAssignments = assignments.filter((a) => a.status === "completed");

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/student")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to My Classrooms
          </Button>
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              {classroom.name}
            </h1>
            <p className="text-gray-600">{classroom.teacher}</p>
          </div>
        </div>

        {/* Pending Assignments */}
        {pendingAssignments.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Pending Assignments
            </h2>
            <div className="space-y-4">
              {pendingAssignments.map((assignment) => (
                <Link
                  key={assignment.id}
                  to={`/student/assignment/${assignment.id}`}
                >
                  <Card className="p-5 hover:shadow-lg hover:border-indigo-300 transition-all duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {assignment.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {assignment.description}
                        </p>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          Due {new Date(assignment.dueDate).toLocaleDateString()}
                          {getDaysUntilDue(assignment.dueDate) >= 0 && (
                            <span className="ml-2 text-gray-500">
                              ({getDaysUntilDue(assignment.dueDate)} days left)
                            </span>
                          )}
                        </div>
                      </div>
                      <div>{getStatusBadge(assignment)}</div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Completed Assignments */}
        {completedAssignments.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Completed Assignments
            </h2>
            <div className="space-y-4">
              {completedAssignments.map((assignment) => (
                <Link
                  key={assignment.id}
                  to={`/student/assignment/${assignment.id}`}
                >
                  <Card className="p-5 hover:shadow-md hover:border-gray-300 transition-all duration-200 opacity-75">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {assignment.title}
                          </h3>
                          {getStatusBadge(assignment)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {assignment.description}
                        </p>
                        <div className="text-sm text-gray-500">
                          Completed on{" "}
                          {assignment.completedDate &&
                            new Date(assignment.completedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {assignments.length === 0 && (
          <Card className="p-8">
            <EmptyState
              icon={<FileText className="w-8 h-8 text-gray-400" />}
              title="No assignments yet"
              description="Your teacher hasn't posted any assignments yet. Check back later!"
            />
          </Card>
        )}
      </div>
    </StudentLayout>
  );
}
