import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import { useSelector } from 'react-redux';

function App() {
  const { role } = useSelector((state) => state.user);
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: { main: darkMode ? '#90caf9' : '#1976d2' },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar toggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />
        <Routes>
          <Route path="/" element={<Login />} />
          {role === 'admin' && <Route path="/admin" element={<AdminDashboard />} />}
          {role === 'student' && <Route path="/student" element={<StudentDashboard />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
