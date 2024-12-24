import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuiz, submitQuiz } from '../api/quiz';
import { updateProgress } from '../api/progress';

const Quiz = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchQuizData = async () => {
            const data = await fetchQuiz(courseId, token);
            setQuiz(data);
        };
        fetchQuizData();
    }, [courseId, token]);

    const handleSubmit = async (quizId) => {
        const response = await submitQuiz(quizId, selectedAnswer, token);
        setMessage(response.is_correct ? 'Correct!' : 'Incorrect.');
    };

    const handleCompleteCourse = async () => {
        await updateProgress({ course_id: courseId, is_completed: true }, token);
        alert('Course marked as completed!');
        navigate('/courses');
    };

    return (
        <div>
            <h2>Quiz</h2>
            {quiz.map((q) => (
                <div key={q.id}>
                    <p>{q.question}</p>
                    <input
                        type="text"
                        placeholder="Your Answer"
                        value={selectedAnswer}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                    />
                    <button onClick={() => handleSubmit(q.id)}>Submit Answer</button>
                </div>
            ))}
            {message && <p>{message}</p>}

            {/* Course Completed Button */}
            <button
                style={{ marginTop: '20px', backgroundColor: '#28a745', color: 'white' }}
                onClick={handleCompleteCourse}
            >
                Course Completed!
            </button>
        </div>
    );
};

export default Quiz;
