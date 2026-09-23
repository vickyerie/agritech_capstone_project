import mongoose from "mongoose";

const FarmSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    areaSize: { type: Number, required: true }, // in acres
    cropType: { type: String, required: true },
    establishedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Farm", FarmSchema);
