import React, { useEffect, useState } from 'react';
import { fetchCompletedCourses } from '../api/progress';

const CompletedCourses = () => {
    const [completedCourses, setCompletedCourses] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const loadCompletedCourses = async () => {
            const data = await fetchCompletedCourses(token);
            setCompletedCourses(data);
        };

        loadCompletedCourses();
    }, [token]);

    return (
        <div>
            <h2>Completed Courses</h2>
            {completedCourses.length === 0 ? (
                <p>No courses completed yet.</p>
            ) : (
                <ul>
                    {completedCourses.map((course, index) => (
                        <li key={index}>
                            <strong>{course.course_title}</strong> - Quiz Score: {course.quiz_score}%
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CompletedCourses;
