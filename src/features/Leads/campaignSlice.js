import { createSlice } from "@reduxjs/toolkit";

const initialState = { campaigns: [] };

export const campaignsSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    addCampaigns: (state, actions) => {
      state.campaigns = actions.payload;
    },
  },
});

export default campaignsSlice.reducer;

// Action creators are generated for each case reducer function
export const { addCampaigns } = campaignsSlice.actions;
