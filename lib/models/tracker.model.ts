import mongoose from "mongoose";

const trackerSchema = new mongoose.Schema({
  title: {
    type: String,
    min: 3,
    required: true,
  },
  amount: {
    type: Number,
    min: 1,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Tracker = mongoose.models.Tracker || mongoose.model("Tracker", trackerSchema);

export default Tracker;
