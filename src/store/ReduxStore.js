import { configureStore } from "@reduxjs/toolkit";
import SnackbarReducer from "./SnackbarSlice";
import AuthReducer from "./AuthSlice";
import UserDetailReducer from "./UserDetailSlice";

const ReduxStore = configureStore({
  reducer: {
    snackbar: SnackbarReducer,
    auth: AuthReducer,
    userDetail: UserDetailReducer,
  },
});

export default ReduxStore;
