import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  noticeFor: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // This tells MongoDB to delete the document 24 hours (86400 seconds) after creation
    expires: 60 * 60 * 24, // 24 hours
  },
});

export default mongoose.model("Notice", noticeSchema);
