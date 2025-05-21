import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axiosInstance";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form, { withCredentials: true });
      navigate("/login"); // After signup, redirect to login
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    sx={{
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      backgroundImage: 'url("/b4.jpg")',
      backgroundSize: 'cover',  // Changed from 'cover' to 'contain'
      backgroundPosition: 'bottom',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#f5f5f5',  // Added background color as fallback
     
    }}
  >
      <Paper elevation={10} sx={{ padding: 4, width: 400 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <BadgeOutlinedIcon sx={{ fontSize: 40, color: "#667eea" }} />
          <Typography variant="h5" fontWeight="bold" mt={1}>
            Sign Up
          </Typography>
        </Box>

        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
            sx={inputStyles}
          />

          <TextField
            fullWidth
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
            sx={inputStyles}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
            sx={inputStyles}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            }}
            sx={inputStyles}
          />

          <TextField
            fullWidth
            select
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            sx={inputStyles}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="recruiter">Recruiter</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: "#667eea",
              "&:hover": {
                backgroundColor: "#5a67d8",
              },
            }}
          >
            Sign Up
          </Button>

          <Typography mt={2} variant="body2" align="center">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#667eea", textDecoration: "none" }}>
              Login
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.6)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(0, 0, 0, 0.8)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#667eea",
      borderWidth: "2px",
    },
  },
};

export default Signup;
