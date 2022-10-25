import React from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "context/userContext";
import { Button } from "components";
import { api } from "api";

import "./Topbar.scss";

export const Topbar: React.FC = () => {
  const { name, surname } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    api.users.logoutUser();
    navigate("/login");
  };

  return (
    <div className="topbar">
      <div className="topbar__logo">
        <img
          onClick={() => navigate("/")}
          src="/logo.png"
          alt="logo"
        />
      </div>
      <div className="topbar__user-container">
        <div className="topbar__user-container-name">{`${name?.charAt(
          0
        )} ${surname?.charAt(0)}`}</div>
        <Button
          onClick={handleLogout}
          children={"logout"}
          variant={"danger"}
          size={"small"}
        ></Button>
      </div>
    </div>
  );
};
