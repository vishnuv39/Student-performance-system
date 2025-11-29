
// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';

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
    const expectedPassword = `KL@${name.trim().toUpperCase()}`;
    if (password.trim().toUpperCase() !== expectedPassword) {
      alert('Incorrect password!');
      return;
    }
    dispatch(login({ name, role }));
    if (role === 'admin') navigate('/admin');
    else navigate('/student');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={6} sx={{ p: 4 }} className="glass">
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <LockOutlinedIcon sx={{ fontSize: 36, color: 'primary.main' }} />
          <div>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Sign in</Typography>
            <Typography variant="body2" color="text.secondary">Access the Student Performance Dashboard</Typography>
          </div>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
          <TextField
            label="Name or ID"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutlineIcon /></InputAdornment> }}
          />

          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select value={role} label="Role" onChange={(e) => setRole(e.target.value)}>
              <MenuItem value="admin">
                <SchoolIcon style={{ marginRight: "10px" }} />
                Admin / Teacher
              </MenuItem>

              <MenuItem value="student">
                <PersonIcon style={{ marginRight: "10px" }} />
                Student
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><WorkOutlineIcon /></InputAdornment> }}
            helperText='Password format: KL@<YOURNAME> (case-insensitive)'
          />

          <Button variant="contained" type="submit" sx={{ mt: 1, py: 1.2 }}>
            Sign In
          </Button>

          
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
