import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login as apiLogin } from '../api/auth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Use login method from AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await apiLogin(username, password); // Call API for login
            login(data.token);
            setMessage('Login successful!');
            navigate('/courses');
        } catch (err) {
            setMessage('Login failed!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
            <p>{message}</p>
        </form>
    );
};

export default Login;
