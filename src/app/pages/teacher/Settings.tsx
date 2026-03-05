import { useState, useRef } from "react";
import { TeacherLayout } from "../../components/TeacherLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Camera, Mail, Save } from "lucide-react";
import { toast } from "sonner";

export function TeacherSettings() {
  // Mock user data - replace with actual user data from your auth system
  const [userData, setUserData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@example.com",
    avatarUrl: "",
  });

  const [previewUrl, setPreviewUrl] = useState(userData.avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials = `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      toast.success("Profile picture updated");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your save logic here
    console.log("Saving user data:", userData);
    toast.success("Settings saved successfully");
  };

  const handleEmailManagement = () => {
    // This would redirect to your allauth email management page
    // Replace with your actual allauth URL
    window.location.href = "/accounts/email/";
  };

  return (
    <TeacherLayout>
      <div className="max-w-4xl mx-auto p-6 sm:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSave} className="space-y-8">
          {/* Profile Picture Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Profile Picture
            </h2>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={previewUrl} alt={`${userData.firstName} ${userData.lastName}`} />
                  <AvatarFallback className="bg-indigo-100 text-indigo-700 text-2xl font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2 shadow-lg transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 font-medium mb-1">
                  Upload a new profile picture
                </p>
                <p className="text-sm text-gray-500">
                  JPG, PNG or GIF. Max size 5MB.
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Personal Information
            </h2>
            <div className="space-y-4">
              {/* First Name */}
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={userData.firstName}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                  className="mt-1"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                  className="mt-1"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="mt-1 flex space-x-2">
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    disabled
                    className="flex-1 bg-gray-50"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleEmailManagement}
                    className="flex items-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Manage Email</span>
                  </Button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  To change your email address, use the email management page
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button type="submit" className="flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </Button>
          </div>
        </form>
      </div>
    </TeacherLayout>
  );
}
