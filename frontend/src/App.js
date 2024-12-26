// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Auth context
import Quiz from './components/Quiz';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import CourseList from './components/CourseList';
import LandingPage from './components/LandingPage';
import CourseProgress from './components/CourseProgress';
import EnrolledCourses from './components/EnrolledCourses';
import CourseMaterials from './components/CourseMaterials';
import CompletedCourses from './components/CompletedCourses';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
    const { user } = useAuth(); // Get user state from Auth Context

    return (
        <div className='App'>
            <header>
                <h1>SkillTrack</h1>
            </header>
            <main>
                <Router>
                    <div>
                        {/* Only render CourseProgress if the user is logged in */}
                        {user && <CourseProgress />}

                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            {/* Protected Routes */}
                            <Route
                                path="/courses"
                                element={
                                    <ProtectedRoute>
                                        <CourseList />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/courses/enrolled"
                                element={
                                    <ProtectedRoute>
                                        <EnrolledCourses />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/courses/:courseId/materials"
                                element={
                                    <ProtectedRoute>
                                        <CourseMaterials />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/courses/:courseId/quiz"
                                element={
                                    <ProtectedRoute>
                                        <Quiz />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/courses/completed"
                                element={
                                    <ProtectedRoute>
                                        <CompletedCourses />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/logout"
                                element={
                                    <ProtectedRoute>
                                        <Logout />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </div>
                </Router>
            </main>
        </div>
    );
}

export default App;
