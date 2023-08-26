import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkoutApis } from "../../../apis/checkoutApis";
import { message } from "antd";

const initialState = {
  checkoutBills: [],
  checkoutBill: {},
};

export const actFetchAllCheckoutBills = createAsyncThunk(
  "checkout/fetchAllCheckoutBills",
  async (params) => {
    const response = await checkoutApis.getAllCheckoutBills({ params: params });
    return response;
  }
);

export const actAddBill = createAsyncThunk("checkout/addBill", async (bill) => {
  const response = await checkoutApis.addBill(bill);
  return response;
});

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actFetchAllCheckoutBills.fulfilled, (state, action) => {
      state.checkoutBills = action.payload;
    });

    builder.addCase(actAddBill.fulfilled, (state, action) => {
      const billData = action.payload;
      // console.log(billData, "billData");
      state.checkoutBill = billData;
      state.checkoutBills.push(billData);
      message.success("Check your order in purchase history!");
    });
  },
});

// export const {} = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
