import { createSlice } from "@reduxjs/toolkit";

// const fetchPackages = createAsyncThunk(async () => {
//   const response = await handleFetchPackages();
//   console.log(response);
//   return response?.data?.packages;
// });

const initialState = { packages: [] };

export const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    addPackages: (state, actions) => {
      // console.log("current(state)", current(state));
      state.packages = actions.payload;
    },
  },
});

export default packagesSlice.reducer;

// Action creators are generated for each case reducer function
export const { addPackages } = packagesSlice.actions;
