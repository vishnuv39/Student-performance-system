// src/components/Navbar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Navbar = ({ toggleDarkMode, darkMode, showMenu, onMenuClick }) => {
  const { role, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <AppBar position="fixed" elevation={0} className="glass" sx={{ left: '260px', width: 'calc(100% - 260px)' }}>

      <Toolbar sx={{ display: 'flex', gap: 2 }}>
        {showMenu && (
          <IconButton edge="start" color="inherit" onClick={onMenuClick} aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" className="navbar-title" sx={{ flexGrow: 1 }}>
          Student Performance
        </Typography>


        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
          <Typography variant="body2" sx={{ minWidth: 44, textAlign: 'right' }}>
            {darkMode ? 'Dark' : 'Light'}
          </Typography>

          {currentUser ? (
            <>
              <Button variant="text" sx={{ textTransform: 'none', color: 'inherit' }} onClick={() => navigate(currentUser && role === 'student' ? '/student' : '/admin')}>
                <Avatar sx={{ width: 32, height: 32, mr: 1 }}>{currentUser?.[0]?.toUpperCase() || 'U'}</Avatar>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ lineHeight: 1 }}>{currentUser}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>{role}</Typography>
                </Box>
              </Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

