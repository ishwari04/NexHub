import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import { Button, TextField, Box, Collapse, Typography } from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

const CollapsibleForm = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Formik
      initialValues={{
        skills: [],
        education: [],
        experience: [],
        certification: [],
        languages: [],
        internships: [],
        publications: [],
        projects: [],
      }}
      onSubmit={(values) => {
        console.log("Form Data:", values);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          {/* Skills Section */}
          <Box mb={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => toggleSection("skills")}
              sx={{ mb: 1 }}
            >
              {openSections["skills"] ? "Hide Skills" : "Add Skills"}
            </Button>
            <Collapse in={openSections["skills"]}>
              <FieldArray name="skills">
                {({ push, remove }) => (
                  <Box sx={{ border: "1px solid gray", p: 2, borderRadius: 2 }}>
                    <Typography variant="h6">Skills</Typography>
                    {values.skills.map((_, index) => (
                      <Box key={index} display="flex" gap={2} alignItems="center" mb={1}>
                        <TextField
                          label="Skill Title"
                          name={`skills.${index}.Skill`}
                          fullWidth
                          variant="outlined"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.skills[index].Skill}
                        />
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
                        <Button onClick={() => remove(index)} color="error">
                          Remove
                        </Button>
                      </Box>
                    ))}
                    <Button onClick={() => push({ Skill: "", Skill_Level: 1 })} variant="contained">
                      Add Skill
                    </Button>
                  </Box>
                )}
              </FieldArray>
            </Collapse>
          </Box>

          {/* Education Section */}
          <Box mb={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => toggleSection("education")}
              sx={{ mb: 1 }}
            >
              {openSections["education"] ? "Hide Education" : "Add Education"}
            </Button>
            <Collapse in={openSections["education"]}>
              <FieldArray name="education">
                {({ push, remove }) => (
                  <Box sx={{ border: "1px solid gray", p: 2, borderRadius: 2 }}>
                    <Typography variant="h6">Education</Typography>
                    {values.education.map((_, index) => (
                      <Box key={index} display="flex" flexDirection="column" gap={2} mb={2}>
                        <TextField
                          label="School"
                          name={`education.${index}.school`}
                          fullWidth
                          variant="outlined"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.education[index].school}
                        />
                        <TextField
                          label="Field of Study"
                          name={`education.${index}.fieldOfStudy`}
                          fullWidth
                          variant="outlined"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.education[index].fieldOfStudy}
                        />
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
                        <Button onClick={() => remove(index)} color="error">
                          Remove
                        </Button>
                      </Box>
                    ))}
                    <Button
                      onClick={() => push({ school: "", fieldOfStudy: "", startYear: "", endYear: "" })}
                      variant="contained"
                    >
                      Add Education
                    </Button>
                  </Box>
                )}
              </FieldArray>
            </Collapse>
          </Box>

          {/* Projects Section */}
          <Box mb={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => toggleSection("projects")}
              sx={{ mb: 1 }}
            >
              {openSections["projects"] ? "Hide Projects" : "Add Projects"}
            </Button>
            <Collapse in={openSections["projects"]}>
              <FieldArray name="projects">
                {({ push, remove }) => (
                  <Box sx={{ border: "1px solid gray", p: 2, borderRadius: 2 }}>
                    <Typography variant="h6">Projects</Typography>
                    {values.projects.map((project, index) => (
                      <Box key={index} display="flex" flexDirection="column" gap={2} mb={2}>
                        <TextField
                          label="Project Title"
                          name={`projects.${index}.title`}
                          fullWidth
                          variant="outlined"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={project.title}
                        />
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
                              <Typography variant="subtitle1">Technologies</Typography>
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
                        <Button onClick={() => remove(index)} color="error">
                          Remove Project
                        </Button>
                      </Box>
                    ))}
                    <Button onClick={() => push({ title: "", description: "", link: "", technologies: [] })} variant="contained">
                      Add Project
                    </Button>
                  </Box>
                )}
              </FieldArray>
            </Collapse>
          </Box>

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CollapsibleForm;
