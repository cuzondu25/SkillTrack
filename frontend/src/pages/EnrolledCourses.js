import Header from './Header';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchEnrolledCourses } from '../api/course';
import { Box, Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';

const EnrolledCourses = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            const data = await fetchEnrolledCourses(token);
            setEnrolledCourses(data);
        };
        fetchData();
    }, []);

    return (
        <>
            <Header />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>My Enrolled Courses</Typography>
                <Grid container spacing={3}>
                    {enrolledCourses.map((course) => (
                        <Grid item xs={12} sm={6} md={4} key={course.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{course.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">{course.description}</Typography>
                                    <Typography variant="body2" sx={{ mt: 2 }}>Instructor: {course.instructor}</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            sx={{ mr: 1, mt: 2 }}
                                            onClick={() => navigate(`/courses/${course.id}/materials`)}
                                        >
                                            View Materials
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={() => navigate(`/courses/${course.id}/quiz`)}
                                            sx={{ mt: 2 }}
                                        >
                                            Take Quiz
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default EnrolledCourses;
