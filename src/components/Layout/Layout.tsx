import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = (props: Props) => {
  return (
    <div className="layout">
      <Topbar />
      <Sidebar />
      <div className="page-content-wrapper">{props.children}</div>
    </div>
  );
};

export default Layout;
