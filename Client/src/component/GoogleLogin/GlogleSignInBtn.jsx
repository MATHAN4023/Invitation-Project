// GloginBtn.jsx
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { Avatar, Chip } from '@mui/material';
import gIcon from '../../assets/googleIcon.jpg'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GlogleSignInBtn = () => {
  // const navigate = useNavigate();

  // const login = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     try {
  //       const response = await fetch('http://localhost:5000/api/auth/google-login', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           token: tokenResponse.access_token,
  //         }),
  //       });

  //       const data = await response.json();
  //       if (response.ok) {
  //         localStorage.setItem('token', data.token);
  //         navigate('/home');
  //       } else {
  //         console.error('Google login failed:', data.message);
  //       }
  //     } catch (error) {
  //       console.error('Error during Google login:', error);
  //     }
  //   },
  //   onError: (error) => console.error('Google login error:', error),
  // });
  const handleSuccess = (response) => {
    console.log("Login Success:", response.credential);
    const credentials = response.credential
    // const data = jwt_decode(credentials);
    console.log(credentials);
    signInUser(credentials)
    // You can send the response to your backend to verify the token or create a session
  };

  const handleError = () => {
    console.log("Login Failed");
  };


  const signInUser = async (credential) => {
    try {
      const response = await fetch('http://localhost:5000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credential }),
      });

      const data = await response.json();
      console.log('Sign-in response:', data);
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  // return <button onClick={() => login()}>Login with Google</button>;
  const clientId = "638012821496-l2fav7ko54sm0tmbg6ckqbg1hsgs5154.apps.googleusercontent.com"
  return (
    // <Chip
    //   label="Google"
    //   variant="outlined"
    //   onClick={() => login()}
    //   avatar={
    //     <Avatar>
    //       <img src={gIcon} alt='google' />
    //       {/* <GoogleIcon /> */}
    //     </Avatar>
    //   }
    // />
    <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />
    </GoogleOAuthProvider>
      // <div className="App">
      // </div>
  );
};

export default GlogleSignInBtn;
