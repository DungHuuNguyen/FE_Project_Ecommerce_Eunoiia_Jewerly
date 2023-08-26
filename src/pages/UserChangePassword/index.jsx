import React from "react";
import ProfileNav from "../../components/ProfileNav";
import ChangePassWord from "../../components/ChangePassWord";
import "./style.scss";

const UserChangePassWord = () => {
  return (
    <div className="user-change-password-wrapper">
      <div className="user-change-password-container">
        <div className="user-change-password-profile-nav">
          <ProfileNav />
        </div>
        <div className="user-change-password-change-profile">
          <ChangePassWord />
        </div>
      </div>
    </div>
  );
};

export default UserChangePassWord;
