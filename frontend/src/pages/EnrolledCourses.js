import React, { useEffect, useState } from 'react';
import { fetchEnrolledCourses } from '../api/course';

const EnrolledCourses = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            const data = await fetchEnrolledCourses(token);
            setEnrolledCourses(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>My Enrolled Courses</h2>
            <ul>
                {enrolledCourses.map((course) => (
                    <li key={course.id}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <p>Instructor: {course.instructor}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EnrolledCourses;
