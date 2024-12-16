import React, { useState, useEffect } from 'react';
import { getProgress, updateProgress } from '../api/progress';

const CourseProgress = ({ courseId }) => {
    const [progress, setProgress] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProgress = async () => {
            const data = await getProgress(courseId, token);
            setProgress(data);
        };
        fetchProgress();
    }, [courseId, token]);

    const handleProgressUpdate = async (completed) => {
        await updateProgress(courseId, completed, token);
        setProgress({ ...progress, lesson_completed: completed });
    };

    return (
        <div>
            <h2>Course Progress</h2>
            <p>Lessons Completed: {progress.lesson_completed || 0} / {progress.total_lessons || 0}</p>
            <progress value={progress.progress_percentage || 0} max="100"></progress>
            <button onClick={() => handleProgressUpdate(progress.lesson_completed + 1)}>
                Mark Next Lesson Complete
            </button>
        </div>
    );
};

export default CourseProgress;
