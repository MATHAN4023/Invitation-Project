// src/Pages/context/ProtectedRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the path as necessary

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth(); // Get current user from context

    return currentUser ? children : <Navigate to="/login" />; // Navigate to login if not authenticated
};

export default ProtectedRoute;
