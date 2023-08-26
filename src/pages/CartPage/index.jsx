import React from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import "./style.scss";
import CardTable from "../../components/CardTable";

const CartPage = () => {
  const navigate = useNavigate();
  const { carts } = useSelector((state) => state.cart);
  const { isLogin } = useSelector((state) => state.user);

  const formatNumber = (num) => {
    let numString = "";
    while (num > 0) {
      let div = num % 1000;
      num = Math.floor(num / 1000);
      if (num !== 0) {
        if (div < 10) {
          div = "00" + div;
        } else if (div < 100) {
          div = "0" + div;
        }
        numString = "." + div + numString;
      } else {
        numString = div + numString;
      }
    }
    return numString;
  };

  const getTotalMoneyInBill = () => {
    const totalMoneyInBill = carts.reduce((total, cart) => {
      return total + parseFloat(cart.price) * cart.quantity;
    }, 0);
    return formatNumber(totalMoneyInBill);
  };

  const handleRedirectToCheckOut = () => {
    if (isLogin) {
      //&& carts.length !== 0
      navigate(ROUTES.ORDER_PAGE);
    } else {
      navigate(ROUTES.LOGIN_PAGE);
    }
  };

  return (
    <div className="cart-page-wrapper">
      <div className="cart-page">
        <div className="cart-page-shop-table">
          <div className="cart-page-shop-table__shop-table-grp">
            <CardTable />
          </div>

          <div className="cart-page-cart-totals">
            <div className="cart-page-cart-totals__cart-totals">
              <div className="cart-page-cart-totals__title">
                <h3>Cart totals</h3>
              </div>
              <table className="cart-page-cart-totals__car-totals-table">
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td>{getTotalMoneyInBill()}</td>
                  </tr>

                  <tr>
                    <td>Shipping</td>
                    <td>
                      <p>Shipping options will be updated during checkout.</p>
                    </td>
                  </tr>

                  <tr>
                    <td>Total</td>
                    <td>{getTotalMoneyInBill()}</td>
                  </tr>
                </tbody>
              </table>

              <div className="cart-page-cart-totals__btn-proceed-to-checkout">
                <Button onClick={handleRedirectToCheckOut}>
                  Proceed to checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
