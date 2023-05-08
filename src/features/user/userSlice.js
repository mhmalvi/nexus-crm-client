import { createSlice } from "@reduxjs/toolkit";
import { Storage } from "../../Components/Shared/utils/store";

const initialState = {
  loading: false,
  userInfo: Storage.getItem("user_info"),
  // userInfo: {
  //   role: localStorage.getItem("role"),
  //   firstName: localStorage.getItem("firstName"),
  //   lastName: localStorage.getItem("lastName"),
  //   email: "a@gmail.com",
  //   client_id: 2,
  //   contact: "01756414858",
  //   avatar:
  //     "https://png.pngtree.com/png-clipart/20190924/original/pngtree-businessman-user-avatar-free-vector-png-image_4827807.jpg",
  //   userId: parseInt(localStorage.getItem("userId")),
  //   room: parseInt(localStorage.getItem("room")),
  // },
  userToken: null,
  fbToken: Storage.getItem("fac_t"),
  error: null,
  success: false,
};

// if (initialState.userInfo) {
//   initialState.userInfo.client_id = 2;
// }

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserDetails: (state, actions) => {
      console.log(actions.payload);
      state.userInfo = actions.payload;

      // Storage.setItem("user_info", actions?.payload?.data[0]);
      // Storage.setItem("auth_tok", actions?.payload?.token);
      // state.userInfo.client_id = 2;
    },
    updateUserDetails: (state) => {
      state.value -= 1;
    },
    updateFbToken: (state, actions) => {
      state.fbToken = actions.payload;
    },
    setLoader: (state, actions) => {
      state.loading = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUserDetails, updateUserDetails, updateFbToken, setLoader } =
  userSlice.actions;

export default userSlice.reducer;
