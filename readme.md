## Description

Create courses with rich details, including:
Images
Descriptions
Levels (indicating difficulty or prerequisites)
Names
Individual lectures

Efficiently assign lectures within courses to available instructors.
Instructors can:

View their upcoming lecture schedule, ensuring timely preparation and delivery.
Key CRUD operations supported:

Creating courses and lectures
Reading course and lecture information
Updating course and lecture details
Assigning instructors to lectures

Route HTTP Method Description

Here's the revised API request list with improvements:

USERS

/api/user/login (POST): Logs in a user.
/api/users (GET): Retrieves a list of all users (if authorized).
COURSES

/api/courses (POST): Creates a new course.
/api/courses/:id (PUT): Updates a specific course, including lecture details.
/api/courses/:id (GET): Retrieves a specific course's details, including lectures.
/api/courses/lectures/:id (GET): Retrieves lecture information for a given course, including instructors.
/api/courses (GET): Retrieves a list of all courses.

INSTRUCTORS

/api/instructors/:id/lectures (GET): Retrieves a list of lectures assigned to a specific instructor.
