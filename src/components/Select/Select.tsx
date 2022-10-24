import React from "react";
import "./Select.scss";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select: React.FC<SelectProps> = ({
  placeholder,
  label,
  id,
  children,
  value,
  onChange,
  ...props
}) => (
  <div className="form-group">
    {label && <label htmlFor={id}>{label}</label>}
    <br />
    <select
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      {...props}
    >
      {children}
    </select>
  </div>
);
