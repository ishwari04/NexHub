import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { rawData } from "../data/skills_of_students.js"; // ✅ named import

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Prepare data for nivo chart
  const skillMap = {};

  rawData.forEach((entry) => {
    const skill = entry.Skill;
    const levelKey = `Level ${entry["Skill Level"]}`;

    if (!skillMap[skill]) skillMap[skill] = { skill };
    skillMap[skill][levelKey] = (skillMap[skill][levelKey] || 0) + 1;
  });

  const data = Object.values(skillMap);

  return (
    <ResponsiveBar
      data={data}
      keys={["Level 1", "Level 2", "Level 3"]}
      indexBy="skill"
      margin={{ top: 50, right: 130, bottom: 60, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "set2" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      tooltip={({ id, value, indexValue, color }) => (
        <div
          style={{
            padding: 12,
            background: "#1e1e2f",
            color: "#fff",
            border: `2px solid ${color}`,
            borderRadius: "6px",
            fontSize: "0.85rem",
          }}
        >
          <strong>Skill:</strong> {indexValue} <br />
          <strong>Level:</strong> {id.replace("Level ", "")} <br />
          <strong>Students:</strong> {value}
        </div>
      )}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 30,
        legend: isDashboard ? undefined : "Skill",
        legendPosition: "middle",
        legendOffset: 45,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Number of Students",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      role="application"
      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} students for ${e.indexValue}`
      }
    />
  );
};

export default BarChart;
