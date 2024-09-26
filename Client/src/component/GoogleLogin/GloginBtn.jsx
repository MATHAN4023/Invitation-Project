// libraries
import { GoogleLogin } from 'react-google-login';

const GloginBtn = () => {
    const handleLoginSuccess = (response) => {
        console.log("Login Success: currentUser:", response.profileObj);
        // Handle successful login here (e.g., store user info, redirect, etc.)
      };
    
      const handleLoginFailure = (response) => {
        console.error("Login failed: res:", response);
        // Handle login failure here
      };
    return (
        <div>
            <GoogleLogin
                clientId="YOUR_CLIENT_ID.apps.googleusercontent.com" // Replace with your Client ID
                buttonText="Login with Google"
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GloginBtn