import { createBrowserRouter } from "react-router";
import { RoleSelector } from "./pages/RoleSelector";
import { TeacherDashboard } from "./pages/teacher/Dashboard";
import { TeacherClassroomList } from "./pages/teacher/ClassroomList";
import { TeacherClassroomDetail } from "./pages/teacher/ClassroomDetail";
import { TeacherCreateClassroom } from "./pages/teacher/CreateClassroom";
import { TeacherCreateAssignment } from "./pages/teacher/CreateAssignment";
import { TeacherEditAssignment } from "./pages/teacher/EditAssignment";
import { TeacherAssignmentDetail } from "./pages/teacher/AssignmentDetail";
import { TeacherEnrollmentManagement } from "./pages/teacher/EnrollmentManagement";
import { TeacherOnboarding } from "./pages/teacher/Onboarding";
import { TeacherSettings } from "./pages/teacher/Settings";
import { StudentClassroomList } from "./pages/student/ClassroomList";
import { StudentJoinClassroom } from "./pages/student/JoinClassroom";
import { StudentClassroomFeed } from "./pages/student/ClassroomFeed";
import { StudentAssignmentDetail } from "./pages/student/AssignmentDetail";
import { StudentSettings } from "./pages/student/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RoleSelector,
  },
  // Teacher routes
  {
    path: "/teacher",
    Component: TeacherDashboard,
  },
  {
    path: "/teacher/onboarding",
    Component: TeacherOnboarding,
  },
  {
    path: "/teacher/classrooms",
    Component: TeacherClassroomList,
  },
  {
    path: "/teacher/classrooms/create",
    Component: TeacherCreateClassroom,
  },
  {
    path: "/teacher/classroom/:id",
    Component: TeacherClassroomDetail,
  },
  {
    path: "/teacher/classroom/:id/create-assignment",
    Component: TeacherCreateAssignment,
  },
  {
    path: "/teacher/classroom/:classroomId/assignments/:assignmentId/edit",
    Component: TeacherEditAssignment,
  },
  {
    path: "/teacher/assignment/:id",
    Component: TeacherAssignmentDetail,
  },
  {
    path: "/teacher/enrollments",
    Component: TeacherEnrollmentManagement,
  },
  {
    path: "/teacher/settings",
    Component: TeacherSettings,
  },
  // Student routes
  {
    path: "/student",
    Component: StudentClassroomList,
  },
  {
    path: "/student/join",
    Component: StudentJoinClassroom,
  },
  {
    path: "/student/classroom/:id",
    Component: StudentClassroomFeed,
  },
  {
    path: "/student/assignment/:id",
    Component: StudentAssignmentDetail,
  },
  {
    path: "/student/settings",
    Component: StudentSettings,
  },
]);