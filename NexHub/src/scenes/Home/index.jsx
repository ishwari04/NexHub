import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Paper, Divider } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `
          url("/b4.jpg")`,
          backgroundSize: 'cover',  // Changed from 'cover' to 'contain'
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#f5f5f5',  // Added background color as fallback
        color: "#fff",
        padding: 4,
      }}


    >
      <Paper
        elevation={12}
        sx={{
          padding: 5,
          borderRadius: 5,
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(15px)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          textAlign: "center",
          maxWidth: 500,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "1.5rem", md: "2.5rem" },
            letterSpacing: "1px",
          }}
        >
          Welcome to Nex_Hub
        </Typography>

        <Divider sx={{ my: 3, backgroundColor: "rgba(255,255,255,0.2)" }} />

        <Typography
          variant="body1"
          sx={{ mb: 4, fontSize: "1.1rem", color: "#000" }}
        >
          Your smart hiring solution. Manage jobs, candidates, and more—all in one place.
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{
            backgroundColor: "#222",
            color: "#fff",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            borderRadius: "30px",
            textTransform: "none",
            transition: "0.3s ease",
            "&:hover": {
              backgroundColor: "#333",
              transform: "scale(1.05)",
            },
          }}
          onClick={() => navigate("/login")}
        >
          Go to Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Home;