import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProgress, updateProgress } from '../api/progress';

const CourseProgress = () => {
    const { courseId } = useParams();
    const [progress, setProgress] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProgress = async () => {
            const data = await getProgress(token);
            setProgress(data);
        };
        fetchProgress();
    }, [courseId, token]);

    const handleProgressUpdate = async (completed) => {
        await updateProgress(courseId, completed, token);
        setProgress({ ...progress, courses_completed: completed });
    };

    return (
        <div>
            <h2>Course Progress</h2>
            <p>Lessons Completed: {progress.courses_completed || 0} / {progress.total_courses || 0}</p>
            <progress value={progress.progress_percentage || 0} max="100"></progress>
            <button onClick={() => handleProgressUpdate(progress.courses_completed + 1)}>
                Course Completed!!!
            </button>
        </div>
    );
};

export default CourseProgress;
