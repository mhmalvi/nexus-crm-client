import { createSlice } from "@reduxjs/toolkit";

const initialState = { leads: [] };

export const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    addLeads: (state, actions) => {
      state.leads = actions.payload;
    },
  },
});
export const { addLeads } = leadsSlice.actions;

export default leadsSlice.reducer;
