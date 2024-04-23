import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '../store/AuthSlice';
import { userDetailAction } from '../store/UserDetailSlice';
 function WelcomeNavbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
    const logoutHandler = () => {
        dispatch(AuthActions.logout());
        dispatch(userDetailAction.deleteUserName());
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUserName");
        navigate("/login");
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Group Chat
          </Typography>
         {!isLoggedIn && <Link to="/login"><Button variant='text' sx={{color:"primary.light"}}>Login</Button></Link>} 
         {!isLoggedIn && <Link to="/register"><Button color="primary">Register</Button></Link>}
         {isLoggedIn && <Button variant='outlined' onClick={logoutHandler} sx={{color:"primary.light"}}>Log Out</Button>} 
        </Toolbar>
      </AppBar> 
    </Box>
  );
}

export default WelcomeNavbar;