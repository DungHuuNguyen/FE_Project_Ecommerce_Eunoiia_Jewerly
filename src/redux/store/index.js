import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../features/product/productSlice";
import { userReducer } from "../features/user/userSlice";
import { cartReducer } from "../features/cart/cartSlice";
import { orderReducer } from "../features/order/orderSlice";
import { checkoutReducer } from "../features/checkout/checkoutSlice";
import { commentReducer } from "../features/comment/commentSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    checkout: checkoutReducer,
    comment: commentReducer,
  },
});
