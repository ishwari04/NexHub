// src/scenes/Jobs/JobListPage.jsx

import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AuthContext from "../../context/AuthContext";
import API from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs", { withCredentials: true });
      setJobs(res.data);
    } catch (err) {
      setError("Failed to fetch jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      await API.delete(`/jobs/${jobId}`, { withCredentials: true });
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete job");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        All Job Listings
      </Typography>

      {user?.role === "admin" && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ mb: 2, backgroundColor: "#667eea" }}
          onClick={() => navigate("/admin/job-add")}
        >
          Add Job
        </Button>
      )}

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      {jobs.map((job) => (
        <Paper key={job._id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">{job.title}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {job.company} - {job.location}
          </Typography>
          <Typography mt={1}>{job.description}</Typography>
          <Typography variant="body2" color="gray">
            Salary: ₹{job.salary}
          </Typography>

          {user?.role === "admin" && (
            <Box mt={1}>
            <IconButton
              onClick={() => navigate(`/job-edit/${job._id}`)}
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#90caf9" : "#1976d2", // Light Blue for dark mode, default blue for light
              }}
            >
              <EditIcon />
            </IconButton>
          
            <IconButton
              onClick={() => handleDelete(job._id)}
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#f44336" : "#d32f2f", // Red variants
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          
          )}
        </Paper>
      ))}
    </Box>
  );
};

export default JobListPage;
 