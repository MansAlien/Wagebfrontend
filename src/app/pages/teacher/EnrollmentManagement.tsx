import { useState } from "react";
import { TeacherLayout } from "../../components/TeacherLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Search, Check, X, Ban, UserX } from "lucide-react";
import { toast } from "sonner";

type EnrollmentStatus = "pending" | "approved" | "rejected" | "blocked";

interface Enrollment {
  id: number;
  studentName: string;
  studentEmail: string;
  classroom: string;
  requestDate: string;
  status: EnrollmentStatus;
}

export function TeacherEnrollmentManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<EnrollmentStatus | "all">("all");

  // Mock data
  const [enrollments, setEnrollments] = useState<Enrollment[]>([
    {
      id: 1,
      studentName: "John Doe",
      studentEmail: "john@example.com",
      classroom: "Web Development 101",
      requestDate: "2026-03-03",
      status: "pending",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      studentEmail: "jane@example.com",
      classroom: "CS 202",
      requestDate: "2026-03-03",
      status: "pending",
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      studentEmail: "mike@example.com",
      classroom: "Advanced Algorithms",
      requestDate: "2026-03-04",
      status: "pending",
    },
    {
      id: 4,
      studentName: "Sarah Williams",
      studentEmail: "sarah@example.com",
      classroom: "Web Development 101",
      requestDate: "2026-03-02",
      status: "approved",
    },
    {
      id: 5,
      studentName: "Tom Brown",
      studentEmail: "tom@example.com",
      classroom: "CS 202",
      requestDate: "2026-03-01",
      status: "rejected",
    },
  ]);

  const handleApprove = (id: number) => {
    setEnrollments(
      enrollments.map((e) =>
        e.id === id ? { ...e, status: "approved" as EnrollmentStatus } : e
      )
    );
    toast.success("Enrollment approved");
  };

  const handleReject = (id: number) => {
    setEnrollments(
      enrollments.map((e) =>
        e.id === id ? { ...e, status: "rejected" as EnrollmentStatus } : e
      )
    );
    toast.success("Enrollment rejected");
  };

  const handleBlock = (id: number) => {
    setEnrollments(
      enrollments.map((e) =>
        e.id === id ? { ...e, status: "blocked" as EnrollmentStatus } : e
      )
    );
    toast.success("Student blocked");
  };

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrollment.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrollment.classroom.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || enrollment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingCount = enrollments.filter((e) => e.status === "pending").length;

  const getStatusBadge = (status: EnrollmentStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Rejected
          </Badge>
        );
      case "blocked":
        return (
          <Badge className="bg-gray-700 text-white hover:bg-gray-700">
            Blocked
          </Badge>
        );
    }
  };

  return (
    <TeacherLayout>
      <div className="p-6 md:p-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-semibold text-gray-900">
              Enrollment Management
            </h1>
            {pendingCount > 0 && (
              <Badge className="bg-amber-500 text-white hover:bg-amber-500">
                {pendingCount} pending
              </Badge>
            )}
          </div>
          <p className="text-gray-600">
            Review and manage student enrollment requests
          </p>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Search by student name, email, or classroom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value as EnrollmentStatus | "all")
              }
            >
              <SelectTrigger className="md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Enrollments Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Classroom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEnrollments.map((enrollment) => (
                  <tr
                    key={enrollment.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {enrollment.studentName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {enrollment.studentEmail}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {enrollment.classroom}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(enrollment.requestDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(enrollment.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {enrollment.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApprove(enrollment.id)}
                              className="text-green-700 hover:bg-green-50 hover:text-green-800"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(enrollment.id)}
                              className="text-red-700 hover:bg-red-50 hover:text-red-800"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        {enrollment.status === "approved" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleBlock(enrollment.id)}
                            className="text-gray-700 hover:bg-gray-100"
                          >
                            <Ban className="w-4 h-4 mr-1" />
                            Block
                          </Button>
                        )}
                        {(enrollment.status === "rejected" ||
                          enrollment.status === "blocked") && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApprove(enrollment.id)}
                            className="text-green-700 hover:bg-green-50 hover:text-green-800"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredEnrollments.length === 0 && (
              <div className="text-center py-12">
                <UserX className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No enrollments found</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </TeacherLayout>
  );
}
