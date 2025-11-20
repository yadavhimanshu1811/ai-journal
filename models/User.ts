// models/User.ts
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: false },
  password: { type: String, required: false },
  provider: { type: String, default: "credentials" },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);