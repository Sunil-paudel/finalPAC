// import connect from "@/utils/db"; // Import your database connection utility
// import { NextResponse } from "next/server";
// import Question from "@/models/question";

// export const GET = async (request, { params }) => {
//     const { id } = params;
  
//     try {
//       await connect();
  
//       const quesetion = await Question.findById(id);
      
  
//       return new NextResponse(JSON.stringify(quesetion), { status: 200 });
//     } catch (err) {
//       return new NextResponse("Database Error", { status: 500 });
//     }
//   };

