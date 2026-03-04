import { useState } from "react";
import { TeacherLayout } from "../../components/TeacherLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useNavigate } from "react-router";
import { ArrowLeft, Info } from "lucide-react";
import { toast } from "sonner";

const COLORS = [
  { name: "indigo", class: "bg-indigo-500" },
  { name: "purple", class: "bg-purple-500" },
  { name: "blue", class: "bg-blue-500" },
  { name: "teal", class: "bg-teal-500" },
  { name: "amber", class: "bg-amber-500" },
  { name: "rose", class: "bg-rose-500" },
];

export function TeacherCreateClassroom() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState("indigo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Classroom created successfully!");
    navigate("/teacher/classrooms");
  };

  return (
    <TeacherLayout>
      <div className="p-6 md:p-8 pb-24 md:pb-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/teacher/classrooms")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Classrooms
          </Button>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Create Classroom
          </h1>
          <p className="text-gray-600">
            Set up a new classroom for your students
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card className="p-6 mb-6">
            <div className="space-y-6">
              {/* Classroom Name */}
              <div>
                <Label htmlFor="name">Classroom Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Web Development 101"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>

              {/* Color Selector */}
              <div>
                <Label>Color</Label>
                <div className="flex items-center gap-3 mt-2">
                  {COLORS.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full ${color.class} transition-all ${
                        selectedColor === color.name
                          ? "ring-4 ring-offset-2 ring-gray-400 scale-110"
                          : "hover:scale-105"
                      }`}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Info Note */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900">
                  An 8-character access code will be automatically generated after creation.
                </p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/teacher/classrooms")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Create Classroom
            </Button>
          </div>
        </form>
      </div>
    </TeacherLayout>
  );
}
