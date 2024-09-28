import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GsignupBtn = () => {
  const CLIENT_ID = '711398778211-da6j0qcd4vib14iq28ua36r1ge03rsj2.apps.googleusercontent.com'; // Replace with your actual Client ID

  const handleSignupSuccess = async (credentialResponse) => {
    const userObject = jwt_decode(credentialResponse.credential); // Use jwt-decode to get user info from the token

    // Send profile info to your backend for signup
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userObject.name,
          email: userObject.email,
        }),
      });

      const data = await res.json();

      if (data.success) {
        console.log('Signup successful:', data);
        // Redirect to home or perform other actions
      } else {
        console.error('Signup failed:', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleSignupFailure = (error) => {
    console.error('Signup failed:', error);
    alert(`Signup failed: ${error}`);
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleSignupSuccess}
        onFailure={handleSignupFailure}
        cookiePolicy={'single_host_origin'}
      />
    </GoogleOAuthProvider>
  );
};

export default GsignupBtn;
