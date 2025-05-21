import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

// Trendy IT Skill Data (with ups and downs)
const skillTrendData = [
  {
    id: "React",
    color: "hsl(205, 70%, 50%)",
    data: [
      { x: "Jan", y: 60 },
      { x: "Feb", y: 90 },
      { x: "Mar", y: 85 },
      { x: "Apr", y: 95 },
      { x: "May", y: 130 },
      { x: "Jun", y: 125 },
    ],
  },
  {
    id: "Node.js",
    color: "hsl(100, 70%, 50%)",
    data: [
      { x: "Jan", y: 40 },
      { x: "Feb", y: 70 },
      { x: "Mar", y: 60 },
      { x: "Apr", y: 95 },
      { x: "May", y: 90 },
      { x: "Jun", y: 100 },
    ],
  },
  {
    id: "Python",
    color: "hsl(45, 90%, 55%)",
    data: [
      { x: "Jan", y: 80 },
      { x: "Feb", y: 100 },
      { x: "Mar", y: 120 },
      { x: "Apr", y: 110 },
      { x: "May", y: 140 },
      { x: "Jun", y: 135 },
    ],
  },
  {
    id: "AWS",
    color: "hsl(15, 80%, 50%)",
    data: [
      { x: "Jan", y: 30 },
      { x: "Feb", y: 50 },
      { x: "Mar", y: 60 },
      { x: "Apr", y: 55 },
      { x: "May", y: 80 },
      { x: "Jun", y: 75 },
    ],
  },
  {
    id: "Docker",
    color: "hsl(270, 70%, 60%)",
    data: [
      { x: "Jan", y: 20 },
      { x: "Feb", y: 40 },
      { x: "Mar", y: 35 },
      { x: "Apr", y: 50 },
      { x: "May", y: 70 },
      { x: "Jun", y: 60 },
    ],
  },
];

const LineChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveLine
      data={skillTrendData}
      theme={{
        axis: {
          domain: { line: { stroke: colors.grey[100] } },
          ticks: {
            line: { stroke: colors.grey[100], strokeWidth: 1 },
            text: { fill: colors.grey[100], fontSize: 12 },
          },
          legend: { text: { fill: colors.grey[100] } },
        },
        legends: {
          text: { fill: colors.grey[100], fontWeight: "bold" },
        },
        tooltip: {
          container: {
            background: colors.primary[400],
            color: colors.grey[100],
            fontSize: 14,
            borderRadius: 5,
            padding: "10px",
          },
        },
      }}
      colors={{ scheme: "nivo" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Search Interest",
        legendOffset: -50,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={true}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={3}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          translateX: 100,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: colors.grey[100],
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: colors.primary[600],
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
