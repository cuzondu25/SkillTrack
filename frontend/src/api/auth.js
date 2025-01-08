import Axios from 'axios';

const API_URL = 'https://cuzondu25.pythonanywhere.com/api/auth';

export const register = async (username, password, role) => {
    const response = await Axios.post(`${API_URL}/register`, { username, password, role });
    return response.data;
};

export const login = async (username, password) => {
    const response = await Axios.post(`${API_URL}/login`, { username, password });
    return response.data;
};
