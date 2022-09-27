import { Sidebar, Topbar } from "components";
import { PropsWithChildren } from "react";


// interface Props {
//   children: React.ReactNode;
// }

export const Layout: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="layout">
      <Topbar />
      <Sidebar />
      <div className="page-content-wrapper">{props.children}</div>
    </div>
  );
};
