import { createSlice } from "@reduxjs/toolkit";

const initialState = { notifications: [] };

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotifications: (state, actions) => {
      state.notifications.push(actions.payload);
      // state.notifications = actions.payload;
    },
    addReminders: (state, actions) => {
      // state.notifications.push(actions.payload);
      // state.notifications = actions.payload;
      state.notifications.push(actions.payload);
    },
  },
});

export default notificationsSlice.reducer;
// Action creators are generated for each case reducer function
export const { addNotifications } = notificationsSlice.actions;
