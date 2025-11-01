import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Paper, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import PerformanceChart from './PerformanceChart';

const StudentDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { students } = useSelector((state) => state.performance);

  // Filter data for the logged-in student
  const userRecords = students.filter((s) => s.name.toLowerCase() === currentUser?.toLowerCase());

  const averageMarks =
    userRecords.length > 0
      ? userRecords.reduce((acc, s) => acc + Number(s.marks), 0) / userRecords.length
      : 0;

  const averageAttendance =
    userRecords.length > 0
      ? userRecords.reduce((acc, s) => acc + Number(s.attendance), 0) / userRecords.length
      : 0;

  // Simple AI-style suggestions
  const getSuggestions = () => {
    let tips = [];
    if (averageMarks < 50) tips.push('Focus more on understanding key concepts.');
    if (averageMarks >= 50 && averageMarks < 75) tips.push('You are doing well! Try solving more practice questions.');
    if (averageMarks >= 75) tips.push('Excellent performance! Keep maintaining consistency.');
    if (averageAttendance < 75) tips.push('Improve your attendance for better learning outcomes.');
    return tips.length ? tips : ['Keep up your efforts! You are on the right path.'];
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Welcome, {currentUser}! 🎓
        </Typography>

        {userRecords.length === 0 ? (
          <Typography align="center" color="text.secondary" sx={{ mt: 2 }}>
            No performance records found yet. Please check with your teacher.
          </Typography>
        ) : (
          <>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Your Performance Overview
              </Typography>
              <PerformanceChart data={userRecords} />
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Insights & Suggestions
              </Typography>
              <List>
                {getSuggestions().map((tip, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`• ${tip}`} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="body1">
                <b>Average Marks:</b> {averageMarks.toFixed(2)}%
              </Typography>
              <Typography variant="body1">
                <b>Average Attendance:</b> {averageAttendance.toFixed(2)}%
              </Typography>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default StudentDashboard;
