import React from "react";
import YourOrder from "../../components/OrderCPN/YourOrder";
import "./style.scss";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
// import { actClearCarts } from "../../redux/features/cart/cartSlice";

const CheckoutPage = () => {
  const { order } = useSelector((state) => state.order);
  // console.log(order, "order");

  if (!order?.id) {
    // dispatch(actClearCarts());
    <Navigate to={ROUTES.HOME_PAGE} />;
  }

  // const handleCalcuTotalPrice = () => {
  //   const ordersInCart = order.carts;
  //   const result = 0;
  //   ordersInCart.forEach((item) => {
  //     return (result += parseFloat(item.price) * item.quantity);
  //   });
  //   console.log(result, "result");
  //   return result;
  // };

  return (
    <div className="check-out-container">
      <div className="check-out">
        <div className="check-out__noti">
          <p>Thank you! Your order has been received</p>
        </div>
        <div className="check-out__infor-bill">
          <table>
            <thead>
              <tr>
                <th>ORDER NUMBER:</th>
                <th>DATE:</th>
                <th>TOTAL:</th>
                <th>PAYMENT METHOD:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{order?.orderNumber}</td>
                <td>{order?.dateOfBill}</td>
                <td>11111111</td>
                <td>{order?.payment}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="check-out__payment-link-noti">
          <p>
            Eunoia's Staff will send payment link via this email within the next
            24 hours. Please follow up and pay according to the next
            instructions
          </p>
        </div>

        <div className="check-out__order-detail-table">
          <YourOrder isCheckoutPage={true} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
