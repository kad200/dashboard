import React from "react";
import "./Button.scss";

export interface Props {
  children?: React.ReactNode;
  type?: "button";
  onClick?: () => {} ;
  variant?: "primary" | "danger";
  size?: "small" | "large";
}

const Button: React.FC<Props> = ({
  children,
  type,
  onClick = () => {},
  variant,
  size,
}) => {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
