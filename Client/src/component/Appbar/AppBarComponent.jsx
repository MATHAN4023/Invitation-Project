// src/components/AppBarComponent.jsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../../Pages/context/AuthContext'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';

const AppBarComponent = () => {
    const { user, logout } = useAuth(); // Get user and logout function from context
    console.log("user",user);
    
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Call logout function
        navigate('/login'); // Redirect to login page
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#6C63FF' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Welcome, {user?.username} {/* Display username */}
                </Typography>
                <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
                    {user?.email} {/* Display email */}
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                    Logout {/* Logout button */}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarComponent;
