# SkillTrack

SkillTrack is a lightweight learning management platform designed to make online education accessible and intuitive. It provides features for browsing courses, enrolling in them, tracking progress, and taking quizzes, all through a responsive and user-friendly interface.

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
- Python (3.9 or above)
- MySQL

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/SkillTrack.git
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
   - Create a MySQL database named `skilltrack`.
   - Update the database connection in `config.py`.
   - Run migrations:
     ```bash
     flask db upgrade
     ```

5. Start the server:
   ```bash
   flask run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Register as a new user or log in with your existing account.
2. Browse the available courses and enroll in the ones you like.
3. Access course materials and track your learning progress.
4. Take quizzes to reinforce your knowledge.
5. Admin users can manage courses and quizzes via the admin interface.

## Project Structure

### Frontend
- **/components**: Contains reusable React components (e.g., Login, Register, CourseList).
- **/api**: Functions for making API calls to the backend.
- **/context**: Context API for managing global application state.

### Backend
- **/models**: Database models for users, courses, and progress.
- **/routes**: API routes for authentication, courses, and quizzes.
- **/services**: Business logic for handling user requests.

## Contact

- **Email**: [cuzondu25@gmail.com](mailto:cuzondu25@gmail.com)
- **WhatsApp**: [+2348104317890](https://wa.me/2348104317890)

## License

This project is licensed under the MIT License. See the LICENSE file for details.

