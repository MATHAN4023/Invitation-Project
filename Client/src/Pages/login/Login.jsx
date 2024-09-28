// src/screens/LoginScreen.jsx
import './LoginScreen.css'; // Import the CSS file
import '../../style/shorthand.css';

// MUI imports
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Import libraries
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Onboardleft from '../../component/Onboarding/Onboardleft';
import GloginBtn from '../../component/GoogleLogin/GloginBtn';

const LoginScreen = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setOpen(true); // Show snackbar for error
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Store the token in local storage
        localStorage.setItem('token', data.token);
        navigate('/home'); // Redirect to home page
      } else {
        setOpen(true); // Show snackbar for error
      }
    } catch (error) {
      console.error('Login failed:', error);
      setOpen(true); // Show snackbar for error
    }
  };

  return (
    <div className="flex h-screen">
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message="Login failed. Please check your credentials."
      />

      {/* Onboarding Left  */}
      <div className="flex-1 leftContainer">
        <Onboardleft />
      </div>

      <div className="flex-1 bg-white p-8 flex">
        <div className="flex flex-col justify-center items-center w-full gap-8">
          <div className='themeClr text-2xl uppercase font-bold'>logo</div>
          <div>
            <GloginBtn />
          </div>
          <span className="mx-2">or</span>

          <div>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state
              sx={{ width: '350px' }}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state
              sx={{ width: '350px' }}
            />
            <div className="forgetPassword flex justify-between items-center font-bold">
              <p>Forgot your <span className='themeClr'>Password?</span></p>
              <Link to="/signup">or Register</Link>
            </div>
          </div>

          <div>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#6C63FF", borderRadius: "20px", width: '260px' }}
              onClick={handleLogin} // Call handleLogin on button click
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
