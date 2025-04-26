import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Info } from "../../data/student_info.js"; // Make sure this contains your unchanged student data

const Students = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "CGPA",
      headerName: "CGPA",
      type: "number",
      width: 100,
    },
    {
      field: "College",
      headerName: "College",
      flex: 1,
    },
    {
      field: "College Year",
      headerName: "College Year",
      type: "number",
      width: 120,
    },
    {
      field: "Experience",
      headerName: "Experience (Years)",
      type: "number",
      width: 160,
    },
    {
      field: "LeetCode Score",
      headerName: "LeetCode Score",
      type: "number",
      width: 150,
    },
  ];
  
  return (
    <Box m="20px">
      <Header title="Students" subtitle="Placement-Oriented Student Data Overview" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={Info.map((row, index) => ({ id: index + 1, ...row }))}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Students;
