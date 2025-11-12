import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String }, // we'll generate this via AI later
    mood: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Entry || mongoose.model("Entry", EntrySchema);