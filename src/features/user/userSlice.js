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
  error: null,
  success: false,
};

Storage.setItem("user_info", {
  id: 26,
  email: "jahissssd@quadque.digital",
  email_verified_at: null,
  role_id: 3,
  business_type: null,
  contact_number: "0123654",
  subscription_id: null,
  flag: null,
  created_at: null,
  updated_at: null,
  user_id: 26,
  full_name: "Mr. Test Man",
  first_name: null,
  last_name: null,
  address: "",
  qualification: "Highher Secendory",
  region: "",
  postcode: "",
  work_experiences: "10 years on PHP",
  location: "Australia",
  profession: "",
  secondary_contact: "",
  date_of_birth: "",
});
initialState.userInfo.client_id = 2;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserDetails: (state, actions) => {
      console.log(actions.payload);
      // state.userInfo = actions.payload;
      // state.userInfo.client_id = 2;
    },
    updateUserDetails: (state) => {
      state.value -= 1;
    },
    setLoader: (state, actions) => {
      state.loading = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUserDetails, updateUserDetails, setLoader } =
  userSlice.actions;

export default userSlice.reducer;
