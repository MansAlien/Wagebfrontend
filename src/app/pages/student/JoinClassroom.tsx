import { useState } from "react";
import { StudentLayout } from "../../components/StudentLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useNavigate } from "react-router";
import { Key, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function StudentJoinClassroom() {
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accessCode || accessCode.length < 6) {
      toast.error("Please enter a valid access code");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Successfully joined classroom!");
      navigate("/student");
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert to uppercase and remove spaces
    const value = e.target.value.toUpperCase().replace(/\s/g, "");
    setAccessCode(value);
  };

  return (
    <StudentLayout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
              <Key className="w-8 h-8 text-indigo-600" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Join a Classroom
            </h1>
            <p className="text-gray-600">
              Enter the access code provided by your teacher
            </p>
          </div>

          {/* Form */}
          <Card className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="accessCode" className="text-base">
                    Access Code
                  </Label>
                  <Input
                    id="accessCode"
                    type="text"
                    placeholder="e.g., WEB101X"
                    value={accessCode}
                    onChange={handleInputChange}
                    className="mt-2 text-2xl font-mono tracking-wider text-center uppercase"
                    maxLength={10}
                    required
                  />
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Usually 6-8 characters
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  size="lg"
                  disabled={isLoading || accessCode.length < 6}
                >
                  {isLoading ? (
                    "Joining..."
                  ) : (
                    <>
                      Join Classroom
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>

          {/* Help text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an access code?{" "}
              <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                Contact your teacher
              </button>
            </p>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
