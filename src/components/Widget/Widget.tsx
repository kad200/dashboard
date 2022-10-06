import "./Widget.scss";

import { Link } from "react-router-dom";

const Widget = ({ data }: any) => {
  return (
    <div className="widget">
      <div className="widget__title">{data.title}</div>
      <div className="widget__counter">{data.length}</div>
      <div className="widget__footer">
        <div className="widget__link">
          <Link to={data.link.path} children={data.link.name} />
        </div>
        <span className="Widget__icon">{data.icon}</span>
      </div>
    </div>
  );
};

export default Widget;
