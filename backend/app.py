from flask import Flask, request, jsonify
from neo4j import GraphDatabase
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Neo4j Connection
URI = "neo4j+s://706ff358.databases.neo4j.io"
USER = "neo4j"
PASSWORD = "SnywUI0qUAMj8XEej3banhWdE908q7JvVxn4mkOfrSQ"

driver = GraphDatabase.driver(URI, auth=(USER, PASSWORD))

job_role_skills = {
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
}

def get_filtered_candidates(filters):
    query = """
    MATCH (c:Candidate)
    OPTIONAL MATCH (c)-[:HAS_SKILL]->(s:Skill)
    OPTIONAL MATCH (c)-[:SPEAKS]->(l:Language)
    OPTIONAL MATCH (c)-[:STUDIED_AT]->(clg:College)
    OPTIONAL MATCH (c)-[:HAS_INTERNSHIP]->(i:Internship)
    OPTIONAL MATCH (c)-[:HAS_CERTIFICATION]->(cert:Certification)
    
    // Count Publications
    OPTIONAL MATCH (c)-[rj:PUBLISHED]->(j:Publication {type: "Journal"})
    OPTIONAL MATCH (c)-[rrp:PUBLISHED]->(rp:Publication {type: "Research Paper"})
    OPTIONAL MATCH (c)-[rcp:PUBLISHED]->(cp:Publication {type: "Conference Paper"})

    WITH c, 
        COLLECT(DISTINCT s.name) AS skills, 
        COLLECT(DISTINCT l.name) AS languages,
        COLLECT(DISTINCT clg.name) AS college,
        COLLECT(DISTINCT i.name) AS internships,
        COLLECT(DISTINCT cert.name) AS certifications,
            COUNT(DISTINCT rj) AS journal_count,
    COUNT(DISTINCT rrp) AS research_paper_count,
    COUNT(DISTINCT rcp) AS conference_count


    WHERE 
        (c.cgpa >= $cgpa OR $cgpa IS NULL) AND
        (ANY(skill IN $skills WHERE skill IN skills) OR SIZE($skills) = 0) AND
        (ANY(lang IN $languages WHERE lang IN languages) OR SIZE($languages) = 0) AND
        (ANY(clg IN $colleges WHERE clg IN college) OR SIZE($colleges) = 0) AND
        (c.college_year IN $collegeYears OR SIZE($collegeYears) = 0)

    RETURN c.name AS name, c.cgpa AS cgpa, c.college_year AS collegeYear, 
           c.leetcode_score AS leetcodeScore, 
           skills, languages, college, internships, certifications,
           journal_count, research_paper_count, conference_count
    """
    
    params = {
        "cgpa": filters.get("cgpa"),
        "skills": filters.get("skills", []),
        "languages": filters.get("languages", []),
        "colleges": filters.get("colleges", []),
        "collegeYears": filters.get("collegeYears", [])
    }

    with driver.session() as session:
        result = session.run(query, **params)
        return [dict(record) for record in result]
    
from flask import Flask, request, jsonify
from neo4j import GraphDatabase
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Neo4j Connection
URI = "neo4j+s://706ff358.databases.neo4j.io"
USER = "neo4j"
PASSWORD = "SnywUI0qUAMj8XEej3banhWdE908q7JvVxn4mkOfrSQ"

driver = GraphDatabase.driver(URI, auth=(USER, PASSWORD))

# Job role to skills mapping
job_role_skills = {
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
}

