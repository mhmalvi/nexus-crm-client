import { createSlice } from "@reduxjs/toolkit";

export const mailUserSlice = createSlice({
    name: 'mailUser',
    initialState: {
        value: null,
    },
    reducers: {
        signin: (state, action) => {
            state.value = action.payload
        },
        signout: (state) => {
            state.value = null
        },
    }
});
 export const { signin, signout } = mailUserSlice.actions;
 export const selectMailUser = (state) => state.mailUser.value;
 export default mailUserSlice.reducer; 