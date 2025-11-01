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
} from '@mui/material';
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Admin Dashboard – Manage Student Performance
        </Typography>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2, mt: 2 }}>
          <TextField
            label="Student Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Marks (%)"
            name="marks"
            type="number"
            value={form.marks}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Attendance (%)"
            name="attendance"
            type="number"
            value={form.attendance}
            onChange={handleChange}
            fullWidth
          />

          <Button variant="contained" color="primary" type="submit">
            {editMode ? 'Update Student' : 'Add Student'}
          </Button>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Subject</b></TableCell>
                <TableCell><b>Marks</b></TableCell>
                <TableCell><b>Attendance</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.length > 0 ? (
                students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.subject}</TableCell>
                    <TableCell>{student.marks}</TableCell>
                    <TableCell>{student.attendance}</TableCell>
                    <TableCell>
                      <Button color="primary" onClick={() => handleEdit(student)}>Edit</Button>
                      <Button color="error" onClick={() => handleDelete(student.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No records available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
