Review the existing UI and make the following additions and corrections. Do not redesign existing pages — only add what is specified.

1. Remove the classroom description
ClassRoom has no description field in the database. Remove the description subtitle text that appears under the classroom name in the Classroom Detail header.

2. Create Classroom page — new page
Add a new page at /teacher/classrooms/create/. It should match the visual style of the Create Assignment page. It contains a single field: classroom name. Below the name input, show a small informational note: "An 8-character access code will be automatically generated after creation." Two action buttons: Cancel (goes back to classroom list) and Create Classroom (primary indigo button). No other fields.

3. Teacher Onboarding page — new page
Add a new page at /teacher/onboarding/. This is shown to a teacher after signup before they can access the dashboard. It should feel like the Join Classroom page for students — centered, clean, minimal. Title: "Complete your profile". Two fields: Subject (text input, e.g. "Mathematics"), and Plan (a card-based selector, not a dropdown — show 2–3 plan cards side by side, each showing the plan name and 3–4 key limits like max classrooms, max students, max storage). A single CTA button: "Get Started". Below the button, a small note: "Not sure which plan to choose? Contact us."

4. Edit Assignment page — new page
Add a new page at /teacher/classrooms/:id/assignments/:id/edit/. It is identical to the Create Assignment page in layout and fields, but pre-filled with existing values. The page title should be "Edit Assignment" instead of "Create Assignment". The back button returns to the Assignment Detail page. The primary button label is "Save Changes". The "Edit Assignment" button that already exists on the Teacher Assignment Detail page should link to this new page.

5. Storage warning states on Create Assignment
On the Create Assignment page, add a warning banner between the file upload zone and the publish toggle. This banner is hidden by default and only shown in two states. State 1 — near limit (storage is above 90% full): show an amber banner with a warning icon, text "You're running low on storage. X MB remaining." State 2 — at limit (storage is 100% full): show a red banner with text "Storage limit reached. Remove attachments from other assignments to upload new files." When at limit, the file upload zone should appear visually disabled (reduced opacity, cursor not allowed, no hover effect).

6. Classroom inactive state
On the Teacher Classroom List page, add a visual treatment for inactive classrooms (where is_active = false). Show a gray "Inactive" badge next to the classroom name. The card should have reduced opacity (about 60%) and no hover shadow effect. On the Teacher Classroom Detail page header, when the classroom is inactive, show the same "Inactive" badge next to the classroom name, and replace the access code card with a muted gray card that says "This classroom is inactive. Students cannot join using the access code."

7. Classroom color selector — on Create Classroom and Classroom Detail
Add a color picker row to the Create Classroom form, below the name input, labeled "Color". Show 6 color swatches as selectable circles: indigo, purple, blue, teal, amber, rose. The first (indigo) is selected by default. On the Teacher Classroom Detail page, show the selected color as the accent bar at the top of the access code card (same bar pattern already used in the Classroom List cards).

8. Enrollment approval error state
On the Enrollment Management table, add an inline error state for a row where approving a student fails because the teacher has reached their plan's student limit. When this happens, the row should not update to "Approved" — instead, show a small red inline alert beneath that row with the text "Student limit reached for your plan. Upgrade to approve more students." The row status badge remains "Pending". All other rows are unaffected.

9. Plan info card on Teacher Dashboard
Add a fourth stat card to the dashboard stats grid (after the three existing cards). Label: "Your Plan". Show the plan name as a large text. Below it, show three small limit stats in a row: "X classrooms", "X students", "X MB storage" — these are the plan's maximum limits, not current usage. Add a small "Upgrade" link in the bottom of the card styled like the "View all classrooms →" links on the other cards.

10. Pending enrollments badge on Teacher Classroom List
On each classroom card in the Classroom List, if that classroom has pending enrollment requests, show a small amber badge in the top-right corner of the card showing the count (e.g. "3 pending"). This is separate from the student count stat at the bottom of the card.

11. Student: Enrollment pending/rejected state
On the Student Classroom List page, add handling for two additional enrollment states that are currently not shown. If a student has a pending enrollment in a classroom (not yet approved), show that classroom in a separate section above the approved classrooms list, titled "Pending Requests". Each pending classroom card shows the classroom name and a blue "Pending Approval" badge, but is not clickable (no link). If a student has a rejected enrollment, show a small dismissible notice below the page header: "Your request to join [Classroom Name] was not approved." with an X to dismiss it.