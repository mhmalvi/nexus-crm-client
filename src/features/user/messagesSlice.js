import { createSlice } from "@reduxjs/toolkit";

const initialState = { messages: [] };

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessages: (state, actions) => {
      state.messages = actions.payload;
    },
  },
});

export default messagesSlice.reducer;
// Action creators are generated for each case reducer function
export const { addMessages } = messagesSlice.actions;
