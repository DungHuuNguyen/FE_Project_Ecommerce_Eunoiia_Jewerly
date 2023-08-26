import { Input } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actFetchUserById } from "../../../redux/features/user/userSlice";
import "./style.scss";

const BillingDetails = (props) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [isToggle, setIsToggle] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  // const { carts } = useSelector((state) => state.cart);
  const { control, errors, reset } = props;

  useEffect(() => {
    dispatch(actFetchUserById(userInfo.id));
    const userInfoClone = { ...userInfo };
    delete userInfoClone.id;
    // console.log(userInfo, "userInfo in billing details");
    reset({ ...userInfoClone });
    // eslint-disable-next-line
  }, []);

  const handleToggleDifferentAddress = () => {
    setIsToggle(!isToggle);
  };

  return (
    <div className="billing-detail-container">
      <div className="billing-detail">
        <div>
          <div className="billing-detail__title">
            <h3>Billing Details</h3>
          </div>
          <div className="billing-detail__form-grp">
            <div className="billing-detail__form-grp--full-name">
              <label>Full name:</label>
              <Controller
                control={control}
                name="fullName"
                render={({ field }) => {
                  return <Input {...field} />;
                }}
              />
              {!!errors.fullName?.message && (
                <i style={{ color: "red", padding: "0px 10px" }}>
                  {errors.fullName?.message}
                </i>
              )}
            </div>
            <div className="billing-detail__form-grp--country">
              <label>Country / Region:</label>
              <Controller
                control={control}
                name="country"
                render={({ field }) => {
                  return <Input defaultValue={"Vietnam"} disabled />;
                }}
              />
            </div>
            <div className="billing-detail__form-grp--street-address">
              <label>Street address:</label>
              <Controller
                control={control}
                name="streetAddress"
                render={({ field }) => {
                  return <Input {...field} />;
                }}
              />
              {!!errors.streetAddress?.message && (
                <i style={{ color: "red", padding: "0px 10px" }}>
                  {errors.streetAddress?.message}
                </i>
              )}
            </div>

            <div className="billing-detail__form-grp--ward-district-grp">
              <div className="billing-detail__form-grp--ward">
                <label>Ward:</label>
                <Controller
                  control={control}
                  name="ward"
                  render={({ field }) => {
                    return <Input {...field} />;
                  }}
                />
                {!!errors.ward?.message && (
                  <i style={{ color: "red", padding: "0px 10px" }}>
                    {errors.ward?.message}
                  </i>
                )}
              </div>
              <div className="billing-detail__form-grp--district">
                <label>District:</label>
                <Controller
                  control={control}
                  name="district"
                  render={({ field }) => {
                    return <Input {...field} />;
                  }}
                />
                {!!errors.district?.message && (
                  <i style={{ color: "red", padding: "0px 10px" }}>
                    {errors.district?.message}
                  </i>
                )}
              </div>
            </div>

            <div className="billing-detail__form-grp--town-city">
              <label>Town / City:</label>
              <Controller
                control={control}
                name="townOrCity"
                render={({ field }) => {
                  return <Input {...field} />;
                }}
              />
              {!!errors.townOrCity?.message && (
                <i style={{ color: "red", padding: "0px 10px" }}>
                  {errors.townOrCity?.message}
                </i>
              )}
            </div>

            <div className="billing-detail__form-grp--phone">
              <label>Phone:</label>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field }) => {
                  return <Input {...field} />;
                }}
              />
              {!!errors.phoneNumber?.message && (
                <i style={{ color: "red", padding: "0px 10px" }}>
                  {errors.phoneNumber?.message}
                </i>
              )}
            </div>

            <div className="billing-detail__form-grp--email-address">
              <label>Email address:</label>
              <Controller
                control={control}
                name="email"
                render={({ field }) => {
                  return <Input {...field} />;
                }}
              />
              {!!errors.email?.message && (
                <i style={{ color: "red", padding: "0px 10px" }}>
                  {errors.email?.message}
                </i>
              )}
            </div>
          </div>

          <div className="billing-detail__form-grp--ship-to-different-address">
            <input
              type="checkbox"
              name="different-address"
              onClick={handleToggleDifferentAddress}
            />
            <label htmlFor="different-address">
              {" "}
              Ship to a different address?
            </label>
          </div>

          {/* <div
            className={`billing-detail__form-different-address ${
              isToggle ? "show-form-different-address" : ""
            }`}
          >
            <div className="billing-detail__form-different-address--full-name">
              <label>Fullname:</label>
              <Controller
                control={control}
                name="fullNameDifferentAddress"
                render={({ field }) => {
                  return <Input {...field} />;
                }}
              />
              {!!errors.fullNameDifferentAddress?.message && (
                <i style={{ color: "red", padding: "0px 10px" }}>
                  {errors.fullNameDifferentAddress?.message}
                </i>
              )}
            </div>
            <div className="billing-detail__form-different-address--country">
              <label>Country / Region:</label>
              <Input defaultValue={"Vietnam"} readOnly />
            </div>
            <div className="billing-detail__form-different-address--street-address">
              <label>Street address:</label>
              <Controller
                control={control}
                name="streetAddressDifferentAddress"
                render={({ field }) => {
                  return <Input {...field} />;
                }}
              />
              {!!errors.streetAddressDifferentAddress?.message && (
                <i style={{ color: "red", padding: "0px 10px" }}>
                  {errors.streetAddressDifferentAddress?.message}
                </i>
              )}
            </div>

            <div className="billing-detail__form-different-address--ward-district-grp">
              <div className="billing-detail__form-different-address--ward">
                <label>Ward:</label>
                <Controller
                  control={control}
                  name="wardDifferentAddress"
                  render={({ field }) => {
                    return <Input {...field} />;
                  }}
                />
                {!!errors.wardDifferentAddress?.message && (
                  <i style={{ color: "red", padding: "0px 10px" }}>
                    {errors.wardDifferentAddress?.message}
                  </i>
                )}
              </div>
              <div className="billing-detail__form-different-address--district">
                <label>District:</label>
                <Controller
                  control={control}
                  name="districtDifferentAddress"
                  render={({ field }) => {
                    return <Input {...field} />;
                  }}
                />
                {!!errors.districtDifferentAddress?.message && (
                  <i style={{ color: "red", padding: "0px 10px" }}>
                    {errors.districtDifferentAddress?.message}
                  </i>
                )}
              </div>
            </div>

            <div className="billing-detail__form-different-address--town-city">
              <label>Town / City:</label>
              <Controller
                control={control}
                name="townOrCityDifferentAddress"
                render={({ field }) => {
                  return <Input {...field} />;
                }}
              />
              {!!errors.townOrCityDifferentAddress?.message && (
                <i style={{ color: "red", padding: "0px 10px" }}>
                  {errors.townOrCityDifferentAddress?.message}
                </i>
              )}
            </div>
          </div> */}

          <div className="billing-detail__order-notes">
            <label>Order Notes (optional): </label>
            <Controller
              control={control}
              name="orderNotes"
              render={({ field }) => {
                return (
                  <Input
                    placeholder="Note: Special ring size, Stone color, Delivery time,... "
                    {...field}
                  />
                );
              }}
            />
            {!!errors.orderNotes?.message && (
              <i style={{ color: "red", padding: "0px 10px" }}>
                {errors.orderNotes?.message}
              </i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
