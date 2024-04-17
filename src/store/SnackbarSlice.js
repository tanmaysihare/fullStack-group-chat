import { createSlice } from "@reduxjs/toolkit";

const SnackbarSlice = createSlice({
    name: "snackbar",
    initialState: {
        open: false,
        message: "",
        severity: "",
    },
    reducers: {
        openSnackbar: (state, action) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        closeSnackbar: (state) => {
            state.open = false;
            state.message = "";
            state.severity = "";
        },
    },
});

export const SnackbarActions = SnackbarSlice.actions;

export default SnackbarSlice.reducer;