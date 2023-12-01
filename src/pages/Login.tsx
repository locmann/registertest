import React from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";

export const Login = () => {
  return (
    <div>
      <LoginForm />
      <div>
        <button>
          <Link to={"/"}>Home</Link>
        </button>
      </div>
    </div>
  );
};
