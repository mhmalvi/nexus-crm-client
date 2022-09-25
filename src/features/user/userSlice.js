import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userInfo: {
    role: localStorage.getItem("role"),
    firstName: "Sourav",
    lastName: "Sen",
    email: "a@gmail.com",
    contact: "01756414858",
    avatar:
      "https://png.pngtree.com/png-clipart/20190924/original/pngtree-businessman-user-avatar-free-vector-png-image_4827807.jpg",
    userId: parseInt(localStorage.getItem("userId")),
    room: parseInt(localStorage.getItem("room")),
  },

  userToken: null,
  error: null,
  success: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserDetails: (state) => {
      console.log(state);
    },
    updateUserDetails: (state) => {
      state.value -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUserDetails, updateUserDetails } = userSlice.actions;

export default userSlice.reducer;
