import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchAllCheckoutBills } from "../../redux/features/checkout/checkoutSlice";
import "./style.scss";
import CartPurchase from "../CartPurchase";

const PurchaseHistory = () => {
  const dispatch = useDispatch();
  const { checkoutBills } = useSelector((state) => state.checkout);
  const [cartsInCheckoutBills, setCartsInCheckoutBills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkoutBillsClone = [...checkoutBills];

  const showModal = (id) => {
    setIsModalOpen(true);
    console.log(id, "id ne");

    const indexThisBills = checkoutBillsClone.findIndex((bill) => {
      return bill.id === id;
    });
    setCartsInCheckoutBills(checkoutBills[indexThisBills].carts);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(actFetchAllCheckoutBills());
    // eslint-disable-next-line
  }, []);

  // const cartsInBills = [];
  const renderPurchaseList = (checkoutBills) => {
    return checkoutBills.map((bill) => {
      // cartsInBills.push([...bill.carts, bill.id]);
      return (
        <React.Fragment key={bill.id}>
          <tr>
            <td className="purchase-history-table__code-purchase">
              <p>{bill.orderNumber}</p>
            </td>
            <td className="purchase-history-table__date-of-bill">
              <p>{bill.dateOfBill}</p>
            </td>
            <td className="purchase-history-table__subtotal-product">
              {/* <Button>Review product</Button> */}
              {bill.fullName}
            </td>
            <td className="purchase-history-table__bill">
              <p onClick={() => showModal(bill.id)}>Xem chi tiết đơn hàng</p>
            </td>
          </tr>
        </React.Fragment>
      );
    });
  };
  // console.log(cartsInBills, "cartsInBills");

  return (
    <div className="purchase-history-wrapper">
      <div className="purchase-history">
        <div className="purchase-history-table">
          <div className="purchase-history-table__table-grp">
            <table className="purchase-history-table__shop-table">
              <thead className="purchase-history-table__thead">
                <tr className="purchase-history-table__thead-tr">
                  <th className="purchase-history-table__th1">Order number</th>
                  <th className="purchase-history-table__th3">Date</th>
                  <th className="purchase-history-table__th4">Mr/Ms</th>
                  <th className="purchase-history-table__th2">Product</th>
                </tr>
              </thead>
              <tbody className="purchase-history-table__tbody">
                {renderPurchaseList(checkoutBills)}
                {/* <div className="purchase-history-table__bill--product-table"> */}
                <CartPurchase
                  handleOk={handleOk}
                  handleCancel={handleCancel}
                  isModalOpen={isModalOpen}
                  cartsInCheckoutBills={cartsInCheckoutBills}
                />
                {/* </div> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
