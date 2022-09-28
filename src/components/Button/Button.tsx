import React from "react";
import "./Button.scss";

type ButtonType = JSX.IntrinsicElements["button"];

// export interface ButtonProps {
//   children?: React.ReactNode;
//   type?: "button";
//   onClick?: (event: React.MouseEvent<HTMLElement>) => void ;
//   variant?: "primary" | "danger";
//   size?: "small" | "large";
// }

export interface ButtonProps extends ButtonType { 
  children: React.ReactNode,
  variant: "primary" | "danger",
  size: "small" | "large",
 }


export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  onClick = () => {},
  variant,
  size,
  ...props
}) => {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};