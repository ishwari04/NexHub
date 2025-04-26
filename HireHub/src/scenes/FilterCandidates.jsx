import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import "../FilterCandidate.css"; // Assuming you have a CSS file for styles
import { useNavigate } from "react-router-dom";
import DownloadCSV from "../DownloadCSV";


const cgpaOptions = [
  { value: 6, label: "6.0 and above" },
  { value: 6.5, label: "6.5 and above" },
  { value: 7, label: "7.0 and above" },
  { value: 7.5, label: "7.5 and above" },
  { value: 8, label: "8.0 and above" },
  { value: 8.5, label: "8.5 and above" },
  { value: 9, label: "9.0 and above" },
];

const skillOptions = [
  { value: "Cloud Computing", label: "Cloud Computing" },
  { value: "Machine Learning", label: "Machine Learning" },
  { value: "Python", label: "Python" },
  { value: "Java", label: "Java" },
  { value: "C++", label: "C++" },
  { value: "SQL", label: "SQL" },
  { value: "Web Development", label: "Web Development" },
  { value: "Cybersecurity", label: "Cybersecurity" },
];

const collegeOptions = [
  { value: "Anna University", label: "Anna University" },
  { value: "BITS Pilani", label: "BITS Pilani" },
  { value: "NIT Rourkela", label: "NIT Rourkela" },
  { value: "IIT Bombay", label: "IIT Bombay" },
  { value: "Symbiosis International University", label: "Symbiosis International University" },
  { value: "Manipal University", label: "Manipal University" },
];

const languageOptions = [
  { value: "German", label: "German" },
  { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
];

const collegeYearOptions = [
  { value: 1, label: "1st Year" },
  { value: 2, label: "2nd Year" },
  { value: 3, label: "3rd Year" },
  { value: 4, label: "4th Year" },
];

// Updated styles for react-select to match the HR-themed background
const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: state.isFocused ? 'rgba(79, 172, 254, 0.8)' : 'rgba(200, 200, 200, 0.4)',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(79, 172, 254, 0.3)' : 'none',
    '&:hover': {
      borderColor: 'rgba(79, 172, 254, 0.6)',
    },
    borderRadius: '12px',
    padding: '2px',
    color: '#333',
    transition: 'all 0.3s ease'
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(12px)',
    borderRadius: '12px',
    border: '1px solid rgba(200, 200, 200, 0.3)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    zIndex: 10
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? 'rgba(79, 172, 254, 0.2)' 
      : state.isFocused 
        ? 'rgba(79, 172, 254, 0.1)' 
        : 'transparent',
    color: state.isSelected ? '#2a2a72' : '#555',
    fontWeight: state.isSelected ? '600' : '400',
    '&:active': {
      backgroundColor: 'rgba(79, 172, 254, 0.3)',
    },
    transition: 'all 0.2s ease'
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(79, 172, 254, 0.15)',
    borderRadius: '6px',
    border: '1px solid rgba(79, 172, 254, 0.3)'
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#2a2a72',
    fontWeight: '500'
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#2a2a72',
    '&:hover': {
      backgroundColor: 'rgba(79, 172, 254, 0.3)',
      color: '#2a2a72'
    }
  }),
  input: (provided) => ({
    ...provided,
    color: '#333'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'rgba(85, 85, 85, 0.7)'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#2a2a72'
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(200, 200, 200, 0.5)'
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'rgba(79, 172, 254, 0.8)',
    '&:hover': {
      color: 'rgba(79, 172, 254, 1)'
    }
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: 'rgba(150, 150, 150, 0.8)',
    '&:hover': {
      color: 'rgba(150, 150, 150, 1)'
    }
  })
};

const FilterCandidates = () => {
    const navigate = useNavigate();
  const [selectedCgpa, setSelectedCgpa] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedCollegeYears, setSelectedCollegeYears] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleFilter = async () => {
    const filters = {
      cgpa: selectedCgpa?.value || null,
      skills: selectedSkills.map(s => s.value),
      colleges: selectedColleges.map(c => c.value),
      languages: selectedLanguages.map(l => l.value),
      collegeYears: selectedCollegeYears.map(y => y.value),
    };

    setIsLoading(true);
    setSearchPerformed(true);
    
    try {
      const response = await axios.post("http://127.0.0.1:5000/filter-candidates", filters);
      console.log("Response Data:", response.data);
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="root">
      <div className="header">
        <span style={{ position: 'relative', display: 'inline-block' }}>
          Find Your Best Match!
          <span style={{ 
            content: '',
            position: 'absolute',
            bottom: '-10px',
            left: '0',
            height: '3px',
            width: '100%',
            background: 'linear-gradient(to right, #4facfe, #00f2fe)',
            borderRadius: '3px'
          }}></span>
        </span>
      </div>
      
      <div className="filter-container">
        <h2>Candidate Filters</h2>
        
        <div className="filter-group">
          <label>CGPA</label>
          <Select 
            options={cgpaOptions} 
            onChange={setSelectedCgpa} 
            isClearable 
            styles={selectStyles}
            className="css-2b097c-container"
            placeholder="Select minimum CGPA..."
          />
        </div>

        <div className="filter-group">
          <label>Skills</label>
          <Select 
            options={skillOptions} 
            onChange={setSelectedSkills} 
            isMulti 
            styles={selectStyles}
            className="css-2b097c-container"
            placeholder="Select required skills..."
          />
        </div>

        <div className="filter-group">
          <label>Colleges</label>
          <Select 
            options={collegeOptions} 
            onChange={setSelectedColleges} 
            isMulti 
            styles={selectStyles}
            className="css-2b097c-container"
            placeholder="Filter by college..."
          />
        </div>

        <div className="filter-group">
          <label>Languages</label>
          <Select 
            options={languageOptions} 
            onChange={setSelectedLanguages} 
            isMulti 
            styles={selectStyles}
            className="css-2b097c-container"
            placeholder="Select languages..."
          />
        </div>

        <div className="filter-group">
          <label>College Year</label>
          <Select 
            options={collegeYearOptions} 
            onChange={setSelectedCollegeYears} 
            isMulti 
            styles={selectStyles}
            className="css-2b097c-container"
            placeholder="Select year of study..."
          />
        </div>

        <button
          onClick={handleFilter}
          className="search-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <span>Searching...</span>
          ) : (
            <span>Search Candidates</span>
          )}
        </button>
        {candidates.length > 0 && (
  <DownloadCSV candidates={candidates} className="download-btn" />
)}
      </div>

      {isLoading && (
        <div style={{ 
          textAlign: "center", 
          marginTop: "40px", 
          color: "#2a2a72",
          background: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
        }}>
          <p>Searching for the perfect candidates...</p>
        </div>
      )}

      {!isLoading && candidates.length > 0 && (
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
              <p><strong>LeetCode Score:</strong> {candidate.leetcodeScore ? candidate.leetcodeScore : "N/A"}</p>
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
      )}
      
      {!isLoading && searchPerformed && candidates.length === 0 && (
        <div style={{ 
          textAlign: "center", 
          marginTop: "40px", 
          background: "rgba(255, 255, 255, 0.9)",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
          color: "#555"
        }}>
          <p style={{ fontSize: "1.1rem" }}>No candidates match your current filters.</p>
          <p>Try broadening your search criteria for better results.</p>
        </div>
      )}
    </div>
  );
};

export default FilterCandidates;