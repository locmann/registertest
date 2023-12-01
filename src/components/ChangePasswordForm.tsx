import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { putData } from "../store/slices/userSlice";
import { RootState, useAppDispatch } from "../store/store";
import styles from "./RegisterForm.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

type ChangeFieldsType = {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
};

export const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeFieldsType>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const onSubmit: SubmitHandler<ChangeFieldsType> = async (data) => {
    const passwords = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    dispatch(putData(passwords));
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth]);
  return (
    <div className={styles.window}>
      <form onSubmit={handleSubmit(onSubmit)}>
        Old password:{" "}
        <input
          type="password"
          placeholder="Old password"
          {...register("oldPassword", { required: true })}
          aria-invalid={errors.oldPassword ? "true" : "false"}
        />
        {errors.oldPassword?.type === "required" && (
          <p role="alert">oldPassword is required</p>
        )}
        New password:{" "}
        <input
          type="password"
          placeholder="Password"
          {...register("newPassword", { required: true })}
        />
        Repeat new password:{" "}
        <input
          type="password"
          placeholder="Password"
          {...register("repeatPassword", { required: true })}
        />
        <input type="submit" value="Change" />
      </form>
    </div>
  );
};
