import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Box, Button, } from '@mui/material';
import { IconButton, Menu, MenuItem, SvgIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';

const Header = () => {
    const { user } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function MenuIcon(props) {
        return (
          <SvgIcon {...props} viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </SvgIcon>
        );
    };
      

    const menuItems = [
        { text: 'Home', link: '/' },
        { text: 'Courses', link: '/courses' },
        user && user.role === 'admin' && { text: 'Manage Courses', link: '/admin/courses' },
        user && user.role === 'user' && { text: 'Enrolled', link: '/courses/enrolled' },
        user && user.role === 'user' && { text: 'Completed', link: '/courses/completed' },
        { text: 'About', link: '/about' },
        user ? { text: 'Logout', link: '/logout' } : { text: 'Login', link: '/login' },
    ].filter(Boolean); // Filter out null values


    return (
        <AppBar position="static" sx={{ mb: 4, bgcolor: 'primary.main' }}>
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
                {isMobile ? (
                    <>
                        <IconButton
                            edge="start"
                            color="white"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            {menuItems.map((item) => (
                                <MenuItem
                                    key={item.text}
                                    component={Link}
                                    to={item.link}
                                    onClick={handleMenuClose}
                                >
                                    {item.text}
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                ) : (
                    <Box>
                        {menuItems.map((item) => (
                            <Button
                                key={item.text}
                                component={Link}
                                to={item.link}
                                color="inherit"
                                sx={{ textTransform: 'none', fontWeight: 'bold' }}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

/*
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
}; */

export default Header;
