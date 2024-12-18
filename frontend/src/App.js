import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseList from './pages/CourseList';
import CourseProgress from './pages/CourseProgress';
import EnrolledCourses from './pages/EnrolledCourses';
import CourseMaterials from './pages/CourseMaterials';
import Quiz from './pages/Quiz';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Routes */}
                    <Route path="/courses" element={<CourseList />} />
                    <Route path="/courses/enrolled" element={<EnrolledCourses />} />
                    <Route path="/courses/:courseId/progress" element={<CourseProgress />} />
                    <Route path="/courses/:courseId/materials" element={<CourseMaterials />} />
                    <Route path="/courses/:courseId/quiz" element={<Quiz />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
