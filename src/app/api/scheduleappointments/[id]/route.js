
import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Event from "@/models/event";
export const GET = async (request, { params }) => {
    const { id } = params;
  
    try {
      await connect();
  
      const event = await Event.findById(id);
      console.log(event)
  
      return new NextResponse(JSON.stringify(event), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };

export const DELETE = async (request, { params }) => {
    const { id } = params;
    console.log(id)
  
    try {
      await connect();
  
      await  Event.findByIdAndDelete(id);
      
  
      return new NextResponse("event has been deleted", { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };
  export const PUT = async (request, { params, body }) => {
    const { id } = params;
    const updatedEventData = JSON.parse(body);
  
    try {
      await connect();
  
      // Find the event by ID and update it with the new data
      const updatedEvent = await Event.findByIdAndUpdate(id, updatedEventData, {
        new: true, // Return the updated event
      });
  
      return new NextResponse(JSON.stringify(updatedEvent), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };