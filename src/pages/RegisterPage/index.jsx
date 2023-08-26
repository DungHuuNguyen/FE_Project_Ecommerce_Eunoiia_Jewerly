import { Button, Input, Radio } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { actCreateNewUser } from "../../redux/features/user/userSlice";
import "./style.scss";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const phoneValidation = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  const emailValidation =
    /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$/;

  const schema = Yup.object().shape({
    fullName: Yup.string().required("Please input your full name"),
    age: Yup.number().positive().integer().required("Please input your age"),
    gender: Yup.string().required("Please input your gender"),
    user: Yup.string().required("Please input your user"),
    password: Yup.string()
      .required("Please input your password")
      .min(6, "Password length should be at least 6 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirmPassword: Yup.string()
      .required("Please input confirm password")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    address: Yup.string().required("Please input your address"),
    phoneNumber: Yup.string()
      .required("Please input your phone number")
      .matches(phoneValidation, "type phone number was wrong"),
    email: Yup.string()
      .required("Please input your email")
      .matches(emailValidation, "type email was wrong"),
  });

  const methods = useForm({
    defaultValues: {
      fullName: "",
      age: "",
      gender: "",
      user: "",
      password: "",
      confirmPassword: "",
      address: "",
      phoneNumber: "",
      email: "",
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
    // console.log(formValue, "formValue");
    dispatch(actCreateNewUser(formValue));
    reset();
  };

  const handleRedirectToLoginPage = () => {
    navigate(ROUTES.LOGIN_PAGE);
  };

  const handleResetForm = () => {
    reset();
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-page-container">
        <div className="register-page-container__form-register-grp">
          <form
            className="register-page-container__form-register"
            onSubmit={handleSubmit(onValid)}
          >
            <div className="register-page-container__title">
              <h3>Đăng ký</h3>
            </div>
            <div className="register-page-container__input-grp">
              <div>
                <Controller
                  control={control}
                  name="fullName"
                  render={({ field }) => {
                    return <Input placeholder="Full Name ..." {...field} />;
                  }}
                />
                {!!errors.fullName?.message && (
                  <i style={{ color: "red", padding: "0px 10px" }}>
                    {errors.fullName?.message}
                  </i>
                )}
              </div>

              <div>
                <Controller
                  control={control}
                  name="age"
                  render={({ field }) => {
                    return <Input placeholder="Age ..." {...field} />;
                  }}
                />
                {!!errors.age?.message && (
                  <i style={{ color: "red", padding: "0px 10px" }}>
                    {errors.age?.message}
                  </i>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 10px",
                  }}
                >
                  <label>Gender:</label>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => {
                      return (
                        <Radio.Group style={{ paddingRight: 80 }} {...field}>
                          <Radio value={"male"}>Male</Radio>
                          <Radio value={"female"}>Female</Radio>
                          <Radio value={"other"}>Other</Radio>
                        </Radio.Group>
                      );
                    }}
                  />
                </div>
                {!!errors.gender?.message && (
                  <i style={{ color: "red", padding: "0px 10px" }}>
                    {errors.gender?.message}
                  </i>
                )}
              </div>

              <div>
                <Controller
                  control={control}
                  name="user"
                  render={({ field }) => {
                    return <Input placeholder="User ..." {...field} />;
                  }}
                />
                {!!errors.user?.message && (
                  <i style={{ color: "red", padding: "0px 10px" }}>
                    {errors.user?.message}
                  </i>
                )}
              </div>

              <div>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <Input.Password placeholder="Password ..." {...field} />
                    );
                  }}
                />
                {!!errors.password?.message && (
                  <i style={{ color: "red", padding: "0px 10px" }}>
                    {errors.password?.message}
                  </i>
                )}
              </div>

              <div>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => {
                    return (
                      <Input.Password
                        placeholder="Confirm Password ..."
                        {...field}
                      />
                    );
                  }}
                />
                {!!errors.confirmPassword?.message && (
                  <i style={{ color: "red", padding: "0px 10px" }}>
                    {errors.confirmPassword?.message}
                  </i>
                )}
              </div>

              <div>
                <Controller
                  control={control}
                  name="address"
                  render={({ field }) => {
                    return <Input placeholder="Address ..." {...field} />;
                  }}
                />
                {!!errors.address?.message && (
                  <i style={{ color: "red", padding: "0px 10px" }}>
                    {errors.address?.message}
                  </i>
                )}
              </div>

              <div>
                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field }) => {
                    return <Input placeholder="Number Phone ..." {...field} />;
                  }}
                />
                {!!errors.phoneNumber?.message && (
                  <i style={{ color: "red", padding: "0px 10px" }}>
                    {errors.phoneNumber?.message}
                  </i>
                )}
              </div>

              <div>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => {
                    return <Input placeholder="Email ..." {...field} />;
                  }}
                />
                {!!errors.email?.message && (
                  <i style={{ color: "red", padding: "0px 10px" }}>
                    {errors.email?.message}
                  </i>
                )}
              </div>
            </div>
            <div className="register-page-container__btn-register">
              <Button htmlType="submit">Đăng ký</Button>
              <Button onClick={handleResetForm}>Reset</Button>
            </div>
            <div className="register-page-container__login">
              <p>Bạn đã có tài khoản?</p>
              <p
                className="register-page-container__login-btn"
                onClick={handleRedirectToLoginPage}
              >
                Đăng nhập
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
