import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import messagesReducer from "../features/user/messagesSlice";
import notificationsReducer from "../features/user/notificationSlice";

export const store = configureStore({
  // creating stors for different functionalitites
  reducer: {
    user: userReducer,
    messages: messagesReducer,
    notifications: notificationsReducer,
  },
});
