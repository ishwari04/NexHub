import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import API from "../api/axiosInstance";// Adjust path based on file location

import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  InputAdornment,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", credentials, {
        withCredentials: true,
      });

      login(data.token, data.role);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
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
          <LockOutlinedIcon sx={{ fontSize: 40, color: "#667eea" }} />
          <Typography variant="h5" fontWeight="bold" mt={1}>
            Login
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
            label="Username"
            name="username"
            value={credentials.username}
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
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.6)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.8)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                  borderWidth: '2px',
                },
              },
            }}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyOutlinedIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.6)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.8)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                  borderWidth: '2px',
                },
              },
            }}
          />

          <TextField
            fullWidth
            select
            label="Role"
            name="role"
            value={credentials.role}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.6)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.8)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                  borderWidth: '2px',
                },
              },
            }}
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
            Login
          </Button>

          <Typography mt={2} variant="body2" align="center">
            Don&apos;t have an account?{" "}
            <Link to="/signup" style={{ color: "#667eea", textDecoration: "none" }}>
              Sign up
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
