app.get('/api/candidates/by-role/:role', async (req, res) => {
  const role = req.params.role;
  const session = driver.session();

  try {
    // Get required skills for the specified job role
    const requiredSkills = getRequiredSkillsForRole(role);

    // Build the Cypher query based on required skills
    const result = await session.run(
      `
      // Match candidates who have the required skills for this job role
      MATCH (c:Candidate)-[r:HAS_SKILL]->(s:Skill)
      WHERE s.name IN $requiredSkills
      
      // Group by candidate to collect their skills
      WITH c, collect({name: s.name, level: r.level}) as skills
      
      // Filter candidates who have at least one of each required skill
      WHERE size(skills) >= 1
      
      // Get candidate certifications
      OPTIONAL MATCH (c)-[:HAS_CERTIFICATION]->(cert:Certification)
      WITH c, skills, collect(cert.name) as certifications
      
      // Get candidate publications
      OPTIONAL MATCH (c)-[pub:PUBLISHED]->(p:Publication)
      WITH c, skills, certifications, collect({type: p.type, count: pub.count}) as pubData
      
      // Transform publications into a map
      WITH c, skills, certifications, 
           REDUCE(acc = {}, x IN pubData | 
             CASE WHEN x.type IN KEYS(acc) 
               THEN acc + { [x.type]: acc[x.type] + x.count } 
               ELSE acc + { [x.type]: x.count } 
             END
           ) as publications
      
      // Get candidate internships
      OPTIONAL MATCH (c)-[:HAS_INTERNSHIP]->(i:Internship)
      WITH c, skills, certifications, publications, collect(i.name) as internships
      
      // Get candidate languages
      OPTIONAL MATCH (c)-[speaks:SPEAKS]->(l:Language)
      WITH c, skills, certifications, publications, internships,
           collect({name: l.name, proficiency: speaks.proficiency}) as languages
      
      // Return all candidate information
      RETURN {
        name: c.name,
        college: c.college,
        college_year: c.college_year,
        cgpa: c.cgpa,
        experience: c.experience,
        leetcode_score: c.leetcode_score,
        skills: skills,
        certifications: certifications,
        publications: publications,
        internships: internships,
        languages: languages
      } as candidate
      
      ORDER BY size(skills) DESC
      `,
      { requiredSkills }
    );

    // Extract candidate objects from query results
    const candidates = result.records.map(record => record.get('candidate'));
    res.json(candidates);
  } catch (error) {
    // Handle and log errors
    console.error('Error querying Neo4j:', error);
    res.status(500).json({ error: 'Error retrieving candidates' });
  } finally {
    // Close Neo4j session
    await session.close();
  }
});

// Helper function to map job roles to their required skills
function getRequiredSkillsForRole(role) {
  const skillMap = {
    "Cloud Engineer": ["Cloud Computing", "Python"],
    "Machine Learning Engineer": ["Machine Learning", "Python"],
    "Backend Developer": ["Java", "SQL"],
    "Frontend Developer": ["Web Development", "JavaScript"],
    "Cybersecurity Analyst": ["Cybersecurity", "Python"],
    "Full Stack Developer": ["Web Development", "Java", "SQL"],
    "DevOps Engineer": ["Cloud Computing", "Python", "SQL"],
    "Data Analyst": ["SQL", "Python"],
    "AI Researcher": ["Machine Learning", "Python", "C++"],
    "Software Engineer": ["Java", "C++"],
    "Database Administrator": ["SQL", "Cloud Computing"],
    "Web Designer": ["Web Development"],
    "Python Developer": ["Python"],
    "Java Developer": ["Java"],
    "C++ Developer": ["C++"],
    "Security Engineer": ["Cybersecurity", "C++"],
    "ML Intern": ["Machine Learning"],
    "Tech Support Specialist": ["SQL", "Web Development"],
    "Cloud Intern": ["Cloud Computing"],
    "Web Intern": ["Web Development", "Python"],
    "Junior Data Scientist": ["Machine Learning", "SQL", "Python"],
    "Application Developer": ["Java", "SQL", "Web Development"],
    "Network Security Specialist": ["Cybersecurity", "Cloud Computing"],
    "Cloud Solution Architect": ["Cloud Computing", "Java", "SQL"],
    "Mobile App Developer": ["Java", "Web Development"],
    "System Analyst": ["SQL", "C++"],
    "Penetration Tester": ["Cybersecurity", "Python"],
    "Technical Consultant": ["Cloud Computing", "SQL", "Web Development"],
    "Machine Learning Ops Engineer": ["Machine Learning", "Cloud Computing"],
    "R&D Engineer – AI & Security": ["Machine Learning", "Cybersecurity", "Python"]
  };

  return skillMap[role] || [];
}
