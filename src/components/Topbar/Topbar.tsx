import React from "react";
import { Link } from "react-router-dom";
import "./Topbar.scss";


const Topbar: React.FC = () => {
  return (
  <div className="topbar">
    <div className="topbar__logo">
        <img src="./logo.png"width="100px" alt="logo"></img>
    </div>
    <div className="topbar__user-container">
        <span>User</span>
    </div>
  </div>
  )
};

export default Topbar;
