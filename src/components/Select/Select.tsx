import React from "react";
import "./Select.scss";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  id,
  children,
  ...props
}) => (
  <div className="form-group">
    {label && <label htmlFor={id}>{label}</label>}
    <br />
    <select
      required
      {...props}
    >
      {children}
    </select>
  </div>
);
