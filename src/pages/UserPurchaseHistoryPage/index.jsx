import React from "react";
import ProfileNav from "../../components/ProfileNav";
import PurchaseHistory from "../../components/PurchaseHistory";
import "./style.scss";

const UserPurchaseHistoryPage = () => {
  return (
    <div className="user-purchase-history-wrapper">
      <div className="user-purchase-history-container">
        <div className="user-purchase-history-profile-nav">
          <ProfileNav />
        </div>
        <div className="user-purchase-history-change-profile">
          <PurchaseHistory />
        </div>
      </div>
    </div>
  );
};

export default UserPurchaseHistoryPage;
