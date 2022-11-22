import React from "react";
import "./Button.scss";

type ButtonType = JSX.IntrinsicElements["button"];

export interface ButtonProps extends ButtonType {
  children: React.ReactNode;
  variant: "primary" | "danger";
  size: "small" | "large";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  variant,
  size,
  ...props
}) => {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
