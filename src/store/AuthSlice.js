import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        token: "" || localStorage.getItem("token"),
        isAuthenticated: false || localStorage.getItem("isLoggedIn"),

    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = "";
            state.isAuthenticated = false;
        },
    }
});

export const AuthActions = AuthSlice.actions;

export default AuthSlice.reducer;