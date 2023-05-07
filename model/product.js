import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
    unique: false
  },
  color: {
    type: "String"
  },
  price: {
    type: "Number"
  },
  discount: {
    type: "Number"
  },
  gender: {
    type: "String"
  },
  code: {
    type: "String"
  },
  size: [{ type: String }],
  image: {
    type: "String"
  },
  favorite: {
    type: "Number"
  },
  status: {
    type: "String"
  },
  describe: {
    type: "String"
  }

}, { timestamps: true })

export default mongoose.model("Product", ProductSchema)
