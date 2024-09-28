// GloginBtn.jsx
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { Avatar, Chip } from '@mui/material';
import gIcon from '../../assets/googleIcon.jpg'

const GloginBtn = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/google-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: tokenResponse.access_token,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          navigate('/home');
        } else {
          console.error('Google login failed:', data.message);
        }
      } catch (error) {
        console.error('Error during Google login:', error);
      }
    },
    onError: (error) => console.error('Google login error:', error),
  });

  // return <button onClick={() => login()}>Login with Google</button>;
  return (
    <Chip
    label="Google"
    variant="outlined"
    onClick={() => login()}
    avatar={
      <Avatar>
        <img src={gIcon} alt='google' />
        {/* <GoogleIcon /> */}
      </Avatar>
    }
  />
  );
};

export default GloginBtn;
