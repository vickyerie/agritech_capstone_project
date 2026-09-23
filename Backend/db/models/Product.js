import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true }, // seed, fertilizer, pesticide, equipment
    price: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
