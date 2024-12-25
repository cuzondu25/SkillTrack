import Axios from 'axios';

const API_URL = 'http://localhost:5000/api/quiz';

export const fetchQuiz = async (courseId, token) => {
    const response = await Axios.get(`${API_URL}/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const submitQuiz = async (quizId, courseId, selectedAnswer, token) => {
    const response = await Axios.post(
        `${API_URL}/submit`,
        { quiz_id: quizId, course_id: courseId, selected_answer: selectedAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};
