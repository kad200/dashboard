import { PropsWithChildren } from "react";
import { Sidebar, Topbar } from "components";
import "./Layout.scss"


export const Layout: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="layout">
      <Topbar />
      <Sidebar />
      <div className="page-content-wrapper">{props.children}</div>
    </div>
  );
};
