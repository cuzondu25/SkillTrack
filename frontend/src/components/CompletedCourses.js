import React, { useEffect, useState } from 'react';
import Header from './Header';
import { fetchCompletedCourses } from '../api/progress';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const CompletedCourses = () => {
    const [completedCourses, setCompletedCourses] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const loadCompletedCourses = async () => {
            const data = await fetchCompletedCourses(token);
            setCompletedCourses(data);
        };
        loadCompletedCourses();
    }, [token]);

    return (
        <>
            <Header />
            <Box p={3}>
                <Typography variant="h4" gutterBottom>Completed Courses</Typography>
                {completedCourses.length === 0 ? (
                    <Typography>No courses completed yet.</Typography>
                ) : (
                    <Grid container spacing={2}>
                        {completedCourses.map((course, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{course.course_title}</Typography>
                                        <Typography>Quiz Score: {course.quiz_score}%</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </>
    );
};

export default CompletedCourses;
