import { TeacherLayout } from "../../components/TeacherLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Download,
  CheckCircle2,
  Clock,
} from "lucide-react";

export function TeacherAssignmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data
  const assignment = {
    id: 1,
    title: "Introduction to React Hooks",
    description: `In this assignment, you will learn about React Hooks and how they can be used to manage state and side effects in functional components.

## Requirements:
1. Create a simple counter app using useState
2. Implement a data fetching component using useEffect
3. Create a custom hook for form handling

## Submission Guidelines:
- Submit your code as a zip file
- Include a README with instructions
- Make sure all code is well-commented

Good luck!`,
    classroom: "Web Development 101",
    dueDate: "2026-03-08",
    createdDate: "2026-03-01",
    attachmentUrl: "/files/assignment-brief.pdf",
    totalStudents: 24,
    completedStudents: 18,
  };

  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      completed: true,
      submittedDate: "2026-03-06",
    },
    {
      id: 2,
      name: "Bob Smith",
      completed: true,
      submittedDate: "2026-03-07",
    },
    {
      id: 3,
      name: "Carol Williams",
      completed: true,
      submittedDate: "2026-03-05",
    },
    {
      id: 4,
      name: "David Brown",
      completed: false,
      submittedDate: null,
    },
    {
      id: 5,
      name: "Eve Davis",
      completed: true,
      submittedDate: "2026-03-07",
    },
    {
      id: 6,
      name: "Frank Miller",
      completed: false,
      submittedDate: null,
    },
  ];

  const completionPercentage =
    (assignment.completedStudents / assignment.totalStudents) * 100;

  return (
    <TeacherLayout>
      <div className="p-6 md:p-8 pb-24 md:pb-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                {assignment.title}
              </h1>
              <p className="text-gray-600">{assignment.classroom}</p>
            </div>
            <Button variant="outline">Edit Assignment</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assignment Details */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Assignment Details
              </h2>

              <div className="prose prose-sm max-w-none">
                {assignment.description.split("\n").map((line, idx) => (
                  <p key={idx} className="mb-2 text-gray-700">
                    {line}
                  </p>
                ))}
              </div>

              {assignment.attachmentUrl && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Attachment
                  </Button>
                </div>
              )}
            </Card>

            {/* Student Submissions */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Student Submissions
              </h2>

              <div className="space-y-3">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-indigo-700">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {student.name}
                        </p>
                        {student.completed && student.submittedDate && (
                          <p className="text-xs text-gray-500">
                            Submitted{" "}
                            {new Date(student.submittedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    {student.completed ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Completion Tracker */}
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Completion Tracker
              </h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {assignment.completedStudents}/{assignment.totalStudents}
                </div>
                <p className="text-sm text-gray-600">students completed</p>
              </div>
              <Progress value={completionPercentage} className="h-2 mb-2" />
              <p className="text-xs text-gray-500 text-center">
                {completionPercentage.toFixed(0)}% completion rate
              </p>
            </Card>

            {/* Assignment Info */}
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Assignment Info
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Due Date
                  </div>
                  <p className="text-sm font-medium text-gray-900 ml-6">
                    {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <FileText className="w-4 h-4 mr-2" />
                    Created
                  </div>
                  <p className="text-sm font-medium text-gray-900 ml-6">
                    {new Date(assignment.createdDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
