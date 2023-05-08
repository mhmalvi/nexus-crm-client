import { createSlice } from "@reduxjs/toolkit";

const initialState = { notifications: [] };

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, actions) => {
      state.notifications = actions.payload;
    },
    addNotifications: (state, actions) => {
      state.notifications.push(actions.payload);
    },
    addReminders: (state, actions) => {
      state.notifications.push(actions.payload);
    },
  },
});

export default notificationsSlice.reducer;
// Action creators are generated for each case reducer function
export const { addNotifications, addReminders, setNotifications } =
  notificationsSlice.actions;
