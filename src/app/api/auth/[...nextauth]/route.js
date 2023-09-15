import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        // Check if the user exists.
        await connect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              // Send an email to the user upon successful login
              const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: process.env.GOOGLE_EMAIL,
                  pass: process.env.GOOGLE_PASSWORD,
                },
              });

              const mailOptions = {
                from: process.env.GOOGLE_EMAIL,
                to: user.email,
                subject: "Login Notification",
                text: "You have successfully logged in to our platform.",
              };

              await transporter.sendMail(mailOptions);

              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET_KEY,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    error: "/dashboard/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
});

export { handler as GET, handler as POST };
