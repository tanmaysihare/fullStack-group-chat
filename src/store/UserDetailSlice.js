import { createSlice } from "@reduxjs/toolkit";

const UserDetailSlice = createSlice({
    name: "userDetail",
    initialState:{
        userName: "",
        currentGroupId: "",
        currentGroupName:"",

    },
    reducers:{
        enterUserName: (state,action) => {
            state.userName = action.payload.userName;
        },
        enterCurrentGroupId: (state,action) => {
            state.currentGroupId = action.payload.currentGroupId;
            state.currentGroupName = action.payload.currentGroupName;
        },
        deleteUserName: (state) => {
            state.userName = "";
        },
        deleteCurrentGroupId: (state) => {
            state.currentGroupId = "";
            state.currentGroupName = "";
        },     
    }
});

export const userDetailAction = UserDetailSlice.actions;

export default UserDetailSlice.reducer;