import nodemailer from "nodemailer";
import User from "@/models/User"; // Import your User model here
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { email } = await request.json();
  console.log(email);

  try {
    await connect();

    // Check if the email exists in your user database
    const user = await User.findOne({ email });

    if (!user) {
      console.error("Email not found");
      return new NextResponse(JSON.stringify({ error: "Email not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Generate a unique token for password reset
    const resetToken = generateResetToken();

    // Send a password reset email with the resetToken
    await sendPasswordResetEmail(user.email, resetToken);

    // Calculate the reset token expiry (e.g., set it to expire in 1 hour)
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1);

    // Update the user's record with the new reset token and expiry
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();
    console.log("Password reset email sent");
    return new NextResponse(
      JSON.stringify({ message: "Password reset email sent" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

function generateResetToken(length = 32) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return token;
}

async function sendPasswordResetEmail(recipientEmail, resetToken) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GOOGLE_EMAIL,
    to: recipientEmail, // Use the recipient's email
    subject: "Password Reset",
    text: `Click the following link to reset your password: 
      https://paudelschatbot.vercel.app/reset-password and here is your OTP ${resetToken}` ,
  };

  await transporter.sendMail(mailOptions);
}
