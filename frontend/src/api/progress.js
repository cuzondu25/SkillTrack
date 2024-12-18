import Axios from 'axios';

const API_URL = 'http://localhost:5000/api/progress';

export const getProgress = async (courseId, token) => {
    const response = await Axios.get(`${API_URL}/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateProgress = async (courseId, lessonsCompleted, token) => {
    const response = await Axios.post(
        `${API_URL}/update`,
        { course_id: courseId, lessons_completed: lessonsCompleted },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};
