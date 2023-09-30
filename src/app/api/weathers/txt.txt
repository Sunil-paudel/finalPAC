import connect from "@/utils/db"; // Import your database connection utility
import { NextResponse } from "next/server";
import Location from "@/models/location";


export const POST = async (request) => {
 ;
  const { location, } = await request.json();
  console.log(location)
  await connect()
  const newLocation = new Location({
    city:location,
    
  });
  try {
    // Save the new contact entry to the database
    await newLocation.save();
     
    return new NextResponse("location detailled sent to db", {
      status: 201, // Use 201 for resource creation
    });
  } catch (err) {
    // Return an error response if there's an issue with saving the contact entry
    return new NextResponse(err.message, {
      status: 500, // Use 500 for internal server error
    });
  }
};
// Get method handling
export const GET = async () => {
  try {
    // Connect to the database
    await connect();

    // Retrieve appointments from the database (you might want to add sorting, filtering, or pagination here)
    const locations = await Location.find();

    // Return the list of appointments as a JSON response
    return new NextResponse(JSON.stringify(locations), {
      status: 200, // Use 200 for success
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    // Return an error response if there's an issue with retrieving appointments
    return new NextResponse(err.message, {
      status: 500, // Use 500 for internal server error
    });
  }
};

