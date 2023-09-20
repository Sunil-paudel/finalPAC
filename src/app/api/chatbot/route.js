import connect from "@/utils/db"; // Import your database connection utility
import { NextResponse } from "next/server";
import Question from "@/models/question";

export const POST = async (request) => {
  const { question, answer, email } = await request.json();

  await connect();

  // Remove leading and trailing whitespace from the question and convert to lowercase
  const cleanedQuestion = question.trim().toLowerCase();

  // Check if the question is "hi" or "hello" and prevent saving it
  if (cleanedQuestion === "hi" || cleanedQuestion === "hello") {
    console.log('Question is "hi" or "hello" and will not be saved to the database:', question);
    return new NextResponse("Question not saved to the database", {
      status: 200, // You can choose an appropriate status code
    });
  } else {
    const newQuestion = new Question({
      question,
      answer,
      email,
    });

    try {
      // Save the new question entry to the database
      await newQuestion.save();

      console.log('Question saved to the database:', question);

      return new NextResponse("Question details sent to the database", {
        status: 201, // Use 201 for resource creation
      });
    } catch (err) {
      // Return an error response if there's an issue with saving the question entry
      console.error('Error saving question to the database:', err.message);
      return new NextResponse(err.message, {
        status: 500, // Use 500 for an internal server error
      });
    }
  }
};

// Get method handling
export const GET = async (request) => {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  
  try {

    await connect();
    // Retrieve appointments from the database (you might want to add sorting, filtering, or pagination here)
    const quesetions = await Question.find(email && { email });

     // Filter out questions with specific content (e.g., "hi" or "hello")
     const filteredQuestions = quesetions.filter(question => !["hi", "hello"].includes(question.question.toLowerCase()));

     // Return the filtered list of questions as a JSON response
     return new NextResponse(JSON.stringify(filteredQuestions), {
       status: 200, // Use 200 for success
       headers: {
         "Content-Type": "application/json",
       },
     });
   } catch (err) {
     // Return an error response if there's an issue with retrieving questions
     return new NextResponse(err.message, {
       status: 500, // Use 500 for internal server error
     });
   }
 };

