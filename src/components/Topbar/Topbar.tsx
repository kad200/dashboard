import { logoutUser } from "api/users";
import { Button } from "components/Button/Button";
import { useUserContext } from "context/userContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Topbar.scss";


export const Topbar: React.FC = () => {
  const { name, surname } = useUserContext()
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  }

  return (
  <div className="topbar">
    <div className="topbar__logo">
        <img onClick={() => navigate("/")} src="/logo.png"width="100px" alt="logo"></img>
    </div>
    <div className="topbar__user-container">
        <div className="topbar__user-container-name">{`${name?.charAt(0)} ${surname?.charAt(0)}`}</div>
        <Button onClick={handleLogout} children={"logout"} variant={"danger"} size={"small"}></Button>
    </div>
  </div>
  )
};

