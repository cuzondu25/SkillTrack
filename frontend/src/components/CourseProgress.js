import React, { useState, useEffect } from 'react';
import { getProgress } from '../api/progress';

const CourseProgress = () => {
    const [progress, setProgress] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProgress = async () => {
            const data = await getProgress(token);
            setProgress(data);
        };
        fetchProgress();
    }, [token]);

    return (
        <div style={{
            position: 'fixed',
            bottom: '3vh',
            right: '2vw',
            padding: '1.2vw',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '5px',
            fontSize: 'clamp(0.4rem, 1vw, 1.2rem)',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
            <p style={{ margin: 0 }}>
                <strong>Progress:</strong> {progress.courses_completed || 0} / {progress.total_courses || 0}
            </p>
            <progress value={progress.progress_percentage || 0} max="100"></progress>
        </div>
    );
};

export default CourseProgress;
