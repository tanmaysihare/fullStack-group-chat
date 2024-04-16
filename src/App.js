import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Routes,Route} from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { lightGreen } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: lightGreen,
  },
 
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Routes>
      <Route exact path='/' element ={<Welcome/>} />
      <Route path='/login' element ={<Login/>} />
      <Route path='/register' element ={<Register/>} />
    </Routes>
  </ThemeProvider>
  );
}

export default App;
