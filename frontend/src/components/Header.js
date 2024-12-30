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
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;