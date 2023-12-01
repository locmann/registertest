import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./RegisterForm.module.css";

import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { postData } from "../store/slices/userSlice";
import { redirect, useNavigate } from "react-router-dom";

type RegisterFieldsType = {
  email: string;
  password: string;
  confirmPass: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFieldsType>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const onSubmit: SubmitHandler<RegisterFieldsType> = (data) => {
    //dispatch(sendRegister(data));

    dispatch(postData(data));
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/changePassword");
    }
  }, [isAuth]);
  return (
    <div className={styles.window}>
      <form onSubmit={handleSubmit(onSubmit)}>
        Email:{" "}
        <input
          placeholder="Email"
          {...register("email", {
            required: true,

            validate: {
              maxLength: (v) =>
                v.length <= 50 || "The email should have at most 50 characters",
              matchPattern: (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                "Email address must be a valid address",
            },
          })}
          /* aria-invalid={errors.email ? "true" : "false"} */
        />
        {errors.email?.type === "required" && (
          <p role="alert">Email is required</p>
        )}
        {errors.email?.type === "validate" && (
          <p role="alert">Email is broke</p>
        )}
        {errors.email?.message && <p role="alert">{errors.email.message}</p>}
        Password:{" "}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            minLength: 4,
            maxLength: 10,
          })}
        />
        {errors.password?.type === "required" && (
          <p role="alert">Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p role="alert">Password must be at least 4 characters</p>
        )}
        {errors.password?.type === "maxLength" && (
          <p role="alert">Password must be less than 10 characters</p>
        )}
        Confirm password:{" "}
        <input
          type="password"
          placeholder="Confirm password"
          {...register("confirmPass", { required: true })}
        />
        {errors.confirmPass?.type === "required" && (
          <p role="alert">Passwords are different</p>
        )}
        <input type="submit" value="Sign up" />
      </form>
    </div>
  );
};
