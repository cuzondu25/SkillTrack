import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    // Simulate authentication check (e.g., JWT token)
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? { token } : null;
    });

    const login = (token) => {
        localStorage.setItem('token', token);
        setUser({ token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
