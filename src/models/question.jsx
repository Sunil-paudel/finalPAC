import mongoose from "mongoose";
const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
    
    email:{
      type: String,
    }

  },
  { timestamps: true }

);

export default mongoose.models.Question || mongoose.model("Question", questionSchema);
