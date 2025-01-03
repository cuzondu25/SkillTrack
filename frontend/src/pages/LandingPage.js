import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, Button, Typography, Grid, Card, CardContent } from '@mui/material';

const LandingPage = () => {
    const { user } = useAuth(); // Get user state from Auth Context

    return (
        <Box sx={{ fontFamily: 'Arial, sans-serif', padding: 2 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    textAlign: 'center',
                    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                    color: 'white',
                    padding: 5,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h2" gutterBottom>
                    Welcome to SkillTrack
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 3 }}>
                    Your lightweight learning management platform
                </Typography>
                {user && (
                    <Link to="/courses" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" size="large" sx={{ marginRight: 2, backgroundColor: '#ffffff', color: '#2575fc' }}>
                            Courses
                        </Button>
                    </Link>
                )}
                {!user && (
                    <>
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" size="large" sx={{ marginRight: 2, backgroundColor: '#ffffff', color: '#2575fc' }}>
                                Get Started
                            </Button>
                        </Link>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Button variant="outlined" size="large" sx={{ marginRight: 2, color: '#ffffff', borderColor: '#ffffff' }}>
                                Login
                            </Button>
                        </Link>
                    </>
                )}
                {user && (
                    <Link to="/logout" style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" size="large" sx={{ color: '#ffffff', borderColor: '#ffffff' }}>
                            Logout
                        </Button>
                    </Link>
                )}

            </Box>

            {/* Features Section */}
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" textAlign="center" gutterBottom>
                    Explore Features
                </Typography>
                <Grid container spacing={3}>
                    {[
                        {
                            title: 'Browse Courses',
                            description: 'Explore a variety of courses with detailed information.',
                        },
                        {
                            title: 'Track Progress',
                            description: 'Monitor your learning progress with visual stats.',
                        },
                        {
                            title: 'Interactive Quizzes',
                            description: 'Test your knowledge with quizzes linked to your courses.',
                        },
                    ].map((feature, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card elevation={3} sx={{ textAlign: 'center' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body1">{feature.description}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Testimonials Section */}
            <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="h4" textAlign="center" gutterBottom>
                    What Our Users Say
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="body1" gutterBottom>
                                    "SkillTrack transformed the way I learn online! The progress tracking is amazing."
                                </Typography>
                                <Typography variant="caption" display="block" textAlign="right">
                                    - Jane Doe
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Footer */}
            <Box sx={{ textAlign: 'center', padding: 2, marginTop: 3, borderTop: '1px solid #ddd' }}>
                <Typography variant="body2">© 2024 SkillTrack. All rights reserved.</Typography>
                <Box sx={{ marginTop: 1 }}>
                    <Link to="/" style={{ margin: '0 10px', textDecoration: 'none', color: '#2575fc' }}>
                        Login
                    </Link>
                    <Link to="/register" style={{ margin: '0 10px', textDecoration: 'none', color: '#2575fc' }}>
                        Register
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default LandingPage;
