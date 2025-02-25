import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, Button, Typography, Grid, Card, CardContent } from '@mui/material';

const LandingPage = () => {
    const { user } = useAuth(); // Get user state from Auth Context

    return (
        <Box sx={{ fontFamily: 'Arial, sans-serif', padding: '2vw' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    textAlign: 'center',
                    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                    color: 'white',
                    padding: '2vh',
                    borderRadius: 2,
                    maxHeight: '33.3vh',
                    overflow: 'hidden',
                }}
            >
                <Typography
	            variant="h2"
	            gutterBottom
                    sx={{ 
                        fontSize: 'clamp(1.5rem, 5vw, 3rem)', // Adjusts based on viewport width
                        whiteSpace: 'nowrap' // Prevents text wrapping
                    }}
                >
                    Welcome to SkillTrack
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
			fontSize: 'clamp(1rem, 2vw, 1.5rem)',
			marginBottom: 'calc(16px + 1vw)',
		    }}
                >
                    Your lightweight learning management platform
                </Typography>
                <Link to="/courses" style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        sx={{
                            marginRight: '2vw',
                            marginBottom: '1vw',
                            backgroundColor: '#ffffff',
                            color: '#2575fc',
                            padding: 'calc(0.3em + 0.4vw) calc(0.5em + 1.2vw)',
                            fontSize: 'calc(0.5rem + 0.5vw)',
                            '&:hover': {
                                backgroundColor: '#2575fc',
                                color: '#ffffff',
                            },
                        }}
                    >
                        Courses
                    </Button>
                </Link>
                {user && user.role === 'admin' && (
                    <Link to="/admin/courses" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            size="medium"
                            sx={{
                                marginRight: '2vw',
                                marginBottom: '1vw',
                                backgroundColor: '#ffffff',
                                color: '#2575fc',
                                padding: 'calc(0.3em + 0.4vw) calc(0.5em + 1.2vw)',
                                fontSize: 'calc(0.5rem + 0.5vw)',
                                '&:hover': {
                                    backgroundColor: '#2575fc',
                                    color: '#ffffff',
                                },
                            }}
                        >
                            Manage Courses
                        </Button>
                    </Link> 
                )}
                {user && user.role === 'user' && (
                    <>
                        <Link to="/courses/enrolled" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained"
                                size="medium"
                                sx={{
                                    marginRight: '2vw',
                                    marginBottom: '1vw',
                                    backgroundColor: '#ffffff',
                                    color: '#2575fc',
                                    padding: 'calc(0.3em + 0.4vw) calc(0.5em + 1.2vw)',
                                    fontSize: 'calc(0.5rem + 0.5vw)',
                                    '&:hover': {
                                        backgroundColor: '#2575fc',
                                        color: '#ffffff',
                                    },
                                }}
                            >
                               Enrolled
                            </Button>
                        </Link>
                        <Link to="/courses/completed" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained"
                                size="medium"
                                sx={{
                                    marginRight: '2vw',
                                    marginBottom: '1vw',
                                    backgroundColor: '#ffffff',
                                    color: '#2575fc',
                                    padding: 'calc(0.3em + 0.4vw) calc(0.5em + 1.2vw)',
                                    fontSize: 'calc(0.5rem + 0.5vw)',
                                    '&:hover': {
                                        backgroundColor: '#2575fc',
                                        color: '#ffffff',
                                    },
                                }}
                            >
                               Completed
                            </Button>
                        </Link>
                    </>
                )}
                {!user && (
                    <>
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained"
                                size="medium"
                                sx={{
                                    marginRight: '2vw',
                                    marginBottom: '1vw',
                                    backgroundColor: '#ffffff',
                                    color: '#2575fc',
                                    padding: 'calc(0.3em + 0.4vw) calc(0.5em + 1.2vw)',
                                    fontSize: 'calc(0.5rem + 0.5vw)',
                                    '&:hover': {
                                        backgroundColor: '#2575fc',
                                        color: '#ffffff',
                                    },
                                }}
                            >
                                Get Started
                            </Button>
                        </Link>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="outlined"
                                size="medium"
                                sx={{
                                    marginRight: '2vw',
                                    marginBottom: '1vw',
                                    color: '#ffffff',
                                    borderColor: '#ffffff',
                                    padding: 'calc(0.3em + 0.4vw) calc(0.5em + 1.2vw)',
                                    fontSize: 'calc(0.5rem + 0.5vw)',
                                    '&:hover': {
                                        backgroundColor: '#ffffff', // Adds background on hover
                                        color: '#2575fc',           // Changes text color on hover
                                        borderColor: '#2575fc',     // Changes border color on hover
                                    },
                                }}
                            >
                                Login
                            </Button>
                        </Link>
                    </>
                )}
                {user && (
                    <Link to="/logout" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="outlined"
                            size="medium"
                            sx={{
                                marginRight: '2vw',
                                marginBottom: '1vw',
                                color: '#ffffff',
                                borderColor: '#ffffff',
                                padding: 'calc(0.3em + 0.4vw) calc(0.5em + 1.2vw)',
                                fontSize: 'calc(0.5rem + 0.5vw)',
                                '&:hover': {
                                    backgroundColor: '#ffffff', // Adds background on hover
                                    color: '#2575fc',           // Changes text color on hover
                                    borderColor: '#2575fc',     // Changes border color on hover
                                },
                            }}
                        >
                            Logout
                        </Button>
                    </Link>
                )}

            </Box>

            {/* Features Section */}
            <Box sx={{ padding: 4 }}>
                <Typography
                    variant="h4"
                    textAlign="center"
                    gutterBottom
                    sx = {{ fontSize: 'clamp(1rem, 5vw, 2rem)' }}
                >
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
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{ fontSize: 'clamp(0.9rem, 4vw, 1.3rem)' }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: 'clamp(0.7rem, 3.2vw, 1rem)' }}>
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Testimonials Section */}
            <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                <Typography
                    variant="h4"
                    textAlign="center"
                    gutterBottom
                    sx = {{ fontSize: 'clamp(1rem, 5vw, 2rem)' }}
                >
                    What Our Users Say
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    sx={{ fontSize: 'clamp(0.7rem, 3.2vw, 1rem)' }}
                                >
                                    "SkillTrack transformed the way I learn online! The progress tracking is amazing."
                                </Typography>
                                <Typography variant="caption" display="block" textAlign="right">
                                    - Ebube Godwin
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default LandingPage;
