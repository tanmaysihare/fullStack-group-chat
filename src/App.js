import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Routes,Route} from 'react-router-dom';
import Welcome from './pages/welcome/Welcome';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { lightGreen, lightBlue } from '@mui/material/colors';
import CustomSnackbar from './ui/Snackbar';
import Homepage from './pages/home/Homepage';
import { useSelector } from 'react-redux';
import WelcomeNavbar from './navigation/WelcomeNavbar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: lightGreen[500],
      light: lightGreen[100],
      dark: lightBlue[900],
    },
  },
 
});

function App() {
  const isLogin =  useSelector((state) => state.auth.isAuthenticated);
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <WelcomeNavbar/>
    <CustomSnackbar/>
    <Routes>
      <Route exact path='/' element ={<Welcome/>} />
      <Route path='/login' element ={<Login/>} />
      <Route path='/register' element ={<Register/>} />
     {isLogin && <Route path='/home' element ={<Homepage/>} />} 
    </Routes>
  </ThemeProvider>
  );
}

export default App;
