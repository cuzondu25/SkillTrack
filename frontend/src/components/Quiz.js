import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuiz, submitQuiz } from '../api/quiz';
import { updateProgress } from '../api/progress';
import { Box, Typography, Checkbox, FormControlLabel, Button, Grid, Card, CardContent } from '@mui/material';

const Quiz = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [subErrmsg, setSubErrMsg] = useState('');
    const [message, setMessage] = useState('');
    const [submissionError, setSubmissionError] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchQuizData = async () => {
            const data = await fetchQuiz(courseId, token);
            setQuiz(data);
        };
        fetchQuizData();
    }, [courseId, token]);

    const handleOptionChange = (quizId, optionText) => {
        setSelectedAnswers({ ...selectedAnswers, [quizId]: optionText });
    };

    const validateAnswers = () => quiz.every((q) => selectedAnswers[q.id]);

    const handleSubmit = async () => {
        if (!validateAnswers()) {
            setSubmissionError(true);
            setSubErrMsg('Please select one answer for each question before submitting.');
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
        navigate('/');
    };

    return (
        <Box p={3}>
            <Typography variant="h4">Quiz</Typography>
            <Grid container spacing={2}>
                {quiz.map((q) => (
                    <Grid item xs={12} key={q.id}>
                        <Card>
                            <CardContent>
                                <Typography dangerouslySetInnerHTML={{ __html: q.question }}></Typography>
                                {['A', 'B', 'C', 'D'].map((option) => {
                                    const optionText = q[`option_${option}`];
                                    if (optionText) {
                                        return (
                                            <FormControlLabel
                                                key={option}
                                                control={
                                                    <Checkbox
                                                        checked={selectedAnswers[q.id] === optionText}
                                                        onChange={() => handleOptionChange(q.id, optionText)}
                                                    />
                                                }
                                                label={optionText}
                                            />
                                        );
                                    }
                                    return null;
                                })}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {submissionError && <Typography color="error">{subErrmsg}</Typography>}
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
                Submit Quiz
            </Button>
            {message && <Typography mt={2}>{message}</Typography>}
            {message && (
                <Button variant="contained" color="success" onClick={handleCompleteCourse} sx={{ mt: 2 }}>
                    Mark as Completed
                </Button>
            )}
        </Box>
    );
};

export default Quiz;
