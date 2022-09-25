import React from "react";
import "./Button.scss";

interface ButtonProps {
  children?: React.ReactNode;
  type?: "button";
  onClick?: (event: React.MouseEvent<HTMLElement>) => void ;
  variant?: "primary" | "danger";
  size?: "small" | "large";
}

const Button: React.FC<ButtonProps> = ({
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
