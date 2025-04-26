// src/scenes/Jobs/JobEditPage.jsx

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axiosInstance";

const JobEditPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });
  const [error, setError] = useState("");

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${jobId}`, { withCredentials: true });
      setJobData(res.data);
    } catch (err) {
      setError("Failed to fetch job details");
    }
  };

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/jobs/${jobId}`, jobData, { withCredentials: true });
      navigate("/job-list");
    } catch (err) {
      setError("Failed to update job");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ background: "#f7f7f7" }}
    >
      <Paper elevation={10} sx={{ padding: 4, width: 500 }}>
        <Typography variant="h5" mb={3}>
          Edit Job Posting
        </Typography>

        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Job Title"
            name="title"
            fullWidth
            value={jobData.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            label="Company"
            name="company"
            fullWidth
            value={jobData.company}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            label="Location"
            name="location"
            fullWidth
            value={jobData.location}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            label="Salary"
            name="salary"
            fullWidth
            value={jobData.salary}
            onChange={handleChange}
            margin="normal"
            type="number"
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            value={jobData.description}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#667eea" }}
          >
            Update Job
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default JobEditPage;
