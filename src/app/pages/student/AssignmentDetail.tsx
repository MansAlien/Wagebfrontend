import { useState } from "react";
import { StudentLayout } from "../../components/StudentLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Download,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

export function StudentAssignmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);

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
    teacher: "Prof. Sarah Johnson",
    dueDate: "2026-03-08",
    postedDate: "2026-03-01",
    attachmentUrl: "/files/assignment-brief.pdf",
    status: isCompleted ? "completed" : "pending",
  };

  const handleMarkComplete = () => {
    setIsCompleted(true);
    toast.success("Assignment marked as complete!");
  };

  const getDaysUntilDue = () => {
    const today = new Date("2026-03-04");
    const due = new Date(assignment.dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDue = getDaysUntilDue();

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
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

          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                {assignment.title}
              </h1>
              <p className="text-gray-600">
                {assignment.classroom} • {assignment.teacher}
              </p>
            </div>

            {isCompleted ? (
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Completed
              </Badge>
            ) : daysUntilDue < 0 ? (
              <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                Overdue
              </Badge>
            ) : daysUntilDue <= 2 ? (
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                Due Soon
              </Badge>
            ) : (
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                Pending
              </Badge>
            )}
          </div>

          {/* Due date card */}
          {!isCompleted && (
            <Card
              className={`p-4 ${
                daysUntilDue <= 2
                  ? "bg-amber-50 border-amber-200"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Due Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {daysUntilDue}
                  </p>
                  <p className="text-sm text-gray-600">days left</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Assignment Content */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Assignment Details
          </h2>

          <div className="prose prose-sm max-w-none mb-6">
            {assignment.description.split("\n").map((line, idx) => {
              if (line.startsWith("## ")) {
                return (
                  <h3 key={idx} className="text-base font-semibold text-gray-900 mt-4 mb-2">
                    {line.replace("## ", "")}
                  </h3>
                );
              }
              if (line.match(/^\d+\./)) {
                return (
                  <li key={idx} className="text-gray-700 ml-4">
                    {line.replace(/^\d+\.\s/, "")}
                  </li>
                );
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={idx} className="text-gray-700 ml-4">
                    {line.replace("- ", "")}
                  </li>
                );
              }
              if (line.trim()) {
                return (
                  <p key={idx} className="text-gray-700 mb-2">
                    {line}
                  </p>
                );
              }
              return null;
            })}
          </div>

          {assignment.attachmentUrl && (
            <div className="pt-4 border-t border-gray-200">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download Attachment
              </Button>
            </div>
          )}
        </Card>

        {/* Additional Info */}
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Assignment Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <Calendar className="w-4 h-4 text-gray-400 mt-0.5 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Posted on</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(assignment.postedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FileText className="w-4 h-4 text-gray-400 mt-0.5 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Classroom</p>
                <p className="text-sm font-medium text-gray-900">
                  {assignment.classroom}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Sticky Bottom Button */}
      {!isCompleted && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={handleMarkComplete}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              size="lg"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Mark as Complete
            </Button>
          </div>
        </div>
      )}
    </StudentLayout>
  );
}
