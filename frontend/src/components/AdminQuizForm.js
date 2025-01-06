import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { addQuiz } from '../api/adminQuiz';
import Header from './Header';

const AdminQuizForm = () => {
    const { courseId } = useParams(); // Get the course ID from the URL
    const { user } = useAuth(); // Get user from AuthContext
    const [quizData, setQuizData] = useState({
        question: '',
        option_A: '',
        option_B: '',
        option_C: '',
        option_D: '',
        correct_answer: '',
    });

    const handleChange = (e) => {
        setQuizData({
            ...quizData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await addQuiz(quizData, courseId, user.token)
            alert(response.message);
            setQuizData({
                question: '',
                option_A: '',
                option_B: '',
                option_C: '',
                option_D: '',
                correct_answer: '',
            });
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <>
            <Header />
            <Box sx={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
                <Typography variant="h5" gutterBottom>
                    Add Quiz Question
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Question"
                        name="question"
                        size="small"
                        multiline
                        rows={5}
                        fullWidth
                        value={quizData.question}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Option A"
                        name="option_A"
                        size="small"
                        fullWidth
                        value={quizData.option_A}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        label="Option B"
                        name="option_B"
                        size="small"
                        fullWidth
                        value={quizData.option_B}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        label="Option C"
                        name="option_C"
                        size="small"
                        fullWidth
                        value={quizData.option_C}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        label="Option D"
                        name="option_D"
                        size="small"
                        fullWidth
                        value={quizData.option_D}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        label="Correct Answer"
                        name="correct_answer"
                        size="small"
                        fullWidth
                        value={quizData.correct_answer}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            marginTop: '1rem',
                            backgroundColor: '#2575fc',
                            '&:hover': {
                                backgroundColor: '#1a5ccc',
                            },
                        }}
                    >
                        Add Question
                    </Button>
                </form>
            </Box>
        </>
    );
};

export default AdminQuizForm;
