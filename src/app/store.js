import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import messagesReducer from "../features/user/messagesSlice";
import notificationsReducer from "../features/user/notificationSlice";
import leadsReducer from "../features/Leads/leadsSlice";
import campaignsReducer from "../features/Leads/campaignSlice";
import packagesReducer from "../features/utils/packagesSlice";

export const store = configureStore({
  // creating stors for different functionalitites
  reducer: {
    user: userReducer,
    leads: leadsReducer,
    messages: messagesReducer,
    notifications: notificationsReducer,
    campaigns: campaignsReducer,
    packages: packagesReducer,
  },
  devTools: process.env.REACT_APP_PRODUCTION,
});
