import { GoogleLogin } from 'react-google-login';

const GsignupBtn = () => {
  const CLIENT_ID = '711398778211-da6j0qcd4vib14iq28ua36r1ge03rsj2.apps.googleusercontent.com'; // Replace with your actual Client ID

  const handleSignupSuccess = async (response) => {
    const { profileObj } = response;

    // Send profile info to your backend for signup
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profileObj.name,
          email: profileObj.email,
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

  const handleSignupFailure = (response) => {
    console.error('Signup failed:', response);
    alert(`Signup failed: ${response.error}. Details: ${response.details}`);
  };

  return (
    <GoogleLogin
      clientId={CLIENT_ID}
      buttonText="Sign up with Google"
      onSuccess={handleSignupSuccess}
      onFailure={handleSignupFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GsignupBtn;
