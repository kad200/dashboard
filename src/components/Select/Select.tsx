import React from "react";
import "./Select.scss"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label?: string;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  placeholder,
  label,
  id,
  children,
  value,
  onChange,
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
    >
      {children}
    </select>
  </div>
);

