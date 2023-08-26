import { Button, Form, Input } from "antd";
import React from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.scss";
import { actUpdatePasswordById } from "../../redux/features/user/userSlice";

const ChangePassWord = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  // console.log(userInfo, "Userinfo Change password");

  const schema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Please input your password")
      .min(6, "Password length should be at least 6 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirmPassword: Yup.string()
      .required("Please input confirm password")
      .oneOf([Yup.ref("newPassword")], "Password do not match"),
  });

  const methods = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = methods;

  const onValid = (formValueChangePassword) => {
    console.log(
      {
        password: formValueChangePassword.newPassword,
        confirmPassword: formValueChangePassword.confirmPassword,
      },
      "form value ne"
    );

    const formValuePasswordUpdate = {
      password: formValueChangePassword.newPassword,
      confirmPassword: formValueChangePassword.confirmPassword,
    };
    if (userInfo.password !== formValueChangePassword.currentPassword) {
      return alert("current password was wrong!");
    } else {
      dispatch(
        actUpdatePasswordById({
          id: userInfo.id,
          userUpdate: formValuePasswordUpdate,
        })
      );
    }
    reset("");
  };

  return (
    <div className="change-pass-word-wrapper">
      <div className="change-pass-word-container">
        <div className="change-pass-word-container__title">
          <h3>Change your password</h3>
        </div>
        <Form
          className="change-pass-word-form"
          onSubmitCapture={handleSubmit(onValid)}
        >
          <div className="change-pass-word-form__current-password">
            <Controller
              control={control}
              name="currentPassword"
              render={({ field }) => {
                return <Input placeholder="Current password..." {...field} />;
              }}
            />
          </div>

          <div className="change-pass-word-form__new-password">
            <Controller
              control={control}
              name="newPassword"
              render={({ field }) => {
                return <Input placeholder="New password..." {...field} />;
              }}
            />
            {!!errors.newPassword?.message && (
              <i style={{ color: "red", padding: "0px 10px" }}>
                {errors.newPassword?.message}
              </i>
            )}
          </div>

          <div className="change-pass-word-form__confirm-password">
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => {
                return <Input placeholder="Confirm password..." {...field} />;
              }}
            />
            {!!errors.confirmPassword?.message && (
              <i style={{ color: "red", padding: "0px 10px" }}>
                {errors.confirmPassword?.message}
              </i>
            )}
          </div>

          <div className="change-pass-word-form__btn-save">
            <Button htmlType="submit">Save</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassWord;
