import { useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login"; // Import your login page
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/Invoice";
import Contacts from "./scenes/Contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/Calendar";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <AuthProvider>
      <Routes> 
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
}

// Component to protect routes
const AuthRoutes = () => {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      {!token ? (  // ✅ Check 'token' instead of 'user'
        <>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/line" element={<Line />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/geography" element={<Geography />} />
        </>
      )}
    </Routes>
  );
};


//export default App; this is working really nice but you lost my   <AuthProvider>
//      <Router> {/* ✅ Wrap everything inside Router */}
//        <ColorModeContext.Provider value={colorMode}>
//          <ThemeProvider theme={theme}>
//            <CssBaseline />
//            <div className="app">
//              <Sidebar isSidebar={isSidebar} />
//              <main className="content">
//                <Topbar setIsSidebar={setIsSidebar} />
//                <AuthRoutes />
//              </main>
//            </div>
//          </ThemeProvider>
//        </ColorModeContext.Provider>
//      </Router>
//    </AuthProvider> functionallity of topbar and side bar 