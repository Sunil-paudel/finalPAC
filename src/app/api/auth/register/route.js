import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (request) => {
  const { name, email, password } = await request.json();

  await connect();

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse("User with this email already exists", {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();

    // Sending confirmation email to the user
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GOOGLE_EMAIL,
      to: email, // Use the user's email for sending confirmation
      subject: "Registration Confirmation",
      text: `Thank you for registering on our platform, ${name}! Your registration is successful.`,
    };

    await transporter.sendMail(mailOptions);

    return new NextResponse("User has been created, and confirmation email sent", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};


// export const GET = async (request) => {
//   await connect();

//   try {
//     const users = await User.find(); // Fetch all users from the database
//     return new NextResponse(JSON.stringify(users), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (err) {
//     return new NextResponse(err.message, {
//       status: 500,
//     });
//   }
// };
