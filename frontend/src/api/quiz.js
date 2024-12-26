import Axios from 'axios';

const API_URL = 'http://localhost:5000/api/quiz';

export const fetchQuiz = async (courseId, token) => {
    const response = await Axios.get(`${API_URL}/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const submitQuiz = async (courseId, selectedAnswers, token) => {
    const response = await Axios.post(
        `${API_URL}/submit`,
        { course_id: courseId, selected_answers: selectedAnswers },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};