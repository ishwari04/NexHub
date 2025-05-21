// src/scenes/Jobs/JobAddPage.jsx

import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import API from "../../api/axiosInstance";

const JobAddPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    try {
      const res = await API.post("/jobs/add-job", jobData, {
        withCredentials: true,
      });
      setSuccessMsg("Job added successfully!");
      setTimeout(() => navigate("/admin/job-list"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // Optional: Prevent non-admins (for double-safety)
  if (user?.role !== "admin") {
    return (
      <Box p={4}>
        <Typography variant="h6" color="error">
          You are not authorized to view this page.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ background: "linear-gradient(to right, #667eea, #764ba2)" }}
    >
      <Paper elevation={10} sx={{ p: 4, width: 500 }}>
        <Typography variant="h5" textAlign="center" mb={2}>
          Add New Job
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Job Title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Company"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Location"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Salary"
            name="salary"
            type="number"
            value={jobData.salary}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            required
          />

          {error && (
            <Typography color="error" mt={1}>
              {error}
            </Typography>
          )}
          {successMsg && (
            <Typography color="primary" mt={1}>
              {successMsg}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#667eea",
              "&:hover": { backgroundColor: "#5a67d8" },
            }}
          >
            Submit Job
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default JobAddPage;
