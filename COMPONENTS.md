# Wageb UI Components

This document showcases all the reusable components used throughout the Wageb application.

## Design System

### Colors
- **Primary Accent**: Indigo (`indigo-600`, `indigo-700`)
- **Secondary Accent**: Teal (used for student badge)
- **Neutral Grays**: 
  - Background: `gray-50`
  - Cards: `white`
  - Borders: `gray-200`
  - Text: `gray-900`, `gray-600`, `gray-500`

### Status Colors
- **Pending/Active**: Blue (`blue-100`, `blue-700`)
- **Completed/Approved**: Green (`green-100`, `green-700`)
- **Warning/Due Soon**: Amber (`amber-100`, `amber-700`)
- **Error/Overdue/Rejected**: Red (`red-100`, `red-700`)
- **Draft**: Gray (`secondary` variant)

## Core Components

### Layouts
1. **TeacherLayout** (`/src/app/components/TeacherLayout.tsx`)
   - Left sidebar navigation (desktop)
   - Bottom tab navigation (mobile)
   - Routes: Dashboard, Classrooms, Enrollments

2. **StudentLayout** (`/src/app/components/StudentLayout.tsx`)
   - Top navbar navigation
   - Routes: My Classrooms, Join

### UI Components
All UI components are located in `/src/app/components/ui/` and include:
- Badge
- Button
- Card
- Input
- Label
- Textarea
- Select
- Switch
- Tabs
- Progress
- Table

### Custom Components
- **EmptyState** (`/src/app/components/EmptyState.tsx`)
  - Used for empty lists
  - Accepts icon, title, description, and action

## Teacher Screens

### 1. Dashboard (`/teacher`)
- Classroom count card
- Storage usage with progress bar
- Pending enrollments with badge
- Recent assignments list

### 2. Classroom List (`/teacher/classrooms`)
- Grid of classroom cards
- Each card shows:
  - Color indicator bar
  - Classroom name
  - Access code chip (badge)
  - Student count
  - Assignment count

### 3. Classroom Detail (`/teacher/classroom/:id`)
- Header with access code (copyable)
- Tabbed sections (Assignments, Students)
- "Create Assignment" CTA button
- Assignment list with status badges
- Student table

### 4. Create Assignment (`/teacher/classroom/:id/create-assignment`)
- Title input
- Description textarea (with markdown hint)
- Due date picker
- File upload with drag-and-drop zone
- Publish toggle switch

### 5. Assignment Detail (`/teacher/assignment/:id`)
- Assignment description
- Completion tracker (X/Y students done)
- Progress bar
- Student submission list with status badges

### 6. Enrollment Management (`/teacher/enrollments`)
- Search bar
- Status filter dropdown
- Table with pending/approved/rejected/blocked states
- Action buttons (Approve, Reject, Block) per row

## Student Screens

### 7. My Classrooms (`/student`)
- Card list of enrolled classrooms
- Each card shows:
  - Color indicator bar
  - Classroom name
  - Teacher name
  - "X assignments remaining" badge

### 8. Join Classroom (`/student/join`)
- Centered minimal form
- Large access code input (uppercase, monospaced)
- Single CTA button

### 9. Classroom Feed (`/student/classroom/:id`)
- Pending assignments section (prominent)
- Completed assignments section (muted)
- Status pills (Completed, Pending, Due Soon, Overdue)
- Due date display with days remaining

### 10. Assignment Detail (`/student/assignment/:id`)
- Full assignment view
- Due date card with countdown
- Assignment description with formatted text
- Sticky "Mark as Complete" button at bottom

## Bonus: Role Selector (`/`)
- Post-login redirect screen
- Two large role cards (Teacher, Student)
- Gradient background
- Hover effects
