import Job from "../models/job.model.js";  

// ✅ Add a new job (Only Admin)
export const addJob = async (req, res) => {
    try {
        const { title, description, company, location, salary } = req.body;

        if (!title || !description || !company || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newJob = new Job({
            title,
            description,
            company,
            location,
            salary,
            postedBy: req.user._id, // Tracks which admin posted the job
        });

        await newJob.save();

        res.status(201).json({ message: "Job added successfully", job: newJob });
    } catch (error) {
        console.error("Error adding job:", error);
        res.status(500).json({ message: "Internal server error" });
        // ya pe if the new job matches the skills of the user then send an email to the user
    }
    
};

// ✅ Get all jobs (For Admin & Users)
export const getAllJobs = async (req, res) => {
    try {
      const jobs = await Job.find().populate("postedBy", "name email"); // optional populate
      res.status(200).json(jobs); // ✅ important!
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch jobs", error: err.message });
    }
  };
  
  

// ✅ Get job by ID
export const getJobById = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Update job (Only Admin)
export const updateJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ message: "Job updated successfully", job: updatedJob });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Delete job (Only Admin)
export const deleteJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await Job.findByIdAndDelete(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
