import Header from './Header';
import { register } from '../api/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register(username, password);
            setMessage(response.message);
            navigate('/login');
        } catch (err) {
            setMessage('Registration failed. Try again!');
        }
    };

    return (
        <>
            <Header />
            <Container maxWidth="xs">
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom>Register</Typography>
                    <TextField
                        label="Username"
                        variant="outlined"
                        size="small"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        size="small"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Register
                    </Button>
                    {message && <Typography color="error">{message}</Typography>}
                </Box>
            </Container>
        </>
    );
};

export default Register;
