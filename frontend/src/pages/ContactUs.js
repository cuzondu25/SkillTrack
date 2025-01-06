import React from 'react';
import Header from './Header'
import { Box, Typography, Link, Grid, Paper } from '@mui/material';

const ContactUs = () => {
    return (
        <>
            <Header />
            <Box
                sx={{
                    padding: 3,
                    margin: 'auto',
                    maxWidth: 600,
                    backgroundColor: '#f9f9f9',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Contact Us
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
                    We’d love to hear from you! Reach us through the following channels:
                </Typography>
                <Paper
                    elevation={3}
                    sx={{
                    padding: 3,
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                            <strong>Email us:</strong>{' '}
                            <Link
                                href="mailto:cuzondu25@gmail.com"
                                underline="hover"
                                sx={{ color: '#2575fc' }}
                            >
                                cuzondu25@gmail.com
                            </Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                <strong>WhatsApp us:</strong>{' '}
                                <Link
                                    href="https://wa.me/2348104317890"
                                    target="_blank"
                                    underline="hover"
                                    sx={{ color: '#25d366' }}
                                >
                                    +2348104317890
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </>
    );
};

export default ContactUs;
