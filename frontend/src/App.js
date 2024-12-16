import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseList from './pages/CourseList';
import EnrolledCourses from './pages/EnrolledCourses';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/courses" element={<CourseList />} />
                <Route path="/enrolled-courses" element={<EnrolledCourses />} />
            </Routes>
        </Router>
    );
}

export default App;
