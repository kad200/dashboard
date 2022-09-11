import React from "react";
import "./button.css";

export interface Props {
  children?: string;
  type?: any;
  onClick?: () => void;
  buttonStyle?: string;
  buttonSize?: string;
}

// const STYLES = ["btn--primary", "btn--danger"];

// const SIZES = ["btn--small", "btn--large"];

const Button: React.FC<Props> = ({
  children,
  type,
  onClick = () => {},
  buttonStyle,
  buttonSize,
}) => {
  return (
    <button
      className={`btn ${buttonStyle} ${buttonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
