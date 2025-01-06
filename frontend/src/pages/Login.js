import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await apiLogin(username, password);
            login(data.token);
            setMessage('Login successful!');
            navigate('/courses');
        } catch (err) {
            setMessage('Login failed!');
        }
    };

    return (
        <>
            <Header />
            <Container maxWidth="xs">
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom>Login</Typography>
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
                        Login
                    </Button>
                    {message && <Typography color="error">{message}</Typography>}
                </Box>
            </Container>
        </>
    );
};

export default Login;
