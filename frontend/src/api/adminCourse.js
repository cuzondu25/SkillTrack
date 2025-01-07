import Axios from 'axios';

const API_URL = 'https://cuzondu25.pythonanywhere.com/api/admin';

export const fetchAdminCourses = async (token) => {
    const response = await Axios.get(`${API_URL}/courses`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const addCourse = async (formData, token) => {
    const response = await Axios.post(`${API_URL}/courses`, formData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const deleteCourses = async (token, courseId) => {
    const response = await Axios.delete(`${API_URL}/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
