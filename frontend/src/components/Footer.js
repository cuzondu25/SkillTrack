import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const Footer = () => {
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
                <Link to="/" style={{ margin: '0 10px', textDecoration: 'none', color: '#2575fc' }}>
                    Login
                </Link>
                <Link to="/register" style={{ margin: '0 10px', textDecoration: 'none', color: '#2575fc' }}>
                    Register
                </Link>
            </Box>
        </Box>
    );
};

export default Footer;
