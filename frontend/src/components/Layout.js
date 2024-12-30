import React from 'react';
import { Box } from '@mui/material';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', // Ensures the layout spans the full viewport height
            }}
        >
            <Box component="main" sx={{ flexGrow: 1 }}>
                {children} {/* Page content */}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
