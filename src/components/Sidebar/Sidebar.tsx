import React from "react";
import { Link } from "react-router-dom";

import "./Sidebar.scss";
import SidebarItem from "./SidebarItem";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      {SidebarItem.map((item) => {
        return (
            <Link className="sidebar__link-item" key={item.id} to={item.path}>
              {item.icon}
              <span style={{ marginLeft: "1rem" }}>{item.title}</span>
            </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
