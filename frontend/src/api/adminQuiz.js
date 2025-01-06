import Axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

export const addQuiz = async (quizData, courseId, token) => {
    const response = await Axios.post(`${API_URL}/${courseId}/add`, quizData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
