// Importing necessary modules and components
import { Box } from "@mui/material";
import Header from "../../components/Header";
import JobNotification from "../../components/JobNotification";

const JobNotificationPage = () => {
  return (
    <Box m="20px">
      <Header title="Job Notification Page " subtitle="Latest Job on Hirehub" />
      <Box height="75vh">
        <JobNotification />
      </Box>
    </Box>
  );
};

export default JobNotificationPage;