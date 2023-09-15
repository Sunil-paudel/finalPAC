import mongoose from "mongoose";

const { Schema } = mongoose;

const locationSchema = new Schema(
  {
    city: {
      type: String,
    },
    
   
  },
  { timestamps: true }

);

// If the User collection does not exist, create a new one.
export default mongoose.models.Location || mongoose.model("Location", locationSchema);

 