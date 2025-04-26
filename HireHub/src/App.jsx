import { useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterCandidates from "./scenes/FilterCandidates";
import JobRolePage from "./scenes/JobRolePage";

// Pages
import Login from "./components/Login";
import Signup from "./components/Signup";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Students from "./scenes/Students";
import Contacts from "./scenes/Contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";

import Calendar from "./scenes/Calendar";
import Home from "./scenes/Home";

// Job-related Pages
import JobNotificationPage from "./scenes/jobs/JobNotificationPage";

// Admin-only Job Management Pages
import JobListPage from "./scenes/admin_jobs/JobListPage";
import AddJobPage from "./scenes/admin_jobs/JobAddPage";
import EditJobPage from "./scenes/admin_jobs/EditJobPage";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoutes
                    isSidebar={isSidebar}
                    setIsSidebar={setIsSidebar}
                  />
                }
              />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

const ProtectedRoutes = ({ isSidebar, setIsSidebar }) => {
  const { token, user } = useContext(AuthContext);

  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/form" element={<Form />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/line" element={<Line />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/calendar" element={<Calendar />} />
          

          {/* Job Pages (Accessible by both) */}
          <Route path="/job-notification" element={<JobNotificationPage />} />

          {/* Admin-only Job Management Pages */}
          {user?.role === "admin" && (
            <>
              <Route path="/admin/job-list" element={<JobListPage />} />
              <Route path="/admin/job-add" element={<AddJobPage />} />
              <Route path="/admin/job-edit/:jobId" element={<EditJobPage />} />

              <Route path="/filter-candidates" element={<FilterCandidates />} />
              <Route path="/job-based-filtering" element={<JobRolePage />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
};

export default App;
