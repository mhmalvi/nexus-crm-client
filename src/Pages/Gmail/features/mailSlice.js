import { createSlice } from "@reduxjs/toolkit";

export const mailSlice = createSlice({
    name: 'mail',
    initialState: {
        sendMessageIsOpen : false,
        mailSidebarIsOpen : false,
    },
    reducers: {
        openSendMessage: (state) => {
            state.sendMessageIsOpen = true;
            console.log("Top State", state);
        },
        closeSendMessage: (state) => {
            state.sendMessageIsOpen = false;
            console.log("Bottom State", state);
        },
        expandMailSidebar: (state) => {
            state.mailSidebarIsOpen = true;
            console.log("sidebar State", state);
        },
        ContractMailSidebar: (state) => {
            state.mailSidebarIsOpen = false;
            console.log("sidebar State", state);
        },
    }
});
 export const { openSendMessage, closeSendMessage, expandMailSidebar, ContractMailSidebar } = mailSlice.actions;
 export const selectSendMessageIsOpen = (state) => state.mail.sendMessageIsOpen;
 export const selectMailSidebarIsOpen = (state) => state.mail.mailSidebarIsOpen;
 export default mailSlice.reducer; 