import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Paper } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: "40px",
          borderRadius: "10px",
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          maxWidth: "400px",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to HireHub
        </Typography>
        <Typography variant="body1" mb={3}>
          Your smart hiring solution. Log in to access your dashboard.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            backgroundColor: "#222",
            color: "#fff",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#444" },
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
