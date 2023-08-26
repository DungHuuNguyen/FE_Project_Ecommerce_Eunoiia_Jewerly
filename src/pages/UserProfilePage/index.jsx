import React from "react";
import ChangePersonalInformation from "../../components/ChangePersonalInformation";
import ProfileNav from "../../components/ProfileNav";
import "./style.scss";

const UserProfilePage = () => {
  return (
    <div className="user-profile-wrapper">
      <div className="user-profile-container">
        <div className="user-profile-profile-nav">
          <ProfileNav />
        </div>
        <div className="user-profile-change-profile">
          <ChangePersonalInformation />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
