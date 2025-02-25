import Axios from 'axios';

const API_URL = 'https://cuzondu25.pythonanywhere.com/api/progress';

export const getProgress = async (token) => {
    const response = await Axios.get(`${API_URL}/`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const updateProgress = async (data, token) => {
    const response = await Axios.post(`${API_URL}/update`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const fetchCompletedCourses = async (token) => {
    const response = await Axios.get(`${API_URL}/completed`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
