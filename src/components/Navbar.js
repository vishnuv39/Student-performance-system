import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const { role, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Student Performance System
        </Typography>
        <Switch checked={darkMode} onChange={toggleDarkMode} />
        <Typography variant="body2" sx={{ mr: 2 }}>
          {darkMode ? 'Dark' : 'Light'}
        </Typography>
        {currentUser && (
          <>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Hello, {currentUser} ({role})
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
