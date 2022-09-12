import React from "react";
import "./Button.css";

export interface Props {
  children?: string;
  type?: any;
  onClick?: () => {} ;
  variant?: "btn--primary" | "btn--danger";
  size?: "btn--small" | "btn--large";
}

// const STYLES = ["btn--primary", "btn--danger"];

// const SIZES = ["btn--small", "btn--large"];

const Button: React.FC<Props> = ({
  children,
  type,
  onClick = () => {},
  variant,
  size,
}) => {
  return (
    <button
      className={`btn ${variant} ${size}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
