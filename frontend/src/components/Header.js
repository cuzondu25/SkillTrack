import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
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
                    <Button
                        component={Link}
                        to="/about"
                        color="inherit"
                        sx={{ textTransform: 'none', fontWeight: 'bold' }}
                    >
                        About
                    </Button>
                    <Button
                        component={Link}
                        to="/logout"
                        color="inherit"
                        sx={{ textTransform: 'none', fontWeight: 'bold' }}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;