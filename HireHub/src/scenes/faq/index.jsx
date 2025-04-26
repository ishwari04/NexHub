import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions - Student Placements" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How do I register for campus placements?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can register through the placement portal using your student credentials. Make sure to complete your profile and upload your updated resume.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What is the eligibility criteria for sitting in placement drives?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Most companies require a minimum CGPA of 6.0, no active backlogs, and consistent academic performance. Specific criteria vary by company.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Can I sit for more than one company’s placement process?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, but only until you receive an offer. After that, you may be restricted from appearing in other placement drives depending on the placement policy.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What should I include in my resume for placements?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Highlight your academic background, technical skills, projects, internships, achievements, and extracurricular activities. Tailor your resume to suit the job role you're applying for.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I prepare for technical interviews?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Practice data structures and algorithms, study core subjects, work on problem-solving platforms like LeetCode or HackerRank, and revise your project work and resume thoroughly.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
