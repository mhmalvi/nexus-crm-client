import { createSlice } from "@reduxjs/toolkit";

const initialState = { notifications: [] };

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotifications: (state) => {
      console.log(state);
    },
  },
});

export default notificationsSlice.reducer;
// Action creators are generated for each case reducer function
export const { addNotifications } = notificationsSlice.actions;
