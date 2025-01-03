# SkillTrack

SkillTrack is a lightweight learning management platform designed to make online education accessible and intuitive. It provides features for browsing courses, enrolling in them, accessing course materials, taking quizzes and tracking progress all through a responsive and user-friendly interface.

### Deployed Site: [SkillTrack Live](https://s-record-three.vercel.app/)

### Final Project Blog Article: [SkillTrack Project Blog](https://www.linkedin.com/pulse/automating-small-business-sales-tracking-srecord-project-uzondu-ebube-avtcf)

### Authors LinkedIn:
* [Uzondu Chidiebube](https://www.linkedin.com/in/uzondu-ebube-739472108)

## Features

- **Course Browsing**: Explore a variety of courses with detailed descriptions and instructor information.
- **Enrollment**: Seamlessly enroll in courses to gain access to learning materials.
- **Progress Tracking**: Visualize your learning journey with progress bars and completion markers.
- **Quizzes**: Test your knowledge with quizzes linked to each course.
- **Admin Management**: Admins and instructors can add, update, or delete courses and quizzes dynamically.
- **Authentication**: Secure registration and login with JWT-based authentication.

## Technologies Used

### Frontend
- **React**: For building a dynamic and interactive user interface.
- **Material-UI**: For responsive UI components and styling.

### Backend
- **Flask**: A lightweight and scalable Python web framework.
- **Flask-RESTful**: For creating RESTful APIs for frontend-backend communication.

### Database
- **MySQL**: For structured data storage, including user profiles, course details, and progress logs.

### Authentication
- **JWT (JSON Web Tokens)**: For secure session management and user authentication.

## Installation

### Prerequisites
- Node.js
- npm
- Python (3.9 or above)
- MySQL

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/cuzondu25/SkillTrack.git
   cd SkillTrack/backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up the database:
   - Create a MySQL database and tables:
     ```bash
     cat create_tables.sql | mysql -u your_username -p
     ```
   - Update the database connection in `./services/dp.py`.

5. Start the backend server:
   ```bash
   python3 app.py  # flask app
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install @mui/material @emotion/react @emotion/styled
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Register as a new user or log in with your existing account.
   ![skilltrack_3](https://github.com/user-attachments/assets/e7b6570a-8fed-4626-adc5-b3c968728395)

3. Browse the available courses and enroll in the ones you like.
   ![skilltrack_8](https://github.com/user-attachments/assets/c23dd6d3-f03f-4ffa-81f3-6e9fec920141)

5. Access course materials and track your learning progress.
   ![skilltrack_6](https://github.com/user-attachments/assets/e9a53f4d-734b-4075-bfb6-c13a3f299228)

7. Take quizzes to reinforce your knowledge.
   ![skilltrack_4](https://github.com/user-attachments/assets/eccc584d-c077-4446-92ca-2346479dbb60)

9. Admin users can manage courses and quizzes via the admin interface.

## Project Structure

### Frontend
- **/components**: Contains reusable React components (e.g., Login, Register, CourseList).
- **/api**: Functions for making API calls to the backend.
- **/context**: Context API for managing global application state.

### Backend
- **/routes**: API routes for authentication, courses, and quizzes.
- **/services**: Business logic for handling user requests.

## Contact

- **Email**: [cuzondu25@gmail.com](mailto:cuzondu25@gmail.com)
- **WhatsApp**: [+2348104317890](https://wa.me/2348104317890)

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

