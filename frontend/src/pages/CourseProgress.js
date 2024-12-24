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
            top: '10px',
            right: '10px',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '5px',
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
