import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { fetchAdminCourses, addCourse, deleteCourses } from '../api/adminCourse'
import { Button, TextField, Card, CardContent, Typography, Grid } from '@mui/material';

const AdminCourseManager = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '' });

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetchAdminCourses(user.token)
                setCourses(response);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [user]);

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await addCourse(formData, user.token)
            setMessage(response.message)
            const res = await fetchAdminCourses(user.token)
            setCourses(res);
            setFormData({ title: '', description: '', instructor: '' });
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            const response = await deleteCourses(user.token, courseId)
            setCourses(courses.filter((course) => course.id !== courseId));
            alert(response.message)
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    return (
        <>
            <Header />
            <Typography variant="h4" align="center" gutterBottom>
                Manage Your Courses
            </Typography>

            {/* List Courses */}
            <Grid container spacing={2}>
                {courses.map((course) => (
                    <Grid item xs={12} md={6} key={course.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{course.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{course.description}</Typography>
                                <Typography variant="body2" sx={{mb: 2, mt: 2}}>Instructor: {course.instructor}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => navigate(`/courses/${course.id}/materials`)}
                                    style={{ marginRight: '10px' }}
                                >
                                    Add Materials
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => navigate(`/admin/courses/${course.id}/add-quiz`)}
                                    style={{ marginRight: '10px' }}
                                >
                                    Add Quiz Questions
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    onClick={() => handleDeleteCourse(course.id)}
                                >
                                    Delete Course
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Add New Course */}
            <form onSubmit={handleAddCourse} style={{ marginTop: '20px' }}>
                <Typography variant="h6">Add New Course</Typography>
                <TextField
                    fullWidth
                    size="small"
                    label="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{ marginBottom: '10px' }}
                />
                <TextField
                    fullWidth
                    size="small"
                    label="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={{ marginBottom: '10px' }}
                />
                <TextField
                    fullWidth
                    size="small"
                    label="Instructor"
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    style={{ marginBottom: '10px' }}
                />
                {message && <Typography color="error" gutterBottom>{message}</Typography>}
                <Button variant="contained" color="primary" size="small" type="submit">
                    Add Course
                </Button>

            </form>
        </>
    );
};

export default AdminCourseManager;
