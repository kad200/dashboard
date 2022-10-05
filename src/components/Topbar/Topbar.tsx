import React from "react";
import { useNavigate } from "react-router-dom";
import "./Topbar.scss";


export const Topbar: React.FC = () => {
  const navigate = useNavigate();

  return (
  <div className="topbar">
    <div className="topbar__logo">
        <img onClick={() => navigate("/")} src="/logo.png"width="100px" alt="logo"></img>
    </div>
    <div className="topbar__user-container">
        <span>User</span>
    </div>
  </div>
  )
};

