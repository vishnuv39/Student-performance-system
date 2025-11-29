// src/components/AdminDashboard.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Grid,
  Chip,
  IconButton,
  Fab
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { addStudent, updateStudent, deleteStudent } from '../redux/performanceSlice';
import { v4 as uuidv4 } from 'uuid';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.performance);

  const [form, setForm] = useState({
    id: '',
    name: '',
    subject: '',
    marks: '',
    attendance: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.subject || !form.marks || !form.attendance) {
      alert('Please fill all fields');
      return;
    }
    if (editMode) {
      dispatch(updateStudent(form));
      setEditMode(false);
    } else {
      dispatch(addStudent({ ...form, id: uuidv4() }));
    }
    setForm({ id: '', name: '', subject: '', marks: '', attendance: '' });
    setShowForm(false);
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }} className="glass">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <div>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Admin Dashboard</Typography>
            <Typography variant="body2" color="text.secondary">Manage student performance records</Typography>
          </div>
          <Box>
            <Fab color="primary" size="small" aria-label="add" onClick={() => setShowForm((v) => !v)}>
              <AddIcon />
            </Fab>
          </Box>
        </Box>

        {/* Form */}
        {showForm && (
          <Paper elevation={2} sx={{ p: 3 }} className="floating-form glass">
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField label="Student Name" name="name" value={form.name} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField label="Subject" name="subject" value={form.subject} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField label="Marks (%)" name="marks" type="number" value={form.marks} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField label="Attendance (%)" name="attendance" type="number" value={form.attendance} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12} md={1} sx={{ display: 'flex', alignItems: 'center' }}>
                <Button variant="contained" type="submit" onClick={handleSubmit} sx={{ width: '100%' }}>
                  {editMode ? 'Update' : 'Save'}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Table */}
        <Box sx={{ mt: 3 }}>
          <TableContainer component={Paper} elevation={0} className="glass">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Subject</b></TableCell>
                  <TableCell><b>Marks</b></TableCell>
                  <TableCell><b>Attendance</b></TableCell>
                  <TableCell align="right"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <TableRow key={student.id} hover className="pulse-on-hover">
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.subject}</TableCell>
                      <TableCell>
                        <Chip label={`${student.marks}%`} color={Number(student.marks) >= 75 ? 'success' : 'default'} />
                      </TableCell>
                      <TableCell>
                        <Chip label={`${student.attendance}%`} variant="outlined" color={Number(student.attendance) >= 75 ? 'success' : 'default'} />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton color="primary" onClick={() => handleEdit(student)}><EditIcon /></IconButton>
                        <IconButton color="error" onClick={() => handleDelete(student.id)}><DeleteIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography color="text.secondary">No records available — add some students to get started.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;