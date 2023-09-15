"use client"
import React, { useState } from "react";

export default function ResetPassword() {
  // State to manage the new password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);

  // Function to handle password reset
  const handleResetPassword = async () => {
    try {
      // Make an HTTP request to your server to reset the password
      // Include the token and new password in the request body
      const response = await fetch("/api/resetpasstoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        // Password reset was successful
        setResetSuccess(true);
      } else {
        // Handle errors, e.g., display an error message to the user
        setError("Password reset failed. Please try again.");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      {resetSuccess ? (
        <div>
          <h1>Password Reset Successful</h1>
          <p>Your password has been successfully reset.</p>
        </div>
      ) : (
        <div>
          <h1>Reset Your Password</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <label>
            Please enter (one time password)OTP:
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "16px",
              }}
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "16px",
              }}
            />
          </label>
          <label>
            Confirm New Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "16px",
              }}
            />
          </label>
          <button
            onClick={handleResetPassword}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "8px 16px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
}
