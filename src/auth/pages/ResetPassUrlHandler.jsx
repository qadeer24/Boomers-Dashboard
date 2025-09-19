import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResetPasswordUrlHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email");

    if (token && email) {
      // Save to localStorage
      localStorage.setItem("resetToken", token);
      localStorage.setItem("resetEmail", email);

      // Redirect to your reset password form
      navigate("/auth/classic/change-password"); 
    }
  }, [navigate]);

  return <div>Processing your reset request...</div>;
};

export default ResetPasswordUrlHandler;
