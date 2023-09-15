import { useState } from "react";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(""); // State to hold the response message

  const checkEmailExists = async () => {
    setIsLoading(true); // Set loading state to true while making the request

    try {
      const resetResponse = await fetch(`/api/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (resetResponse.ok) {
        // Password reset email sent successfully
        setMessage("Password reset email sent.");
      } else {
        // Error sending the password reset email
        setMessage("Error sending password reset email.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // Reset loading state to false after the request
    }
  };

  return (
    <div>
      <h2>Forgot Password?</h2>

      <form>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button" onClick={checkEmailExists} disabled={isLoading}>
          Reset Password
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordResetRequest;
