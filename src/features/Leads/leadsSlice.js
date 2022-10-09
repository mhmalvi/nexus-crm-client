import { createSlice } from "@reduxjs/toolkit";

const initialState = { leads: [] };

export const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    addLeads: (state, actions) => {
      // console.log("current(state)", current(state));
      state.leads = actions.payload;
    },
  },
});

export default leadsSlice.reducer;

// Action creators are generated for each case reducer function
export const { addLeads } = leadsSlice.actions;
