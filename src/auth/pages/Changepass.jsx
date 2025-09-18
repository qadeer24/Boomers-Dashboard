// src/pages/CreateNewPass.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateNewPass = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPass) {
      setMessage("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("resetToken");
      const email = localStorage.getItem("resetEmail");

      if (!token || !email) {
        setMessage("Reset session expired. Please request again.");
        return;
      }

      const apiUrl = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${apiUrl}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          token,
          password,
          password_confirmation: confirmPass,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong");
        return;
      }

      setMessage("Password reset successfully!");
      localStorage.removeItem("resetToken");
      localStorage.removeItem("resetEmail");
      navigate("/login"); // redirect after success
    } catch (err) {
      setMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4" style={{ color: "#E30517" }}>
          Create New Password
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />
          </div>

          {message && (
            <div className="alert alert-danger py-2">{message}</div>
          )}

          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "#E30517", color: "white" }}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewPass;
