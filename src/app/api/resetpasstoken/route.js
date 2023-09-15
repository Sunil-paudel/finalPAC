import connect from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  const { token, password } = await request.json();
  console.log(token, password)
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

  await connect();
  try {

    // Check if the user with the given token exists 
    const db = await User.find();
    console.log(db)
    const user = await User.findOne({resetToken: token});
    console.log(user);

    if (!user) {
      console.log("User not found"); // Add a console log for debugging
      return new NextResponse("User not found", {
        status: 404,
      });
    }

    console.log("User found:", user); // Add a console log to see the user object
   
    user.name ;
    user.email;
    
    // Check if a new password is provided and needs to be updated
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // Increase the number of rounds for security
      user.password = hashedPassword;
    }
   user.resetToken = generateResetToken();
    console.log("Updating user:", user); // Add a console log to see the user object before saving

    await user.save();

    console.log("User has been updated"); // Add a console log to confirm the update

    return new NextResponse("User has been updated", {
      status: 200,
    });
  } catch (err) {
    console.error("Error:", err); // Add a console log for catching and displaying errors
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