def get_filtered_candidates(filters):
    query = """
    MATCH (c:Candidate)
    OPTIONAL MATCH (c)-[:HAS_SKILL]->(s:Skill)
    OPTIONAL MATCH (c)-[:SPEAKS]->(l:Language)
    OPTIONAL MATCH (c)-[:STUDIED_AT]->(clg:College)
    OPTIONAL MATCH (c)-[:HAS_INTERNSHIP]->(i:Internship)
    OPTIONAL MATCH (c)-[:HAS_CERTIFICATION]->(cert:Certification)
    
    // Count Publications
    OPTIONAL MATCH (c)-[rj:PUBLISHED]->(j:Publication {type: "Journal"})
    OPTIONAL MATCH (c)-[rrp:PUBLISHED]->(rp:Publication {type: "Research Paper"})
    OPTIONAL MATCH (c)-[rcp:PUBLISHED]->(cp:Publication {type: "Conference Paper"})
    
    WITH c, 
        COLLECT(DISTINCT s.name) AS skills,
        COLLECT(DISTINCT l.name) AS languages,
        COLLECT(DISTINCT clg.name) AS college,
        COLLECT(DISTINCT i.name) AS internships,
        COLLECT(DISTINCT cert.name) AS certifications,
        COUNT(DISTINCT rj) AS journal_count,
        COUNT(DISTINCT rrp) AS research_paper_count,
        COUNT(DISTINCT rcp) AS conference_count
    
    WHERE 
        (c.cgpa >= $cgpa OR $cgpa IS NULL) AND
        (ANY(skill IN $skills WHERE skill IN skills) OR SIZE($skills) = 0) AND
        (ANY(lang IN $languages WHERE lang IN languages) OR SIZE($languages) = 0) AND
        (ANY(clg IN $colleges WHERE clg IN college) OR SIZE($colleges) = 0) AND
        (c.college_year IN $collegeYears OR SIZE($collegeYears) = 0)
    
    RETURN c.name AS name, c.cgpa AS cgpa, c.college_year AS collegeYear,
        c.leetcode_score AS leetcodeScore,
        skills, languages, college, internships, certifications,
        journal_count, research_paper_count, conference_count
    """
    
    params = {
        "cgpa": filters.get("cgpa"),
        "skills": filters.get("skills", []),
        "languages": filters.get("languages", []),
        "colleges": filters.get("colleges", []),
        "collegeYears": filters.get("collegeYears", [])
    }
    
    with driver.session() as session:
        result = session.run(query, **params)
        return [dict(record) for record in result]

def get_candidates_by_job_role(job_role):
    # Get required skills for the job role
    skills = job_role_skills.get(job_role, [])
    
    # If job role not found in our mapping, return empty list
    if not skills:
        return []
    
    query = """
    MATCH (c:Candidate)
    OPTIONAL MATCH (c)-[:HAS_SKILL]->(s:Skill)
    OPTIONAL MATCH (c)-[:SPEAKS]->(l:Language)
    OPTIONAL MATCH (c)-[:STUDIED_AT]->(clg:College)
    OPTIONAL MATCH (c)-[:HAS_INTERNSHIP]->(i:Internship)
    OPTIONAL MATCH (c)-[:HAS_CERTIFICATION]->(cert:Certification)
    
    // Count Publications
    OPTIONAL MATCH (c)-[rj:PUBLISHED]->(j:Publication {type: "Journal"})
    OPTIONAL MATCH (c)-[rrp:PUBLISHED]->(rp:Publication {type: "Research Paper"})
    OPTIONAL MATCH (c)-[rcp:PUBLISHED]->(cp:Publication {type: "Conference Paper"})
    
    WITH c, 
        COLLECT(DISTINCT s.name) AS skills,
        COLLECT(DISTINCT l.name) AS languages,
        COLLECT(DISTINCT clg.name) AS college,
        COLLECT(DISTINCT i.name) AS internships,
        COLLECT(DISTINCT cert.name) AS certifications,
        COUNT(DISTINCT rj) AS journal_count,
        COUNT(DISTINCT rrp) AS research_paper_count,
        COUNT(DISTINCT rcp) AS conference_count
    
    // Match candidates who have at least one of the required skills
    WHERE ANY(skill IN $required_skills WHERE skill IN skills)
    
    // Score candidates based on how many required skills they have
    WITH c, skills, languages, college, internships, certifications, 
         journal_count, research_paper_count, conference_count,
         SIZE([skill IN skills WHERE skill IN $required_skills]) AS matching_skills_count
    
    // Order by number of matching skills (descending)
    ORDER BY matching_skills_count DESC
    
    RETURN c.name AS name, c.cgpa AS cgpa, c.college_year AS collegeYear,
           c.leetcode_score AS leetcodeScore,
           skills, languages, college, internships, certifications,
           journal_count, research_paper_count, conference_count
    """
    
    params = {
        "required_skills": skills
    }
    
    with driver.session() as session:
        result = session.run(query, **params)
        return [dict(record) for record in result]


@app.route("/filter-candidates", methods=["POST"])
def filter_candidates():
    filters = request.json
    candidates = get_filtered_candidates(filters)
    return jsonify(candidates)

@app.route("/api/candidates/by-role/<job_role>", methods=["GET"])
def candidates_by_role(job_role):
    candidates = get_candidates_by_job_role(job_role)
    return jsonify(candidates)

if __name__ == "__main__":
    app.run(debug=True)
