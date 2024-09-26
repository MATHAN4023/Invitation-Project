import "./SignupScreen.css"; // Import the CSS file
import "../../style/shorthand.css";
import Onboardleft from "../../component/Onboarding/Onboardleft";

// mui imports
import Chip from "@mui/material/Chip"; // Import Chip correctly
import Avatar from "@mui/material/Avatar";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Import Asserts
import googleIcon from "../../assets/googleIcon.jpg";

// import libraries
import { Link } from 'react-router-dom';

import { useState } from "react";
import GloginBtn from "../../component/GoogleLogin/GloginBtn";

const Signup = () => {
  const [open, setOpen] = useState(false);
  const googleAuth = () => {
    console.log("TEST Auth");
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

 

  return (
    // FullContainer

    <div className="flex h-screen">
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message="Google Authentication"
      />

      {/* Onboarding Left  */}
      <div className="flex-1 leftContainer">
        <Onboardleft />
      </div>

      <div className="flex-1 bg-white p-8 flex">
        <div className="flex flex-col justify-center items-center w-full gap-8">
          <div className="themeClr text-2xl uppercase font-bold">logo</div>
          <div>
            {/* <Chip
              label="Login Through Google"
              variant="outlined"
              onClick={googleAuth}
              avatar={<Avatar src={googleIcon} alt="icon" />}
            /> */}
            <GloginBtn />
          </div>
          <div className="or">or</div>
          <div>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{ width: "350px" }}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              sx={{ width: "350px" }}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              sx={{ width: "350px" }}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Marriage Date"
              variant="outlined"
              sx={{ width: "350px" }}
            />
            <div className="forgetPassword flex  justify-end items-center font-bold">
              <Link to="/login">or Login</Link>
              {/* <p>or Login</p> */}
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
