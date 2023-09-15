import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Event from "@/models/event";


export const POST = async (request) => {
  console.log("POST method started.");
  await connect();
  
  // Function to send appointment reminder
 // Function to send appointment reminder
async function sendAppointmentReminder(event) {
  console.log("Sending appointment reminder...");
  const reminderDate = new Date(event.start);
reminderDate.setHours(reminderDate.getHours() - 24);
  // Check if the reminder time is in the future and exactly 24 hours before the event
  if (reminderDate > new Date()) {
      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
              user: "pacbot24@gmail.com",
              pass: "ofzyqssefycvpawh",
          },
      });

      // Define the email content
      const mailOptions = {
          from: "pacbot24@gmail.com",
          to: event.email,
          subject: "Appointment Reminder",
          text: `Hi ${event.title},\n\nThis is a reminder for your appointment tomorrow. Event details: Title: ${event.title}, Description: ${event.description}, Start: ${event.start}, End: ${event.end}`,
      };

      try {
          // Send the reminder email
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  console.error("Error sending appointment reminder:", error);
              } else {
                  console.log("Appointment reminder sent successfully.");
              }
          });
      } catch (err) {
          console.error("Error creating transporter:", err);
      }
  }
}




  const { title, description, start, end, email } = await request.json(); // Include 'email' property
  console.log("Received JSON data:", title, description, start, end, email);

  const newEvent = new Event({
    title,
    description,
    start,
    end,
    email, // Include 'email' property
  });
  console.log(newEvent)

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.GOOGLE_EMAIL,
    to: newEvent.email,
    subject: "Event Confirmation",
    text: `Event details: Title: ${newEvent.title},  ${newEvent.description},  Start: ${newEvent.start}, End: ${newEvent.end}`,
  };

  try {
    await newEvent.save();

    const info = await transporter.sendMail(mailOptions);
    console.log("Event confirmation sent:", info.response);
    sendAppointmentReminder(newEvent);

    console.log("POST method completed successfully.");
    return new NextResponse("Event has been created and confirmation email sent", {
      status: 201,
    });
  } catch (err) {
    console.error("Error in POST method:", err);
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};


export const GET = async (request) => {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  console.log(email)
  try {
    

    // Connect to the database
    await connect();

    // Retrieve user-specific appointments based on email
    const events = await Event.find(email && { email });
    


    return new NextResponse(JSON.stringify(events), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};


