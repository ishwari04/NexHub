import React from "react";
import { saveAs } from "file-saver";

const DownloadCSV = ({ candidates }) => {
  const exportToCSV = () => {
    if (candidates.length === 0) {
      alert("No data to export!");
      return;
    }

    // Define CSV headers
    const headers = [
      "Name", "CGPA", "College Year", "LeetCode Score", "Skills", 
      "College", "Languages", "Internships", "Certifications", 
      "Research Papers", "Journals", "Conferences"
    ];
    
    // Convert candidate data to CSV format
    const rows = candidates.map(candidate => [
      candidate.name,
      candidate.cgpa,
      candidate.collegeYear,
      candidate.leetcodeScore || "N/A",
      candidate.skills.length > 0 ? candidate.skills.join("; ") : "N/A",
      candidate.college.length > 0 ? candidate.college.join("; ") : "N/A",
      candidate.languages.length > 0 ? candidate.languages.join("; ") : "N/A",
      candidate.internships.length > 0 ? candidate.internships.join("; ") : "N/A",
      candidate.certifications.length > 0 ? candidate.certifications.join("; ") : "N/A",
      candidate.research_paper_count || 0,
      candidate.journal_count || 0,
      candidate.conference_count || 0
    ]);

    // Convert array to CSV string
    const csvContent = [
      headers.join(","), 
      ...rows.map(row => row.map(value => `"${value}"`).join(","))
    ].join("\n");

    // Create CSV Blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "candidates_data.csv");
  };

  return (
    <button onClick={exportToCSV} className="download-button">
      Download CSV
    </button>
  );
};

export default DownloadCSV;
