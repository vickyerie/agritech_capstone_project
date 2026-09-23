import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["farmer", "admin"], default: "farmer" },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
