import { createSlice, current } from "@reduxjs/toolkit";

const initialState = { messages: [] };

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessages: (state, actions) => {
      console.log("current(state)", current(state));
      state.messages = actions.payload;
      console.log(state.messages);
    },
  },
});

export default messagesSlice.reducer;
// Action creators are generated for each case reducer function
export const { addMessages } = messagesSlice.actions;
