import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
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
import AdminCourseManager from './components/AdminCourseManager';
import ProtectedRoute from './components/ProtectedRoute';
import AdminQuizForm from './components/AdminQuizForm';
import AdminRoute from './components/AdminRoute';
import ContactUs from './components/ContactUs';
import Layout from './components/Layout';
import About from './components/About';

function App() {
    const { user } = useAuth(); // Get user state from Auth Context

    return (
        <div className='App'>
            <main>
                <Router>
                    <Layout>
                    <div>
                        {/* Only render CourseProgress if the user is logged in */}
                        {user && user.role === 'user' && <CourseProgress />}

                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<ContactUs />} />
                            <Route path="/courses" element={<CourseList />} />

                            {/* Protected User and  admin routes */}
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
                                path="/admin/courses"
                                element={
                                    <AdminRoute>
                                        <AdminCourseManager />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/courses/:courseId/add-quiz"
                                element={
                                    <AdminRoute>
                                        <AdminQuizForm />
                                    </AdminRoute>
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
                    </Layout>
                </Router>
            </main>
        </div>
    );
}

export default App;
