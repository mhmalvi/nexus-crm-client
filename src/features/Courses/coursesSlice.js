import { createSlice } from "@reduxjs/toolkit";

// const fetchCoursesById = createAsyncThunk(
//   "users/fetchByIdStatus",
//   async (userId, thunkAPI) => {
//     const response = await userAPI.fetchById(userId);
//     return response.data;
//   }
// );

const initialState = { campaigns: [] };

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCampaigns: (state, actions) => {
      state.campaigns = actions.payload;
    },
  },
});

export default coursesSlice.reducer;

// Action creators are generated for each case reducer function
export const { addCampaigns } = coursesSlice.actions;
