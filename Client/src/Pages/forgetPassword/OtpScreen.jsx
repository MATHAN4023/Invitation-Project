// src/screens/OtpScreen.jsx
import "../../style/shorthand.css";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Onboardleft from "../../component/Onboarding/Onboardleft";

const OtpScreen = () => {
    const [open, setOpen] = useState(false);
    const [otp, setOtp] = useState(["", "", "", ""]); // State for 6 OTP digits
    const [resendMessage, setResendMessage] = useState("");
    const [resendDisabled, setResendDisabled] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };

    const handleVerifyOtp = async () => {
        const otpString = otp.join(""); // Combine the OTP array into a single string
        if (otpString.length !== 6) {
            setOpen(true); // Show snackbar if OTP is not fully entered
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ otp: otpString }),
            });

            const data = await response.json();
            console.log("OTP verification response:", data);

            if (response.ok) {
                navigate("/reset-password"); // Navigate to password reset page
            } else {
                setOpen(true); // Show snackbar for error
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
            setOpen(true);
        }
    };

    const handleResendCode = async () => {
        setResendDisabled(true); // Disable the resend button for a while

        try {
            const response = await fetch("http://localhost:5000/api/auth/resend-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log("Resend OTP response:", data);

            if (response.ok) {
                setResendMessage("OTP resent successfully.");
            } else {
                setResendMessage("Failed to resend OTP. Please try again.");
            }
        } catch (error) {
            console.error("Resend OTP failed:", error);
            setResendMessage("Failed to resend OTP. Please try again.");
        }

        // Enable the button after 30 seconds
        setTimeout(() => setResendDisabled(false), 30000);
    };

    const handleChangeOtp = (value, index) => {
        if (value.length > 1) return; // Prevent input longer than 1 character

        const newOtp = [...otp];
        newOtp[index] = value;

        // Move focus to the next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput.focus();
        } else if (value === "") {
            // Move focus to the previous input on backspace
            if (index > 0) {
                const prevInput = document.getElementById(`otp-${index - 1}`);
                prevInput.focus();
            }
        }

        setOtp(newOtp);
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "ArrowRight") {
            if (index < 5) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                nextInput.focus();
            }
        } else if (e.key === "ArrowLeft") {
            if (index > 0) {
                const prevInput = document.getElementById(`otp-${index - 1}`);
                prevInput.focus();
            }
        } else if (e.key === "Backspace") {
            // Move focus to the previous input on backspace
            if (otp[index] === "") {
                if (index > 0) {
                    const prevInput = document.getElementById(`otp-${index - 1}`);
                    prevInput.focus();
                }
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
                message="OTP verification failed. Please try again."
            />

            {/* Onboarding Left  */}
            <div className="hidden md:flex flex-1 leftContainer">
                <Onboardleft />
            </div>

            <div className="flex-1 bg-white p-4 md:p-8 flex">
                <div className="flex flex-col justify-center items-center w-full gap-8">
                    <div className="themeClr text-2xl uppercase font-bold">Enter OTP</div>
                    <div className="otp-input-container flex justify-center gap-2">
                        {otp.map((digit, index) => (
                            <TextField
                                key={index}
                                id={`otp-${index}`} // Unique ID for each OTP input
                                label=""
                                variant="outlined"
                                value={digit}
                                onChange={(e) => handleChangeOtp(e.target.value, index)} // Update state
                                onKeyDown={(e) => handleKeyDown(e, index)} // Handle key down events
                                sx={{ width: "60px", height: "60px", textAlign: "center" }}
                                inputProps={{ maxLength: 1 }} // Limit input to 1 character
                            />
                        ))}
                    </div>
                    <div className="w-full flex justify-center">
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#6C63FF",
                                borderRadius: "20px",
                                width: "40%",
                            }}
                            onClick={handleVerifyOtp} // Call handleVerifyOtp on button click
                        >
                            Verify OTP
                        </Button>
                    </div>
                    <div className="resend-section">
                        <p>{resendMessage}</p>
                        <Button
                            variant="text"
                            disabled={resendDisabled}
                            onClick={handleResendCode}
                        >
                            Resend OTP
                        </Button>
                    </div>
                    <div className="back-to-login">
                        <Link to="/login" className="themeClr">
                            Back to Login
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OtpScreen;
