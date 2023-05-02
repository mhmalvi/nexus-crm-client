import { createSlice } from "@reduxjs/toolkit";

// const companyId = Storage.getItem("")

// const fetchUserById = createAsyncThunk(
//   `${process.env?.REACT_APP_COMPANY_URL}/api/company/${companyId}/details`,
//   async (companyId, thunkAPI) => {
//     const response = await userAPI.fetchById(userId);
//     return response.data;
//   }
// );

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
