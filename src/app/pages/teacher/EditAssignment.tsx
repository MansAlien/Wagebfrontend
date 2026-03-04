import { useState } from "react";
import { TeacherLayout } from "../../components/TeacherLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Upload, Calendar, FileText } from "lucide-react";
import { toast } from "sonner";

export function TeacherEditAssignment() {
  const { id: classroomId, assignmentId } = useParams();
  const navigate = useNavigate();
  
  // Mock existing assignment data
  const [isPublished, setIsPublished] = useState(true);
  const [title, setTitle] = useState("Introduction to React Hooks");
  const [description, setDescription] = useState(
    "In this assignment, you will learn about React Hooks and how they can be used to manage state and side effects in functional components.\n\nRequirements:\n1. Create a simple counter app using useState\n2. Implement a data fetching component using useEffect\n3. Create a custom hook for form handling"
  );
  const [dueDate, setDueDate] = useState("2026-03-08");
  const [file, setFile] = useState<File | null>(null);
  const [existingFileName] = useState("assignment-brief.pdf");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Assignment updated successfully!");
    navigate(`/teacher/assignment/${assignmentId}`);
  };

  return (
    <TeacherLayout>
      <div className="p-6 md:p-8 pb-24 md:pb-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/teacher/assignment/${assignmentId}`)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Assignment
          </Button>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Edit Assignment
          </h1>
          <p className="text-gray-600">
            Update assignment details and settings
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card className="p-6 mb-6">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title">Assignment Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Introduction to React Hooks"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed instructions for your students..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-2">
                  You can use markdown formatting
                </p>
              </div>

              {/* Due Date */}
              <div>
                <Label htmlFor="dueDate">Due Date *</Label>
                <div className="relative mt-2">
                  <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                    className="pl-10"
                  />
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* File Upload */}
              <div>
                <Label htmlFor="file">Attachment (Optional)</Label>
                
                {/* Show existing file */}
                {existingFileName && !file && (
                  <div className="mt-2 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-indigo-600 mr-2" />
                        <span className="text-sm text-gray-900">
                          {existingFileName}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="text-sm text-red-600 hover:text-red-700"
                        onClick={() => {/* Would remove file */}}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-2">
                  <label
                    htmlFor="file"
                    className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors"
                  >
                    <div className="text-center">
                      {file ? (
                        <>
                          <FileText className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                          <p className="text-sm font-medium text-gray-900">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Click to change file
                          </p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            Click to upload {existingFileName ? "a new file" : "or drag and drop"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PDF, DOC, or ZIP up to 10MB
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    accept=".pdf,.doc,.docx,.zip"
                  />
                </div>
              </div>

              {/* Publish Toggle */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="publish" className="text-base">
                      Publish Assignment
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Make this assignment visible to students immediately
                    </p>
                  </div>
                  <Switch
                    id="publish"
                    checked={isPublished}
                    onCheckedChange={setIsPublished}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/teacher/assignment/${assignmentId}`)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </TeacherLayout>
  );
}
