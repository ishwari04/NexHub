import React, { useEffect, useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import API from "../../api/axiosInstance"; // Import API
import CircularProgress from '@mui/material/CircularProgress';



import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const defaultValues = {
  profilePicture: "",
  bannerImg: "",
  headline: "Hirehub User",
  location: "Earth",
  about: "",
  education: [{ school: "", fieldOfStudy: "", startYear: "", endYear: "" }],
  skills: [{ Skill: "", Skill_Level: 1 }],
  projects: [{ title: "", description: "", link: "", technologies: [""] }],
  experience: [
    { title: "", company: "", startDate: "", endDate: "", description: "" },
  ],
  languages: [{ Foreign_Language: "", Proficiency_Level: 1 }],
  publications: [
    {
      title: "",
      link: "",
      description: "",
      type: "Journal",
      journalOrConference: "",
      authors: "",
      date: "",
    },
  ],
  internships: [
    { title: "", company: "", startDate: "", endDate: "", description: "" },
  ],
  certification: [
    { title: "", company: "", courseDuration: "", issuedDate: "", description: "" },
  ],
  connections: [],
};

const FormComponent = () => {
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [loading, setLoading] = useState(true);

  // Fetch user data on mount
  useEffect(() => {
    API.get("/user/profile")
      .then((res) => {
        setInitialValues({ ...defaultValues, ...res.data.user });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;
  return (
    <Formik
    enableReinitialize
    initialValues={initialValues}
      

      onSubmit={(values, { setSubmitting }) => {
        API.put("/user/profile", values)
          .then((response) => {
            console.log("Success:", response.data);
            alert("Profile submitted successfully!");
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Failed to submit profile.");
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form>
          <Box display="grid" gap={2} maxWidth={600} margin="auto">
            

            {/* Skills Section */}
            <FieldArray name="skills">
              {({ push, remove }) => (
                <Box sx={{ border: "1px solid gray", p: 2, borderRadius: 2 }}>
                  <h3>Skills</h3>
                  {values.skills.map((_, index) => (
                    <Box key={index} display="flex" gap={2} alignItems="center">
                      {/* Skill Title */}
                      <TextField
                        label="Skill Title"
                        name={`skills.${index}.Skill`}
                        fullWidth
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.skills[index].Skill}
                      />

                      {/* Skill Level */}
                      <TextField
                        label="Skill Level (1-3)"
                        name={`skills.${index}.Skill_Level`}
                        type="number"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.skills[index].Skill_Level}
                        inputProps={{ min: 1, max: 3 }}
                        sx={{ width: "120px" }}
                      />

                    
                      {/* Remove Skill Button */}
                      <Button onClick={() => remove(index)} color="error">
                        Remove
                      </Button>
                    </Box>
                  ))}

                  {/* Add Skill Button */}
                  <Button onClick={() => push({ Skill: "", Skill_Level: 1 })} variant="contained">
                    Add Skill
                  </Button>
                </Box>
              )}
            </FieldArray>

            {/* Experience Section */}
            <FieldArray name="education">
  {({ push, remove }) => (
    <Box sx={{ border: "1px solid gray", p: 2, borderRadius: 2 }}>
      <h3>Education</h3>
      {values.education.map((_, index) => (
        <Box key={index} display="flex" flexDirection="column" gap={2} mb={2}>
          {/* School Name */}
          <TextField
            label="School"
            name={`education.${index}.school`}
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.education[index].school}
          />

          {/* Field of Study */}
          <TextField
            label="Field of Study"
            name={`education.${index}.fieldOfStudy`}
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.education[index].fieldOfStudy}
          />

          {/* Start Year */}
          <TextField
            label="Start Year"
            name={`education.${index}.startYear`}
            type="number"
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.education[index].startYear}
            inputProps={{ min: 1900, max: new Date().getFullYear() }}
          />

          {/* End Year */}
          <TextField
            label="End Year"
            name={`education.${index}.endYear`}
            type="number"
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.education[index].endYear}
            inputProps={{ min: 1900, max: new Date().getFullYear() }}
          />

          {/* Remove Education Button */}
          <Button onClick={() => remove(index)} color="error">
            Remove
          </Button>
        </Box>
      ))}

      {/* Add Education Button */}
      <Button
        onClick={() => push({ school: "", fieldOfStudy: "", startYear: "", endYear: "" })}
        variant="contained"
      >
        Add Education
      </Button>
    </Box>
  )}
            </FieldArray>

            {/* Projects Section */}
            <FieldArray name="projects">
  {({ push, remove }) => (
    <Box sx={{ border: "1px solid gray", p: 2, borderRadius: 2 }}>
      <h3>Projects</h3>
      {values.projects.map((project, index) => (
        <Box key={index} display="flex" flexDirection="column" gap={2} mb={2}>
          {/* Project Title */}
          <TextField
            label="Project Title"
            name={`projects.${index}.title`}
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={project.title}
          />

          {/* Project Description */}
          <TextField
            label="Description"
            name={`projects.${index}.description`}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={project.description}
          />

          {/* Project Link */}
          <TextField
            label="Project Link"
            name={`projects.${index}.link`}
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={project.link}
          />

          {/* Technologies Used */}
          <FieldArray name={`projects.${index}.technologies`}>
            {({ push: pushTech, remove: removeTech }) => (
              <Box>
                <h4>Technologies</h4>
                {project.technologies.map((_, techIndex) => (
                  <Box key={techIndex} display="flex" alignItems="center" gap={2}>
                    <TextField
                      label="Technology"
                      name={`projects.${index}.technologies.${techIndex}`}
                      fullWidth
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={project.technologies[techIndex]}
                    />
                    <Button onClick={() => removeTech(techIndex)} color="error">
                      Remove
                    </Button>
                  </Box>
                ))}
                <Button onClick={() => pushTech("")} variant="contained">
                  Add Technology
                </Button>
              </Box>
            )}
          </FieldArray>

          {/* Remove Project Button */}
          <Button onClick={() => remove(index)} color="error">
            Remove Project
          </Button>
        </Box>
      ))}

      {/* Add Project Button */}
      <Button
        onClick={() => push({ title: "", description: "", link: "", technologies: [""] })}
        variant="contained"
      >
        Add Project
      </Button>
    </Box>
  )}
            </FieldArray>

            <FieldArray name="experience">
  {({ push, remove }) => (
    <Box sx={{ border: "1px solid gray", p: 2, borderRadius: 2 }}>
      <h3>Experience</h3>
      {values.experience.map((exp, index) => (
        <Box key={index} display="flex" flexDirection="column" gap={2} mb={2}>
          {/* Job Title */}
          <TextField
            label="Job Title"
            name={`experience.${index}.title`}
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={exp.title}
          />

          {/* Company Name */}
          <TextField
            label="Company"
            name={`experience.${index}.company`}
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={exp.company}
          />

          {/* Start Date */}
          <TextField
            label="Start Date"
            name={`experience.${index}.startDate`}
            type="date"
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={exp.startDate}
            InputLabelProps={{ shrink: true }}
          />

          {/* End Date */}
          <TextField
            label="End Date"
            name={`experience.${index}.endDate`}
            type="date"
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={exp.endDate}
            InputLabelProps={{ shrink: true }}
          />

          {/* Job Description */}
          <TextField
            label="Description"
            name={`experience.${index}.description`}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={exp.description}
          />

          {/* Remove Experience Button */}
          <Button onClick={() => remove(index)} color="error">
            Remove Experience
          </Button>
        </Box>
      ))}

      {/* Add Experience Button */}
      <Button
        onClick={() => push({ title: "", company: "", startDate: "", endDate: "", description: "" })}
        variant="contained"
      >
        Add Experience
      </Button>
    </Box>
  )}
            </FieldArray>

            {/* Languages Section */}
            <FieldArray name="languages">
  {({ push, remove }) => (
    <Box sx={{ border: "1px solid gray", p: 2, borderRadius: 2 }}>
      <h3>Languages</h3>
      {values.languages.map((lang, index) => (
        <Box key={index} display="flex" gap={2} alignItems="center">
          {/* Foreign Language */}
          <TextField
            label="Language"
            name={`languages.${index}.Foreign_Language`}
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={lang.Foreign_Language}
          />

          {/* Proficiency Level */}
          <TextField
            label="Proficiency Level (1-3)"
            name={`languages.${index}.Proficiency_Level`}
            type="number"
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={lang.Proficiency_Level}
            inputProps={{ min: 1, max: 3 }}
            sx={{ width: "120px" }}
          />

          {/* Remove Language Button */}
          <Button onClick={() => remove(index)} color="error">
            Remove
          </Button>
        </Box>
      ))}

      {/* Add Language Button */}
      <Button
        onClick={() => push({ Foreign_Language: "", Proficiency_Level: 1 })}
        variant="contained"
      >
        Add Language
      </Button>
    </Box>
  )}
            </FieldArray>

            {/* Publications Section */}
            <FieldArray name="publications">
  {({ push, remove }) => (
    <Box sx={{ border: "1px solid gray", p: 2, borderRadius: 2 }}>
      <h3>Publications</h3>
      {values.publications.map((pub, index) => (
        <Box key={index} display="flex" flexDirection="column" gap={2} mb={2}>
          {/* Title (Required) */}
          <TextField
            label="Title"
            name={`publications.${index}.title`}
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={pub.title}
          />

          {/* Link (Optional) */}
          <TextField
            label="Publication Link"
            name={`publications.${index}.link`}
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={pub.link}
          />

          {/* Description (Optional) */}
          <TextField
            label="Description"
            name={`publications.${index}.description`}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={pub.description}
          />

          {/* Type of Publication (Required) */}
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              name={`publications.${index}.type`}
              value={pub.type}
              onChange={handleChange}
              
              variant="outlined"
            >
              <MenuItem value="Journal">Journal</MenuItem>
              <MenuItem value="Research Paper">Research Paper</MenuItem>
              <MenuItem value="Conference Paper">Conference Paper</MenuItem>
            </Select>
          </FormControl>

          {/* Journal or Conference Name (Optional) */}
          <TextField
            label="Journal/Conference Name"
            name={`publications.${index}.journalOrConference`}
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={pub.journalOrConference}
          />

          {/* Authors (Required) */}
          <TextField
            label="Authors (comma separated)"
            name={`publications.${index}.authors`}
            fullWidth
            
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={pub.authors}
          />

          {/* Date (Required) */}
          <TextField
            label="Publication Date"
            name={`publications.${index}.date`}
            type="date"
            fullWidth
            
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={pub.date}
            InputLabelProps={{ shrink: true }}
          />

          {/* Remove Publication Button */}
          <Button onClick={() => remove(index)} color="error">
            Remove Publication
          </Button>
        </Box>
      ))}

      {/* Add Publication Button */}
      <Button
        onClick={() =>
          push({
            title: "",
            link: "",
            description: "",
            type: "Journal",
            journalOrConference: "",
            authors: "",
            date: "",
          })
        }
        variant="contained"
      >
        Add Publication
      </Button>
    </Box>
  )}
            </FieldArray>

            {/* Internships Section */}
            <FieldArray name="internships">
  {({ push, remove }) => (
    <Box sx={{ border: "1px solid gray", p: 2, borderRadius: 2 }}>
      <h3>Internships</h3>
      {values.internships.map((internship, index) => (
        <Box key={index} display="flex" flexDirection="column" gap={2} mb={2}>
          {/* Internship Title */}
          <TextField
            label="Internship Title"
            name={`internships.${index}.title`}
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={internship.title}
          />

          {/* Company Name */}
          <TextField
            label="Company"
            name={`internships.${index}.company`}
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={internship.company}
          />

          {/* Start Date */}
          <TextField
            label="Start Date"
            name={`internships.${index}.startDate`}
            type="date"
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={internship.startDate}
            InputLabelProps={{ shrink: true }}
          />

          {/* End Date */}
          <TextField
            label="End Date"
            name={`internships.${index}.endDate`}
            type="date"
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={internship.endDate}
            InputLabelProps={{ shrink: true }}
          />

          {/* Internship Description */}
          <TextField
            label="Description"
            name={`internships.${index}.description`}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={internship.description}
          />

          {/* Remove Internship Button */}
          <Button onClick={() => remove(index)} color="error">
            Remove Internship
          </Button>
        </Box>
      ))}

      {/* Add Internship Button */}
      <Button
        onClick={() =>
          push({ title: "", company: "", startDate: "", endDate: "", description: "" })
        }
        variant="contained"
      >
        Add Internship
      </Button>
    </Box>
  )}
            </FieldArray>

            {/* Certification Section */}
            <FieldArray name="certification">
  {({ push, remove }) => (
    <Box sx={{ border: "1px solid gray", p: 2, borderRadius: 2 }}>
      <h3>Certifications</h3>
      {values.certification.map((cert, index) => (
        <Box key={index} display="flex" flexDirection="column" gap={2} mb={2}>
          {/* Certification Title */}
          <TextField
            label="Certification Title"
            name={`certification.${index}.title`}
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={cert.title}
          />

          {/* Company/Issuing Organization */}
          <TextField
            label="Issuing Organization"
            name={`certification.${index}.company`}
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={cert.company}
          />

          {/* Course Duration (in months) */}
          <TextField
            label="Course Duration (months)"
            name={`certification.${index}.courseDuration`}
            type="number"
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={cert.courseDuration}
            inputProps={{ min: 1 }}
          />

          {/* Issued Date */}
          <TextField
            label="Issued Date"
            name={`certification.${index}.issuedDate`}
            type="date"
            fullWidth
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={cert.issuedDate}
            InputLabelProps={{ shrink: true }}
          />

          {/* Description */}
          <TextField
            label="Description"
            name={`certification.${index}.description`}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={cert.description}
          />

          {/* Remove Certification Button */}
          <Button onClick={() => remove(index)} color="error">
            Remove Certification
          </Button>
        </Box>
      ))}

      {/* Add Certification Button */}
      <Button
        onClick={() =>
          push({ title: "", company: "", courseDuration: "", issuedDate: "", description: "" })
        }
        variant="contained"
      >
        Add Certification
      </Button>
    </Box>
  )}
            </FieldArray>


            {/* Connections Section */}
            
            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
