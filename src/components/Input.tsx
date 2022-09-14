import React from "react";

export interface Props {
  label?: string;
  type: string;
  id: string;
  value?: string;
  autoComplete?: "off" | "on";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  checked?: boolean;
}

const Input: React.FC<Props> = ({
  label,
  type,
  id,
  value,
  autoComplete,
  onChange,
  required,
  checked
}) => (
  <div className="form-group">
    {label && <label htmlFor={id}>{label}</label>}
    <br />
    <input
      type={type}
      id={id}
      value={value}
      autoComplete={autoComplete}
      onChange={onChange}
      required={required}
      checked={checked}
    />
  </div>
);

export default Input;
