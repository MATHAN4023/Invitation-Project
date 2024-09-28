// src/components/AppBarComponent.jsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../../Pages/context/AuthContext'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';

const AppBarComponent = () => {
    const { currentUser ,login, logout } = useAuth(); // Get user and logout function from context
    console.log("user",currentUser);
    const { username, email } = currentUser;
    console.log("Username:", username);
    // const token = localStorage.getItem('token', token);
    // const decodedToken = jwt_decode(token);
    // console.log('Decoded token:', token);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Call logout function
        navigate('/login'); // Redirect to login page
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#6C63FF' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Welcome Designer
                    {/* , {user?.username}  */}
                </Typography>
                <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
                    {/* {user?.email}  */}
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarComponent;
