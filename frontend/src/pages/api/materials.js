import Axios from 'axios';

const API_URL = 'http://localhost:5000/api/materials';

export const fetchMaterials = async (courseId, token) => {
    const response = await Axios.get(`${API_URL}/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const addMaterial = async (materialData, token) => {
    const response = await Axios.post(`${API_URL}/`, materialData,
        { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
};

export const deleteMaterial = async (materialId, token) => {
    const response = await Axios.delete(`${API_URL}/${materialId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
