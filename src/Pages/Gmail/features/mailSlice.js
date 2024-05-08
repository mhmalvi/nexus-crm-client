import { createSlice } from "@reduxjs/toolkit";

export const mailSlice = createSlice({
    name: 'mail',
    initialState: {
        sendMessageIsOpen : false,
        mailSidebarIsOpen : true,
    },
    reducers: {
        openMessageBox: (state) => {
            state.sendMessageIsOpen = true;
        },
        closeMessageBox: (state) => {
            state.sendMessageIsOpen = false;
        },
        expandMailSidebar: (state) => {
            state.mailSidebarIsOpen = true;
        },
        ContractMailSidebar: (state) => {
            state.mailSidebarIsOpen = false;
        },
    }
});
 export const { openMessageBox, closeMessageBox, expandMailSidebar, ContractMailSidebar } = mailSlice.actions;
 export const selectSendMessageIsOpen = (state) => state.mail.sendMessageIsOpen;
 export const selectMailSidebarIsOpen = (state) => state.mail.mailSidebarIsOpen;
 export default mailSlice.reducer; 