import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
    const { user } = useAuth();
    return (
        <Box
            component="footer"
            sx={{
                textAlign: 'center',
                padding: 2,
                marginTop: 2,
                borderTop: '1px solid #ddd',
                backgroundColor: '#f9f9f9',
            }}
        >
            <Typography variant="body2">© 2024 SkillTrack. All rights reserved.</Typography>
            <Box sx={{ marginTop: 1 }}>
                <Link to="/about" style={{ margin: '0 10px', textDecoration: 'none', color: '#2575fc' }}>
                    About
                </Link>
                <Link to="/contact" style={{ margin: '0 10px', textDecoration: 'none', color: '#2575fc' }}>
                    contact us
                </Link>
                {user && (
                    <Link to="/logout" style={{ margin: '0 10px', textDecoration: 'none', color: '#2575fc' }}>
                        Logout
                    </Link>
                )}
                {!user && (
                    <Link to="/login" style={{ margin: '0 10px', textDecoration: 'none', color: '#2575fc' }}>
                        Login
                    </Link>
                )}
                <Link to="/register" style={{ margin: '0 10px', textDecoration: 'none', color: '#2575fc' }}>
                    Register
                </Link>
            </Box>
        </Box>
    );
};

export default Footer;
