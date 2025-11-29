// src/App.js
import React, { useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ThemeProvider, CssBaseline, Drawer, Box } from "@mui/material";

import themeFactory from "./theme";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";          // Admin
import PersonIcon from "@mui/icons-material/Person";          // Student
import BarChartIcon from "@mui/icons-material/BarChart";

import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const { role } = useSelector((state) => state.user);
  const theme = useMemo(() => themeFactory(false), []);

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        paddingTop: 3,
        paddingX: 2,
        color: "#fff",
      }}
    >
      <div className="sidebar-title">
        <DashboardIcon className="sidebar-title-icon" />
        Student Performance
      </div>

      <div style={{ marginTop: 40 }}>
        <a className="sidebar-link" href="/">
          <HomeIcon className="sidebar-icon" />
          Home
        </a>
        {role === "admin" && (
          <a className="sidebar-link" href="/admin">
            <SchoolIcon className="sidebar-icon" />
            Admin Dashboard
          </a>
        )}
        {role === "student" && (
          <a className="sidebar-link" href="/student">
            <PersonIcon className="sidebar-icon" />
            Student Dashboard
          </a>
        )}
      </div>

      <div className="sidebar-logo">
        <BarChartIcon className="sidebar-logo-icon" />
        <span>Performance</span>
      </div>

    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <div className="app-shell">
          <Drawer
            variant="permanent"
            anchor="left"
            PaperProps={{
              sx: {
                width: "350px",
                background: "rgba(0,0,0,0.25)",
                backdropFilter: "blur(20px)",
                borderRight: "1px solid rgba(255,255,255,0.1)",
              },
            }}
          >
            {drawerContent}
          </Drawer>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Login />} />
              {role === "admin" && (
                <Route path="/admin" element={<AdminDashboard />} />
              )}
              {role === "student" && (
                <Route path="/student" element={<StudentDashboard />} />
              )}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
