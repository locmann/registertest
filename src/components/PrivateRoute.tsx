import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

type PropsType = {
  children: React.ReactNode;
  path: string;
};

export const PrivateRoute: React.FC<PropsType> = ({ children, path }) => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  return isAuth ? children : <Navigate to={path} replace />;
};
