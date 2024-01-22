import { createSlice } from "@reduxjs/toolkit";
import { Storage } from "../../Components/Shared/utils/store";

const initialState = {
  loading: false,
  userInfo: Storage.getItem("user_info"),
  userToken: null,
  fbToken: Storage.getItem("fac_t"),
  error: null,
  success: false,
  companyId: 0,
  colorMode: false
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserDetails: (state, actions) => {
      console.log(actions.payload);
      state.userInfo = actions.payload;
    },
    setCompanyId: (state, actions)=>{
      state.companyId = actions.payload;
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
    setColorMode: (state,actions)=>{
      state.colorMode = actions.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { addUserDetails, updateUserDetails, updateFbToken, setLoader, setCompanyId, setColorMode } =
  userSlice.actions;

export default userSlice.reducer;
