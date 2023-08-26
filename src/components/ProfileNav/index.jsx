import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useSelector } from "react-redux";

const ProfileNav = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  return (
    <div className="profile-nav-wrapper">
      <div className="profile-nav">
        <div className="profile-nav__avatar-grp">
          {!!userInfo?.avatarURL ? (
            <img
              src={userInfo?.avatarURL}
              alt=""
              className="profile-nav__avatar-grp--avatar"
            />
          ) : (
            <img
              src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
              alt=""
              className="profile-nav__avatar-grp--avatar"
            />
          )}

          <div>
            <p className="profile-nav__avatar-grp--user-name">
              {userInfo?.user}
            </p>
          </div>
        </div>

        <div className="profile-nav__list-information-grp">
          <ul className="profile-nav__list-information">
            <li
              className="profile-nav__list-information--change-profile"
              onClick={() => {
                navigate(ROUTES.USER_PROFILE_PAGE);
              }}
            >
              Change profile
            </li>
            <li
              className="profile-nav__list-information--change-password"
              onClick={() => {
                navigate(ROUTES.USER_CHANGE_PASSWORD_PAGE);
              }}
            >
              Change password
            </li>
            <li
              className="profile-nav__list-information--purchase-history"
              onClick={() => {
                navigate(ROUTES.USER_PURCHASE_HISTORY_PAGE);
              }}
            >
              View purchase history
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileNav;
