import { Button, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { actLogin } from "../../redux/features/user/userSlice";
import "./style.scss";

const loginSchema = Yup.object().shape({
  user: Yup.string().required("Username is required"),
  password: Yup.string().required("password is required"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      user: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors: errorsValidate },
  } = methods;

  const onValid = (formValue) => {
    // console.log(formValue, "formValue");
    dispatch(actLogin(formValue));
  };

  const handleRedirectToRegisterPage = () => {
    navigate(ROUTES.REGISTER_PAGE);
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-page-container">
        <div className="login-page-container__form-login-grp">
          <form
            className="login-page-container__form-login"
            onSubmit={handleSubmit(onValid)}
          >
            <div className="login-page-container__title">
              <h3>Đăng nhập</h3>
            </div>
            <div className="login-page-container__input-grp">
              <Controller
                control={control}
                name="user"
                render={({ field }) => {
                  return <Input type="text" placeholder="Account" {...field} />;
                }}
              />
              {errorsValidate.user && (
                <span style={{ color: "red" }}>
                  {errorsValidate.user?.message}
                </span>
              )}

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => {
                  return (
                    <Input.Password
                      type="password"
                      placeholder="Password"
                      autoComplete="on"
                      value={value}
                      onChange={onChange}
                    />
                  );
                }}
              />
              {errorsValidate.password && (
                <span style={{ color: "red" }}>
                  {errorsValidate.password?.message}
                </span>
              )}
            </div>
            <div className="login-page-container__btn-login">
              <Button htmlType="submit">Đăng nhập</Button>
            </div>
            <div className="login-page-container__register">
              <p>Bạn chưa có tài khoản?</p>
              <p
                className="login-page-container__register-btn"
                onClick={handleRedirectToRegisterPage}
              >
                Đăng ký
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
