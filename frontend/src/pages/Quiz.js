import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuiz, submitQuiz } from '../api/quiz';
import { updateProgress } from '../api/progress';

const Quiz = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [message, setMessage] = useState('');
    const [submissionError, setSubmissionError] = useState(false);
    const token = localStorage.getItem('token');

    // Fetch quiz data
    useEffect(() => {
        const fetchQuizData = async () => {
            const data = await fetchQuiz(courseId, token);
            setQuiz(data);
        };
        fetchQuizData();
    }, [courseId, token]);

    // Handle checkbox selection for each option
    const handleOptionChange = (quizId, optionText) => {
        setSelectedAnswers({ ...selectedAnswers, [quizId]: optionText });
    };

    // Validate that only one option is selected for each question
    const validateAnswers = () => {
        return quiz.every((q) => selectedAnswers[q.id]);
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!validateAnswers()) {
            setSubmissionError(true);
            setMessage('Please select one answer for each question before submitting.');
            return;
        }

        try {
            const response = await submitQuiz(courseId, selectedAnswers, token);
            setMessage(response.message);

        } catch (error) {
            setMessage('Error submitting the quiz. Please try again.');
        }
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
                    <p dangerouslySetInnerHTML={{ __html: q.question }}></p>
                    {['A', 'B', 'C', 'D'].map((option) => {
                        const optionText = q[`option_${option}`];
                        if (optionText) {
                            return (
                                <div key={option}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name={`question-${q.id}`}
                                            checked={selectedAnswers[q.id] === optionText}
                                            onChange={() => handleOptionChange(q.id, optionText)}
                                        />
                                        {optionText}
                                    </label>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            ))}
            {submissionError && <p style={{ color: 'red' }}>{message}</p>}
            <button onClick={handleSubmit}>Submit Quiz</button>
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