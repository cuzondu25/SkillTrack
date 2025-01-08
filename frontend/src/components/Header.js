import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    const { user } = useAuth();
    return (
        <AppBar position="static" sx={{ mb: 4, bgcolor: 'primary.main'}}>
            <Toolbar>
                <Typography
                    variant="h5"
                    component={Link}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                >
                    SkillTrack
                </Typography>
                <Box>
                    <Button
                        component={Link}
                        to="/"
                        color="inherit"
                        sx={{ textTransform: 'none', fontWeight: 'bold' }}
                    >
                        Home
                    </Button>
                    <Button
                        component={Link}
                        to="/courses"
                        color="inherit"
                        sx={{ textTransform: 'none', fontWeight: 'bold' }}
                    >
                        Courses
                    </Button>

                    {user && user.role === 'admin' && (
                        <Button
                            component={Link}
                            to="/admin/courses"
                            color="inherit"
                            sx={{ textTransform: 'none', fontWeight: 'bold' }}
                        >
                            Manage Courses
                        </Button>
                    )}

                    {user && user.role === 'user' && (
                        <>
                            <Button
                                component={Link}
                                to="/courses/enrolled"
                                color="inherit"
                                sx={{ textTransform: 'none', fontWeight: 'bold' }}
                            >
                                Enrolled
                            </Button>
                            <Button
                                component={Link}
                                to="/courses/completed"
                                color="inherit"
                                sx={{ textTransform: 'none', fontWeight: 'bold' }}
                            >
                                Completed
                            </Button>
                        </>
                    )}
                    <Button
                        component={Link}
                        to="/about"
                        color="inherit"
                        sx={{ textTransform: 'none', fontWeight: 'bold' }}
                    >
                        About
                    </Button>
                    {user && (
                        <Button
                            component={Link}
                            to="/logout"
                            color="inherit"
                            sx={{ textTransform: 'none', fontWeight: 'bold' }}
                        >
                            Logout
                        </Button>
                    )}
                    {!user && (
                        <Button
                            component={Link}
                            to="/login"
                            color="inherit"
                            sx={{ textTransform: 'none', fontWeight: 'bold' }}
                        >
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;