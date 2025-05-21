import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkIcon from "@mui/icons-material/Work";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import StarIcon from "@mui/icons-material/Star";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* ROW 1 - Stats */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        mt="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,234"
            subtitle="Profiles Completed"
            progress="0.70"
            increase="+12%"
            icon={
              <AccountCircleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="867"
            subtitle="Resumes Generated"
            progress="0.60"
            increase="+18%"
            icon={
              <DescriptionIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="56"
            subtitle="Jobs Posted"
            progress="0.45"
            increase="+9%"
            icon={
              <WorkIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="3,215"
            subtitle="Applications Received"
            progress="0.85"
            increase="+32%"
            icon={
              <HowToRegIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>

      {/* ROW 2 & 3 */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="300px"
        gap="20px"
        mt="20px"
        
      >
        {/* Revenue Line Chart */}
        <Box
          gridColumn="span 8"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="20px"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Trendy skills
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                78% of users prefer this
              </Typography>
            </Box>
            <IconButton>
              <DownloadOutlinedIcon
                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
              />
            </IconButton>
          </Box>
          <Box height="230px" mt="-20px">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

      {/* Top Student Scores */}
<Box
  gridColumn="span 4"
  gridRow="span 1"
  backgroundColor={colors.primary[400]}
  overflow="auto"
>
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    borderBottom={`4px solid ${colors.primary[500]}`}
    p="15px"
  >
    <Typography
      color={colors.grey[100]}
      variant="h5"
      fontWeight="600"
    >
      Top Student Scores
    </Typography>
  </Box>

  {[
    { id: 124, rank: 1, name: "Julia Leach", score: 61.34 },
    { id: 1203, rank: 2, name: "Dylan Marquez", score: 53.41 },
    { id: 538, rank: 3, name: "Kelly Griffith", score: 51.48 },
    { id: 895, rank: 4, name: "Michael Johnson", score: 51.41 },
    { id: 1417, rank: 5, name: "Leah Gomez", score: 50.74 },
  ].map((student) => {
    // Smart mapping: score determines stars (0-100 scale into 1-5 stars)
    let stars = 1;
    if (student.score > 80) stars = 5;
    else if (student.score > 60) stars = 4;
    else if (student.score > 40) stars = 3;
    else if (student.score > 20) stars = 2;

    return (
      <Box
        key={student.id}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[500]}`}
        p="15px"
      >
        <Box>
          <Typography
            color={colors.greenAccent[500]}
            variant="h5"
            fontWeight="600"
          >
            {student.rank}. {student.name}
          </Typography>
          <Typography color={colors.grey[100]}>
            Student ID: {student.id}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography color={colors.grey[100]} fontWeight="bold">
            {student.score}
          </Typography>
          <Box ml={1} display="flex">
            {Array.from({ length: stars }).map((_, i) => (
              <StarIcon
                key={i}
                sx={{ color: "#FFD700", fontSize: "20px", ml: "2px" }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    );
  })}
</Box>



        {/* Median Package Info */}
<Box
  gridColumn="span 4"
  backgroundColor={colors.primary[400]}
  p="30px"
>
  <Typography variant="h5" fontWeight="600">
    Median Package
  </Typography>
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    mt="25px"
  >
    <ProgressCircle size="125" />
    <Typography
      variant="h5"
      color={colors.greenAccent[500]}
      sx={{ mt: "15px" }}
    >
      ₹7.5 LPA
    </Typography>
    <Typography>
      Based on current batch placement statistics
    </Typography>
  </Box>
</Box>


        {/* Sales Quantity - Bar Chart */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600" sx={{ mb: "10px" }}>
            Skills
          </Typography>
          <Box height="200px" mt="-10px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        {/* Publication Distribution - Pie Chart */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600" sx={{ mb: "15px" }}>
            Publication Distribution
          </Typography>
          <Box height="200px">
            <PieChart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;