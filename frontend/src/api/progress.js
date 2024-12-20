import Axios from 'axios';

const API_URL = 'http://localhost:5000/api/progress';

export const getProgress = async (token) => {
    const response = await Axios.get(`${API_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateProgress = async (courseId, coursesCompleted, token) => {
    const response = await Axios.post(
        `${API_URL}/update`,
        { course_id: courseId, courses_completed: coursesCompleted },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const fetchCompletedCourses = async (token) => {
    const response = await axios.get(`${API_URL}/completed`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
