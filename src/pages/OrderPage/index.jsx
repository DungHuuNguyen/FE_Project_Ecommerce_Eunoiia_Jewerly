import React from "react";
import BillingDetails from "../../components/OrderCPN/BillingDetails";
import YourOrder from "../../components/OrderCPN/YourOrder";
import { Col, Row } from "antd";
import * as Yup from "yup";
import "./style.scss";
import { Button } from "antd/es";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { actAddOrder, clearOrder } from "../../redux/features/order/orderSlice";
import dayjs from "dayjs";
import { makeOrderNumber } from "../../utils/makeOrderNumber";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { actAddBill } from "../../redux/features/checkout/checkoutSlice";

const phoneValidation = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
const emailValidation =
  /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$/;
const schema = Yup.object().shape({
  fullName: Yup.string().required("Please input your full name"),
  streetAddress: Yup.string().required("Please input street address"),
  ward: Yup.string().required("Please input ward"),
  district: Yup.string().required("Please input district"),
  townOrCity: Yup.string().required("Please input town or city"),
  phoneNumber: Yup.string()
    .required("Please input your phone number")
    .matches(phoneValidation, "type phone number was wrong"),
  email: Yup.string()
    .required("Please input your email")
    .matches(emailValidation, "type email was wrong"),
  feeShip: Yup.string().required("Please choose method shipping"),
  payment: Yup.string().required("Please choose method shipping"),
});

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { carts } = useSelector((state) => state.cart);

  const methods = useForm({
    defaultValues: {
      fullName: "",
      country: "",
      streetAddress: "",
      ward: "",
      district: "",
      townOrCity: "",
      phoneNumber: "",
      email: "",
      orderNotes: "",
      feeShip: "",
      payment: "",
      //   fullNameDifferentAddress: "",
      //   streetAddressDifferentAddress: "",
      //   wardDifferentAddress: "",
      //   districtDifferentAddress: "",
      //   townOrCityDifferentAddress: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = methods;

  const onValid = (formValue) => {
    console.log(formValue, "form value billing details order page");
    const orderData = {
      ...formValue,
      userId: userInfo.id,
      carts: carts,
      dateOfBill: dayjs(new Date()).format("DD/MM/YYYY"),
      createAt: new Date().getTime(),
      orderNumber: makeOrderNumber(),
    };
    console.log(orderData, "orderData");

    dispatch(actAddOrder(orderData));
    dispatch(actAddBill(orderData));
    dispatch(clearOrder());
    navigate(ROUTES.CHECK_OUT_PAGE);
  };

  return (
    <form className="order-page-container" onSubmit={handleSubmit(onValid)}>
      <Row className="order-page">
        <Col
          className="order-page__billing-details"
          xs={24}
          sm={24}
          md={12}
          lg={14}
        >
          <BillingDetails control={control} errors={errors} reset={reset} />
        </Col>
        <Col className="order-page__your-order" xs={24} sm={24} md={12} lg={10}>
          <YourOrder control={control} errors={errors} />
          <div className="billing-detail__submit-btn">
            <Button htmlType="submit">Place order</Button>
          </div>
        </Col>
      </Row>
    </form>
  );
};

export default OrderPage;
