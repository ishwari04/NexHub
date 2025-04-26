import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, default: 0 },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Admin who posted
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
