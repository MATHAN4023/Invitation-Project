import "./SignupScreen.css"; // Import the CSS file
import "../../style/shorthand.css";
import Onboardleft from "../../component/Onboarding/Onboardleft";

// MUI imports
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Import libraries
import { Link } from "react-router-dom";
import { useState } from "react";
import GloginBtn from "../../component/GoogleLogin/GloginBtn";
import axios from "axios"; // Import Axios for making HTTP requests
import GsignupBtn from "../../component/GoogleLogin/GsignupBtn";

const Signup = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    marriageDate: "", // Add marriage date if needed
  });
  const [errors, setErrors] = useState({}); // State for validation errors

  const { name, email, password, marriageDate } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on input change
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name) && name.trim() !== '';
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = "Name is required.";
    } else if (!validateName(name)) {
      newErrors.name = "Please enter a valid name (only alphabets).";
    }

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    if (!marriageDate) {
      newErrors.marriageDate = "Marriage date is required.";
    } else if (new Date(marriageDate) < new Date()) {
      newErrors.marriageDate = "Marriage date must be in the future.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if there are no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!validateForm()) return; // Only submit if validation passes

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        marriageDate, // Include marriage date if needed
      });
      
      // Handle successful registration (e.g., navigate to login)
      console.log(response.data);
      setOpen(true); // Show Snackbar for success
    } catch (error) {
      if (error.response) {
        // The request was made, and the server responded with a status code
        console.error("Error registering user:", error.response.data); // Log the complete response data
        console.error("Status code:", error.response.status); // Log the status code
        console.error("Headers:", error.response.headers); // Log the response headers
        // You can set error messages for user feedback if necessary
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: error.response.data.message || "An error occurred while signing up.",
        }));
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error registering user: No response received:", error.request);
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: "No response from the server. Please try again later.",
        }));
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error registering user:", error.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: "An error occurred while setting up the request.",
        }));
      }
      setOpen(true); // Show Snackbar for error
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex h-screen">
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message="Registration successful!"
      />

      <div className="flex-1 leftContainer">
        <Onboardleft />
      </div>

      <div className="flex-1 bg-white p-8 flex">
        <div className="flex flex-col justify-center items-center w-full gap-8">
          <div className="themeClr text-2xl uppercase font-bold">logo</div>
          <div>
            <GsignupBtn />
          </div>
          <div className="or">or</div>
          <div>
            {errors.general && <div className="error-message text-red-600">{errors.general}</div>}
          </div>
          <div>
            <TextField
              name="email"
              value={email}
              onChange={handleChange}
              label="Email"
              variant="outlined"
              sx={{ width: "350px" }}
              error={!!errors.email}
              helperText={errors.email}
            />
          </div>
          <div>
            <TextField
              name="name"
              value={name}
              onChange={handleChange}
              label="Name"
              variant="outlined"
              sx={{ width: "350px" }}
              error={!!errors.name}
              helperText={errors.name}
            />
          </div>
          <div>
            <TextField
              name="password"
              value={password}
              onChange={handleChange}
              label="Password"
              type="password"
              variant="outlined"
              sx={{ width: "350px" }}
              error={!!errors.password}
              helperText={errors.password}
            />
          </div>
          <div>
            <TextField
              name="marriageDate"
              value={marriageDate}
              onChange={handleChange}
              label="Marriage Date"
              type="date" // Set the input type to date
              variant="outlined"
              sx={{ width: "350px" }}
              error={!!errors.marriageDate}
              helperText={errors.marriageDate}
              InputLabelProps={{
                shrink: true, // Keeps the label above the input when selected
              }}
              InputProps={{
                style: { padding: "1px" }, // Add some padding to the input field
              }}
            />
            <div className="forgetPassword flex justify-end items-center font-bold">
              <Link to="/login">or Login</Link>
            </div>
          </div>
          <div>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6C63FF",
                borderRadius: "20px",
                width: "260px",
              }}
              onClick={handleSubmit} // Call handleSubmit on button click
            >
              Create New Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
