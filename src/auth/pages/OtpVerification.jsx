import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpVerificationModal = ({ show, handleClose, handleVerify, email }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors({});
    
    const newOtp = otp.join("");
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      
      const response = await fetch(`${apiUrl}/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          otp_code: String(newOtp),
        }),
      });
      console.log("Submitting OTP:", newOtp); 
      
      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
          setMessage(data.message || "Validation failed");
        } else {
          setMessage(data.message || "Something went wrong");
        }
        return;
      }

      setMessage("Sign up successful!");
      console.log("User created:", data);

      navigate("/");
      handleClose();
    } catch (err) {
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 py-3">
          <h2 className="text-lg font-semibold">Verify OTP</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <p className="text-gray-500 mb-3">
            Enter the 6-digit code sent to your email
          </p>

          <div className="flex justify-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={digit}
                maxLength="1"
                onChange={(e) => handleChange(e.target.value, index)}
                onPaste={(e) => {
                  e.preventDefault();
                  const pasteData = e.clipboardData.getData("text").trim();
                  if (pasteData.length === otp.length) {
                    const newOtp = pasteData.split("").slice(0, otp.length);
                    setOtp(newOtp);
                    const lastInput = document.getElementById(
                      `otp-input-${otp.length - 1}`
                    );
                    lastInput?.focus();
                  }
                }}
                className="w-10 h-12 border border-gray-300 rounded text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 mx-1"
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t px-4 py-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationModal;
