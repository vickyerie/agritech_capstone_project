import mongoose from "mongoose";

const CropSchema = new mongoose.Schema(
  {
    farm: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
    name: { type: String, required: true },
    variety: { type: String },
    quantity: { type: Number, required: true },
    plantedDate: { type: Date, required: true },
    harvestDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Crop", CropSchema);
