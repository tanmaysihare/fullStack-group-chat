import  React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useSelector, useDispatch} from 'react-redux';
import { SnackbarActions } from '../store/SnackbarSlice';

 function CustomSnackbar() {
  const open = useSelector((state) => state.snackbar.open); 
  const message = useSelector((state) => state.snackbar.message);
  const severity = useSelector((state) => state.snackbar.severity);
  const dispatch = useDispatch();
 

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(SnackbarActions.closeSnackbar());
    
  };

  return (
    <div>
      
      <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default CustomSnackbar;