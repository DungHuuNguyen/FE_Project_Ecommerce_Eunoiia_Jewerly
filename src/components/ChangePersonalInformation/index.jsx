import { Button, DatePicker, Input, Radio } from "antd";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchUserById,
  actUpdateUserById,
} from "../../redux/features/user/userSlice";
import dayjs from "dayjs";
import "./style.scss";

const ChangePersonalInformation = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const phoneValidation = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  const emailValidation =
    /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$/;

  const schema = Yup.object().shape({
    fullName: Yup.string().required("Please input your full name"),
    age: Yup.string().required("Please input your age"),
    email: Yup.string()
      .required("Please input your email")
      .matches(emailValidation, "type email was wrong"),
    phoneNumber: Yup.string()
      .required("Please input your phone number")
      .matches(phoneValidation, "type phone number was wrong"),
    gender: Yup.string().required("Please input your gender"),
    dateOfBirth: Yup.string().required("Please input your date of birth"),
  });

  const methods = useForm({
    defaultValues: {
      fullName: "",
      age: "",
      email: "",
      phoneNumber: "",
      gender: "",
      dateOfBirth: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = methods;
  // console.log(errors, "errors");

  const onValid = (formValue) => {
    // console.log(formValue, "formValue profile");

    dispatch(
      actUpdateUserById({
        id: userInfo.id,
        userUpdate: formValue,
      })
    );
    // console.log(userInfo, "userInfo fiasdasdasdasdasdx");
    // dispatch(actFetchUserById(userInfo.id));
    // console.log(formValue, "formValue profile ");
  };

  useEffect(() => {
    dispatch(actFetchUserById(userInfo.id));
    console.log(userInfo, "userInfo fix");
    //   // reset form về giá trị của userInfo => hiển thị lên form profile
    reset({ ...userInfo });
    // eslint-disable-next-line
  }, []);

  // if (!userInfo?.id) {
  //   return <Navigate to={ROUTES.HOME_PAGE} />;
  // }

  return (
    <div className="change-pass-word-wrapper">
      <div className="change-pass-word-container">
        <div className="change-pass-word-container__title">
          <h3>My Profile</h3>
        </div>
        <form
          className="change-pass-word-form"
          onSubmit={handleSubmit(onValid)}
        >
          <div className="change-pass-word-form__name">
            <Controller
              control={control}
              name="fullName"
              render={({ field }) => {
                return <Input placeholder="Full name..." {...field} />;
              }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <span style={{ color: "red" }}>{errors.name?.message}</span>
          </div>

          <div className="change-pass-word-form__age">
            <Controller
              control={control}
              name="age"
              render={({ field }) => {
                return <Input placeholder="Age..." {...field} />;
              }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <span style={{ color: "red" }}>{errors.age?.message}</span>
          </div>

          <div className="change-pass-word-form__address">
            <Controller
              control={control}
              name="address"
              render={({ field }) => {
                return <Input placeholder="Address..." {...field} />;
              }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <span style={{ color: "red" }}>{errors.address?.message}</span>
          </div>

          <div className="change-pass-word-form__phone-number">
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => {
                return <Input placeholder="Phone number..." {...field} />;
              }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <span style={{ color: "red" }}>{errors.phoneNumber?.message}</span>
          </div>

          <div className="change-pass-word-form__email">
            <Controller
              control={control}
              name="email"
              render={({ field }) => {
                return <Input placeholder="Email..." {...field} />;
              }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <span style={{ color: "red" }}>{errors.email?.message}</span>
          </div>

          <div className="change-pass-word-form__gender-grp">
            <label htmlFor="">Gender: </label>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => {
                return (
                  <Radio.Group {...field}>
                    <Radio value={"male"}>Male</Radio>
                    <Radio value={"female"}>Female</Radio>
                    <Radio value={"other"}>Other</Radio>
                  </Radio.Group>
                );
              }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <span style={{ color: "red" }}>{errors.gender?.message}</span>
          </div>

          <div className="change-pass-word-form__birth-day">
            <label htmlFor="">Date of birth: </label>
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field }) => {
                return (
                  <DatePicker
                    {...field}
                    value={field.value ? dayjs(field.value) : null}
                  />
                );
              }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <span style={{ color: "red" }}>{errors.dateOfBirth?.message}</span>
          </div>

          <div className="change-pass-word-form__btn-save">
            <Button htmlType="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePersonalInformation;
