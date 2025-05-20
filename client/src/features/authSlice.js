import { createSlice } from "@reduxjs/toolkit";


// Initial State
const initialState = {
    user: null,
    isAuthenticated: false,
    email: "",
    role: "student",
};

 
const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        // user log in (method/function)
        userLoggedIn: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },

        // send otp
        userSendOtp: (state, action) => {
            state.email = action.payload.email;
            state.role = action.payload.role;
        },

        // user logout (method/function)
        userLogout: (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
})


export const { userLoggedIn, userSendOtp, userLogout } = authSlice.actions;

export default authSlice.reducer;

