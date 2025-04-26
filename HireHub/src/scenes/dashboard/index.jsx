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

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Download Reports
        </Button>
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

       {/* Recent Resume Generations */}
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
      Recent Resume Generations
    </Typography>
  </Box>
  {mockTransactions.map((item, i) => (
    <Box
      key={`${item.txId}-${i}`}
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
          {item.user}
        </Typography>
        <Typography color={colors.grey[100]}>
          Resume ID: {item.txId}
        </Typography>
      </Box>
      <Typography color={colors.grey[100]}>
        {item.date}
      </Typography>
      <Box
        backgroundColor={colors.greenAccent[500]}
        p="5px 10px"
        borderRadius="4px"
      >
        Status: Generated
      </Box>
    </Box>
  ))}
</Box>

        {/* Campaign Progress */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
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
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>

        {/* Sales Quantity - Bar Chart */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600" sx={{ mb: "10px" }}>
            Sales Quantity
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