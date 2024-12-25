import React, { useEffect, useState } from 'react';
import { fetchCourses, enrollInCourse } from '../api/course';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCourses();
            setCourses(data);
        };
        fetchData();
    }, []);

    const handleEnroll = async (courseId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('Please log in to enroll.');
            return;
        }
        try {
            const response = await enrollInCourse(courseId, token);
            setMessage(response.message);
        } catch (err) {
            setMessage('Enrollment failed.');
        }
    };

    return (
        <div>
            <h2>Available Courses</h2>
            {message && <p>{message}</p>}
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <p>Instructor: {course.instructor}</p>
                        <button onClick={() => handleEnroll(course.id)}>Enroll</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;
