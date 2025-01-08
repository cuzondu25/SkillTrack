import Axios from 'axios';

const API_URL = 'https://cuzondu25.pythonanywhere.com/api/admin';

export const addQuiz = async (quizData, courseId, token) => {
    const response = await Axios.post(`${API_URL}/${courseId}/add`, quizData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
