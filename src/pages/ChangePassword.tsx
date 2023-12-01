import React from "react";
import { Link } from "react-router-dom";
import { ChangePasswordForm } from "../components/ChangePasswordForm";

export const ChangePassword = () => {
  return (
    <div>
      <ChangePasswordForm />
      <div>
        <button>
          <Link to={"/"}>Home</Link>
        </button>
      </div>
    </div>
  );
};
