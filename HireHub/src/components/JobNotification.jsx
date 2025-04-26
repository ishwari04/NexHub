import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  useTheme,
} from "@mui/material";
import API from "../api/axiosInstance";
import AuthContext from "../context/AuthContext";

const JobNotification = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const theme = useTheme(); // 🌗 Access the theme

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched jobs:", res.data);
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token]);

  // 🎨 Colors based on theme mode
  const isDarkMode = theme.palette.mode === "dark";
  const cardTextColor = isDarkMode ? "white" : "black";
  const cardBgColor = isDarkMode ? "#1e1e1e" : "#ffffff";

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom color={cardTextColor}>
        Job Notifications
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : jobs.length === 0 ? (
        <Typography color={cardTextColor}>No job notifications available.</Typography>
      ) : (
        jobs.map((job) => (
          <Card
            key={job._id}
            sx={{
              mb: 2,
              backgroundColor: cardBgColor,
              border: "1px solid white",
              color: cardTextColor,
              borderRadius: "8px",
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6">{job.title || "Untitled Job"}</Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: isDarkMode ? "#aaa" : "text.secondary" }}
              >
                {job.company || "Unknown Company"} — {job.location || "Remote"}
              </Typography>
              <Divider sx={{ my: 1, borderColor: isDarkMode ? "#333" : "grey.300" }} />
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                {job.description || "No description provided."}
              </Typography>
              {job.salary && (
                <Typography variant="body2" mt={1}>
                  💰 Salary: {job.salary}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default JobNotification;
