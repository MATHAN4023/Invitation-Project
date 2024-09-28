import { GoogleLogin } from 'react-google-login';

const GloginBtn = () => {
  const CLIENT_ID = '711398778211-da6j0qcd4vib14iq28ua36r1ge03rsj2.apps.googleusercontent.com';

  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
  };

  const handleLoginFailure = (response) => {
    console.error('Login failed:', response);
  };

  return (
    <GoogleLogin
      clientId={CLIENT_ID}
      buttonText="Login with Google"
      onSuccess={handleLoginSuccess}
      onFailure={handleLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GloginBtn;
