import "./LoginScreen.css"; // Import the CSS file
import "../../style/shorthand.css";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Onboardleft from "../../component/Onboarding/Onboardleft";
import GloginBtn from "../../component/GoogleLogin/GloginBtn";
import { useAuth } from "../context/AuthContext"; // Import AuthContext

const LoginScreen = () => {
  const { login } = useAuth(); // Get login function from context
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login response:", data); // Log response for debugging

      if (response.ok) {
        login(data.token, { username: data.username, email: data.email });
        console.log("Token stored in localStorage:", data.token);
        console.log("Navigating to home...");
        navigate("/home"); // Redirect to home page
      } else {
        setOpen(true); // Show snackbar for error
      }
    } catch (error) {
      console.error("Login failed:", error);
      setOpen(true); // Show snackbar for error
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message="Login failed. Please check your credentials."
      />

      {/* Onboarding Left */}
      <div className="flex-1 hidden lg:flex leftContainer">
        <Onboardleft />
      </div>

      <div className="flex-1 bg-white p-4 lg:p-8 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full gap-6 lg:gap-8">
          <div className="themeClr text-2xl uppercase font-bold">logo</div>
          <div>
            <GloginBtn /> {/* Google Login Button */}
          </div>
          <span className="mx-2 text-lg">or</span>

          <div>
            <TextField
              id="email" // Unique ID for email field
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state
              sx={{ width: "280px", maxWidth: "100%" }} // Responsive width
            />
          </div>
          <div>
            <TextField
              id="password" // Unique ID for password field
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state
              sx={{ width: "280px", maxWidth: "100%" }} // Responsive width
            />
            <div className="forgetPassword flex justify-between items-center font-bold">
              <p>
                Forgot your <span className="themeClr">Password?</span>
              </p>
              <Link to="/signup" className="text-blue-500 hover:underline">or Register</Link>
            </div>
          </div>

          <div>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6C63FF",
                borderRadius: "20px",
                width: "240px",
              }}
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
