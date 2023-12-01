import React from "react";
import { Link } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";

export const Register = () => {
  return (
    <div>
      <RegisterForm />
      <div>
        <button>
          <Link to={"/"}>Home</Link>
        </button>
      </div>
    </div>
  );
};
