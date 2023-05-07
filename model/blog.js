import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({

  title: {
    type: "String",
    required: true,
    unique: false
  },
  thumbnail: {
    type: "String"
  },
  description: {
    type: "String"
  },
  created_at: {
    type: "String"
  },
  content: {
    type: "String"
  }

}, { timestamps: true })

export default mongoose.model("Blog", BlogSchema)
