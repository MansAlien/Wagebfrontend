import { createBrowserRouter } from "react-router";
import { RoleSelector } from "./pages/RoleSelector";
import { TeacherDashboard } from "./pages/teacher/Dashboard";
import { TeacherClassroomList } from "./pages/teacher/ClassroomList";
import { TeacherClassroomDetail } from "./pages/teacher/ClassroomDetail";
import { TeacherCreateAssignment } from "./pages/teacher/CreateAssignment";
import { TeacherAssignmentDetail } from "./pages/teacher/AssignmentDetail";
import { TeacherEnrollmentManagement } from "./pages/teacher/EnrollmentManagement";
import { StudentClassroomList } from "./pages/student/ClassroomList";
import { StudentJoinClassroom } from "./pages/student/JoinClassroom";
import { StudentClassroomFeed } from "./pages/student/ClassroomFeed";
import { StudentAssignmentDetail } from "./pages/student/AssignmentDetail";

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
    path: "/teacher/classrooms",
    Component: TeacherClassroomList,
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
    path: "/teacher/assignment/:id",
    Component: TeacherAssignmentDetail,
  },
  {
    path: "/teacher/enrollments",
    Component: TeacherEnrollmentManagement,
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
]);
