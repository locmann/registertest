import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getData } from "../store/slices/userSlice";
import { RootState, useAppDispatch } from "../store/store";
import styles from "./RegisterForm.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

type LoginFieldsType = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFieldsType>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const onSubmit: SubmitHandler<LoginFieldsType> = async (data) => {
    //dispatch(sendRegister(data));
    dispatch(getData(data));
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
          {...register("email", { required: true })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email?.type === "required" && (
          <p role="alert">Email is required</p>
        )}
        Password:{" "}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <input type="submit" value="Sign in" />
      </form>
    </div>
  );
};
