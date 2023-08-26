import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderApis } from "../../../apis/orderApis";
import { message } from "antd";

const initialState = {
  orders: [],
  order: {},
  isLoading: false,
  errors: {},
  isBought: false,
};

export const actFetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async (params) => {
    const response = await orderApis.getAllOrders({ params: params });
    return response.data;
  }
);

export const actAddOrder = createAsyncThunk("order/addOrder", async (order) => {
  const response = await orderApis.addOrder(order);
  return response;
  // const response = await orderApis.addOrder(order);
  // return response;
});

export const actFetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (id) => {
    return await orderApis.getOrderById(id);
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = true;
    },
    sendOrderSuccess: (state, action) => {
      state.orders.push(action.payload);
      message.success("Đặt hàng thành công! Success");
    },
    sendOrderFailure: (state, action) => {
      message.error("Đặt hàng thất bại! Failure");
    },
    clearOrder: (state, action) => {
      state.orders = [];
      state.order = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actFetchAllOrders.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actFetchAllOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = {};
    });
    builder.addCase(actFetchAllOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });

    builder.addCase(actAddOrder.fulfilled, (state, action) => {
      // console.log(action.payload, "action.payload add order ne");
      state.order = action.payload;
      state.orders.push(action.payload);
      message.success("Đặt hàng thành công!");
    });
    builder.addCase(actAddOrder.rejected, (state, action) => {
      state.orders = [];
      state.customerInfo = {};
      message.error(action.payload);
    });

    builder.addCase(actFetchOrderById.fulfilled, (state, action) => {
      state.order = action.payload;
    });
  },
});

export const { setLoading, sendOrderSuccess, sendOrderFailure, clearOrder } =
  orderSlice.actions;
export const orderReducer = orderSlice.reducer;
