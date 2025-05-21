import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./JobRolePage.css";
import DownloadCSV from "../DownloadCSV";

const JobRolePage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // List of job roles from your requirements
  const jobRoles = [
    "Cloud Engineer", "Machine Learning Engineer", "Backend Developer", 
    "Frontend Developer", "Cybersecurity Analyst", "Full Stack Developer", 
    "DevOps Engineer", "Data Analyst", "AI Researcher", "Software Engineer",
    "Database Administrator", "Web Designer", "Python Developer", 
    "Java Developer", "C++ Developer", "Security Engineer", "ML Intern",
    "Tech Support Specialist", "Cloud Intern", "Web Intern",
    "Junior Data Scientist", "Application Developer", "Network Security Specialist",
    "Cloud Solution Architect", "Mobile App Developer", "System Analyst",
    "Penetration Tester", "Technical Consultant", "Machine Learning Ops Engineer",
    "R&D Engineer – AI & Security"
  ];

  // Filter job roles based on search query
  const filteredJobRoles = searchQuery 
    ? jobRoles.filter(role => role.toLowerCase().includes(searchQuery.toLowerCase()))
    : jobRoles;

  // Map of job roles to required skills
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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // This function would call your backend API that runs Neo4j queries
  const fetchCandidatesByRole = async (role) => {
    setLoading(true);
    try {
      // Use the correct API endpoint from your Flask backend
      const response = await fetch(`http://127.0.0.1:5000/api/candidates/by-role/${encodeURIComponent(role)}`);

      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform the data to match the expected format based on your Flask API response
      const transformedCandidates = data.map(candidate => ({
        name: candidate.name,
        cgpa: candidate.cgpa || "N/A",
        collegeYear: candidate.collegeYear || "N/A",
        leetcodeScore: candidate.leetcodeScore || "N/A",
        skills: candidate.skills || [],
        college: candidate.college || [],
        languages: candidate.languages || [],
        internships: candidate.internships || [],
        certifications: candidate.certifications || [],
        research_paper_count: candidate.research_paper_count || 0,
        journal_count: candidate.journal_count || 0,
        conference_count: candidate.conference_count || 0
      }));
      
      setCandidates(transformedCandidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle selecting a role from the dropdown
  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setSearchQuery(role);
    setIsDropdownOpen(false);
    // Don't fetch candidates yet - wait for search button click
  };
  
  // New function to handle search button click
  const handleSearchCandidates = () => {
    if (selectedRole) {
      fetchCandidatesByRole(selectedRole);
    } else {
      alert("Please select a job role before searching");
    }
  };

  // When the selected role changes, update required skills
  useEffect(() => {
    if (selectedRole) {
      setRequiredSkills(skillMap[selectedRole] || []);
      // Don't fetch candidates automatically - wait for button click
    } else {
      setRequiredSkills([]);
    }
  }, [selectedRole]);

  return (
    <div id="root">
      <div className="header">
        <span>Find Candidates by Job Role</span>
      </div>
      
   
      
      <div className="filter-container">
        <h2>Job Role Search</h2>
        
        {/* Custom searchable dropdown */}
        <div className="custom-dropdown-container" ref={dropdownRef}>
          <label htmlFor="job-search">Select a Job Role:</label>
          <div className="custom-dropdown">
            <input
              id="job-search"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onClick={() => setIsDropdownOpen(true)}
              placeholder="Search or select a job role..."
              className="dropdown-search-input"
            />
            <button 
              className="dropdown-toggle-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              ▼
            </button>
          </div>
          
          {isDropdownOpen && (
            <div className="dropdown-options">
              {filteredJobRoles.length > 0 ? (
                filteredJobRoles.map((role) => (
                  <div 
                    key={role} 
                    className="dropdown-option"
                    onClick={() => handleSelectRole(role)}
                  >
                    {role}
                  </div>
                ))
              ) : (
                <div className="dropdown-no-results">No matching job roles</div>
              )}
            </div>
          )}
        </div>

        {/* Display required skills */}
        {requiredSkills.length > 0 && (
          <div className="required-skills">
            <p><strong>Required Skills:</strong> {requiredSkills.join(", ")}</p>
          </div>
        )}
        
        {/* Add Search Candidates button */}
        <button
          className="search-candidates-btn"
          onClick={handleSearchCandidates}
          disabled={!selectedRole}
        >
          Search Candidates
        </button>
        {candidates.length > 0 && (
  <DownloadCSV candidates={candidates} className="download-btn" />
)}
      </div>

      {/* Display the results */}
      <div className="results-container">
  
        {loading ? (
          <div className="loading">Loading candidates...</div>
        ) : candidates.length > 0 ? (
          <div className="results-container">
            {candidates.map((candidate, index) => (
              <div key={index} className="candidate-card">
                <h4>{candidate.name}</h4>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '15px',
                  borderBottom: '1px solid rgba(200, 200, 200, 0.3)',
                  paddingBottom: '10px'
                }}>
                  <span><strong>CGPA:</strong> {candidate.cgpa}</span>
                  <span><strong>Year:</strong> {candidate.collegeYear}</span>
                </div>
                <p><strong>LeetCode Score:</strong> {candidate.leetcodeScore || "N/A"}</p>
                <p><strong>Skills:</strong> {candidate.skills.length > 0 ? 
                  candidate.skills.map((skill, i) => (
                    <span key={i} style={{
                      display: 'inline-block',
                      backgroundColor: 'rgba(79, 172, 254, 0.1)',
                      padding: '2px 8px',
                      margin: '2px',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      border: '1px solid rgba(79, 172, 254, 0.2)'
                    }}>{skill}</span>
                  )) : "N/A"}
                </p>
                <p><strong>College:</strong> {candidate.college.length > 0 ? candidate.college.join(", ") : "N/A"}</p>
                <p><strong>Languages:</strong> {candidate.languages.length > 0 ? candidate.languages.join(", ") : "N/A"}</p>
                <p><strong>Internships:</strong> {candidate.internships.length > 0 ? candidate.internships.join(", ") : "N/A"}</p>
                <p><strong>Certifications:</strong> {candidate.certifications.length > 0 ? candidate.certifications.join(", ") : "N/A"}</p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginTop: '15px',
                  borderTop: '1px solid rgba(200, 200, 200, 0.3)',
                  paddingTop: '10px',
                  fontSize: '0.9rem',
                  color: '#555'
                }}>
                  <span><strong>Research:</strong> {candidate.research_paper_count || 0}</span>
                  <span><strong>Journals:</strong> {candidate.journal_count || 0}</span>
                  <span><strong>Conferences:</strong> {candidate.conference_count || 0}</span>
                </div>
              </div>
            ))}
          </div>
        ) : selectedRole ? (
          <div className="no-results">
            No candidates found matching this job role.<br />
            <span style={{fontSize: '14px', marginTop: '10px'}}>
              Try selecting a different role or adjusting your criteria.
            </span>
          </div>
        ) : (
         <div className="no-selection">
  Please select a job role to see matching candidates.<br />
  <span className="no-selection-hint">
    Choose from the dropdown to find the perfect candidates!
  </span>
</div>

        )}
      </div>
    </div>
  );
};

export default JobRolePage;