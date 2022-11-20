import { createSlice } from "@reduxjs/toolkit";

const initialState = { payments: [] };

export const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    addPaymentsSlice: (state, actions) => {
      state.payments = actions.payload;
    },
  },
});

export default paymentsSlice.reducer;

// Action creators are generated for each case reducer function
export const { addPaymentsSlice } = paymentsSlice.actions;
