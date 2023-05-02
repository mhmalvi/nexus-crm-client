import { createSlice } from "@reduxjs/toolkit";

const initialState = { companyDetails: {} };

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addCompanyDetails: (state, actions) => {
      state.companyDetails = actions.payload;
    },
  },
});

export default companySlice.reducer;

// Action creators are generated for each case reducer function
export const { addCompanyDetails } = companySlice.actions;
