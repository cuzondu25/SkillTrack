import Axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const register = async (username, password) => {
    const response = await Axios.post(`${API_URL}/register`, { username, password });
    return response.data;
};

export const login = async (username, password) => {
    const response = await Axios.post(`${API_URL}/login`, { username, password });
    return response.data;
};
