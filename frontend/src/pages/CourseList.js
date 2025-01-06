import React, { useEffect, useState } from 'react';
import { fetchCourses, enrollInCourse } from '../api/course';
import { Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';
import Header from './Header';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCourses();
            setCourses(data);
        };
        fetchData();
    }, []);

    const handleEnroll = async (courseId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('Please log in to enroll.');
            return;
        }
        try {
            const response = await enrollInCourse(courseId, token);
            setMessage(response.message);
        } catch (err) {
            setMessage('Enrollment failed.');
        }
    };

    return (
        <>
            <Header />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Available Courses</Typography>
                {message && <Typography color="error" gutterBottom>{message}</Typography>}
                <Grid container spacing={3}>
                    {courses.map((course) => (
                        <Grid item xs={12} sm={6} md={4} key={course.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{course.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">{course.description}</Typography>
                                    <Typography variant="body2">Instructor: {course.instructor}</Typography>
                                    <Button 
                                        variant="contained"
                                        size="medium"
                                        color="primary" onClick={() => handleEnroll(course.id)}
                                        sx={{ mt: 2 }}
                                    >
                                        Enroll
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default CourseList;
