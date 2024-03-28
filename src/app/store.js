import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import messagesReducer from "../features/user/messagesSlice";
import notificationsReducer from "../features/user/notificationSlice";
import leadsReducer from "../features/Leads/leadsSlice";
import campaignsReducer from "../features/Leads/campaignSlice";
import mailReducer from "../Pages/Gmail/features/mailSlice";
import mailUserReducer from "../Pages/Gmail/features/mailUserSlice";
import companyReducer from "../features/Company/companySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    leads: leadsReducer,
    messages: messagesReducer,
    notifications: notificationsReducer,
    campaigns: campaignsReducer,
    mail: mailReducer,
    mailUser: mailUserReducer,
    company: companyReducer,
  },
  devTools: process.env.REACT_APP_PRODUCTION ? true : false,
});
