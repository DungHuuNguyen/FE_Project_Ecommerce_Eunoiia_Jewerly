import { InputNumber, Modal } from "antd";
import React from "react";

const CartPurchase = (props) => {
  const { handleOk, handleCancel, isModalOpen, cartsInCheckoutBills } = props;
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

  const renderCartsModal = (cartsInCheckoutBills) => {
    return cartsInCheckoutBills.map((cart) => {
      return (
        <tr key={cart.id}>
          <td className="cart-page-shop-table__img-product">
            <img src={cart.imgURL} alt="img product" />
          </td>
          <td className="cart-page-shop-table__name-product">
            <p className="name">{cart.name}</p>
            <p className="material">{`Material: ${cart.material}`}</p>
            <p className="color">{`Color: ${cart.color}`}</p>
          </td>
          <td className="cart-page-shop-table__price-product">
            {formatNumber(cart.price)}
          </td>
          <td className="cart-page-shop-table__quantity-product">
            {/* <div className="cart-page-shop-table__quantity-grp"> */}
            <InputNumber
              className="cart-page-shop-table__quantity"
              value={cart.quantity}
              readOnly
            />
            {/* </div> */}
          </td>
          <td className="cart-page-shop-table__subtotal-product">
            {formatNumber(cart.price * cart.quantity)}
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="modal-title">
          <p>Detail Purchase</p>
        </div>
        <table className="cart-page-shop-table__shop-table">
          <thead className="cart-page-shop-table__thead">
            <tr className="cart-page-shop-table__thead-tr">
              <th className="cart-page-shop-table__th2">Img</th>
              <th className="cart-page-shop-table__th3">Product</th>
              <th className="cart-page-shop-table__th4">Price</th>
              <th className="cart-page-shop-table__th5">Quantity</th>
              <th className="cart-page-shop-table__th6">Subtotal</th>
            </tr>
          </thead>
          <tbody className="cart-page-shop-table__tbody">
            {renderCartsModal(cartsInCheckoutBills)}
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

export default CartPurchase;
