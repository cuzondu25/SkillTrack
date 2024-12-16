import Axios from 'axios';

const API_URL = 'http://localhost:5000/api/quiz';

export const fetchQuiz = async (courseId, token) => {
    const response = await Axios.get(`${API_URL}/quiz/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const submitQuiz = async (quizId, selectedAnswer, token) => {
    const response = await Axios.post(
        `${API_URL}/quiz/submit`,
        { quiz_id: quizId, selected_answer: selectedAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};
