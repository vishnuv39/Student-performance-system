import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

const Login = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !role || !password) {
      alert('Please fill all fields');
      return;
    }

    // ✅ Create expected password dynamically (case-insensitive)
    const expectedPassword = `KL@${name.trim().toUpperCase()}`;

    if (password.trim().toUpperCase() !== expectedPassword) {
      alert(`Incorrect password!`);
      return;
    }

    // ✅ Login success
    dispatch(login({ name, role }));

    // Redirect based on role
    if (role === 'admin') navigate('/admin');
    else navigate('/student');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Welcome to Student Performance System
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter your name or ID"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Select Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Select Role"
            >
              <MenuItem value="admin">Admin (Teacher)</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
          </FormControl>

          {/* 🔑 Password field */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
