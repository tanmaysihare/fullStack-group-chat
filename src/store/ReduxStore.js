import {configureStore} from '@reduxjs/toolkit';
import SnackbarReducer from './SnackbarSlice';
import AuthReducer from './AuthSlice';

const ReduxStore = configureStore({
    reducer: {snackbar: SnackbarReducer, auth: AuthReducer},
})

export default ReduxStore;