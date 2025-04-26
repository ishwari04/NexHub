import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { publicationData } from "../data/publications.js"; // Your original data

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Aggregate counts from raw data (without transforming data format)
  let journals = 0;
  let researchPapers = 0;
  let conferencePapers = 0;

  publicationData.forEach((item) => {
    journals += Number(item.Journals) || 0;
    researchPapers += Number(item["Research Paper"]) || 0;
    conferencePapers += Number(item["Conference Paper"]) || 0;
  });

  const total = journals + researchPapers + conferencePapers;

  const data = [
    { id: "Journals", label: "Journals", value: journals },
    { id: "Research Paper", label: "Research Paper", value: researchPapers },
    { id: "Conference Paper", label: "Conference Paper", value: conferencePapers },
  ];

  return (
    <ResponsivePie
      data={data}
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
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      tooltip={({ datum: { id, value } }) => {
        const percentage = ((value / total) * 100).toFixed(2);
        return (
          <div
            style={{
              padding: 10,
              background: "#1f2937",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "#fff",
            }}
          >
            <strong>{id}</strong>
            <br />
            Value: {value}
            <br />
            Percentage: {percentage}%
          </div>
        );
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
