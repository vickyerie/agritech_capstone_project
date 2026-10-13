import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema(
  {
    crop: { type: mongoose.Schema.Types.ObjectId, ref: "Crop", required: true },
    type: { type: String, enum: ["pest", "disease"], required: true },
    name: { type: String, required: true },
    description: { type: String },
    severity: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    recommendedAction: { type: String },
    status: { type: String, enum: ["active", "resolved"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Alert", AlertSchema);
