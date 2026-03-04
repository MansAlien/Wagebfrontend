import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useNavigate } from "react-router";
import { GraduationCap, Check } from "lucide-react";
import { toast } from "sonner";

const PLANS = [
  {
    name: "Free",
    limits: [
      "Up to 2 classrooms",
      "Up to 50 students",
      "100 MB storage",
      "Basic support",
    ],
  },
  {
    name: "Pro",
    limits: [
      "Up to 10 classrooms",
      "Up to 250 students",
      "5 GB storage",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    limits: [
      "Unlimited classrooms",
      "Unlimited students",
      "50 GB storage",
      "Dedicated support",
    ],
  },
];

export function TeacherOnboarding() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("Pro");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile completed successfully!");
    navigate("/teacher");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Complete your profile
          </h1>
          <p className="text-gray-600">
            Just a few details to get you started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card className="p-8 mb-6">
            <div className="space-y-8">
              {/* Subject */}
              <div>
                <Label htmlFor="subject" className="text-base">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  placeholder="e.g., Mathematics"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>

              {/* Plan Selector */}
              <div>
                <Label className="text-base mb-4 block">Choose a Plan *</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {PLANS.map((plan) => (
                    <button
                      key={plan.name}
                      type="button"
                      onClick={() => setSelectedPlan(plan.name)}
                      className={`relative p-6 rounded-lg border-2 transition-all text-left ${
                        selectedPlan === plan.name
                          ? "border-indigo-600 bg-indigo-50"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                            Popular
                          </span>
                        </div>
                      )}

                      {selectedPlan === plan.name && (
                        <div className="absolute top-4 right-4">
                          <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {plan.name}
                      </h3>

                      <ul className="space-y-3">
                        {plan.limits.map((limit, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-sm text-gray-600"
                          >
                            <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{limit}</span>
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 px-12"
            >
              Get Started
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Not sure which plan to choose?{" "}
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Contact us
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
