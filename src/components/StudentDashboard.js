// src/components/StudentDashboard.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Paper, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Grid, Card, CardContent } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PerformanceChart from './PerformanceChart';

const StudentDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { students } = useSelector((state) => state.performance);

  const userRecords = students.filter((s) => s.name.toLowerCase() === currentUser?.toLowerCase());

  const averageMarks =
    userRecords.length > 0
      ? userRecords.reduce((acc, s) => acc + Number(s.marks), 0) / userRecords.length
      : 0;

  const averageAttendance =
    userRecords.length > 0
      ? userRecords.reduce((acc, s) => acc + Number(s.attendance), 0) / userRecords.length
      : 0;

  const getSuggestions = () => {
    let tips = [];
    if (averageMarks < 50) tips.push('Focus more on understanding key concepts.');
    if (averageMarks >= 50 && averageMarks < 75) tips.push('You are doing well! Try solving more practice questions.');
    if (averageMarks >= 75) tips.push('Excellent performance! Keep maintaining consistency.');
    if (averageAttendance < 75) tips.push('Improve your attendance for better learning outcomes.');
    return tips.length ? tips : ['Keep up your efforts! You are on the right path.'];
  };

  return (
    <Container sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
      <Paper elevation={3} className="dashboard-container">
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Welcome, {currentUser} 🎓</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Here is your performance snapshot</Typography>

        {userRecords.length === 0 ? (
          <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
            No performance records found yet. Please check with your teacher.
          </Typography>
        ) : (
          <>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={8}>
                <Paper elevation={1} className="glass chart-box">
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Performance Overview</Typography>
                  <PerformanceChart data={userRecords} />
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box className="metrics-row">
                  <Card className="metric-card pulse-on-hover glass">
                    <CardContent>
                      <Typography variant="caption" color="text.secondary">Average Marks</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                        <TrendingUpIcon color="primary" />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>{averageMarks.toFixed(2)}%</Typography>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card className="metric-card pulse-on-hover glass">
                    <CardContent>
                      <Typography variant="caption" color="text.secondary">Average Attendance</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                        <CheckCircleOutlineIcon color="success" />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>{averageAttendance.toFixed(2)}%</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>

                <Paper elevation={0} className="glass suggestion-box pulse-on-hover">
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Insights & Suggestions</Typography>
                  <List dense>
                    {getSuggestions().map((tip, index) => (
                      <ListItem key={index}><ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon><ListItemText primary={tip} /></ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default StudentDashboard;
