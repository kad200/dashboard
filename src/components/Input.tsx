import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  label?: string;
  placeholder?: string;
  type?: string;
  id: string;
  value?: string;
  autoComplete?: "off" | "on";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  checked?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type,
  id,
  value,
  autoComplete,
  onChange,
  required,
  checked,
}) => (
  <div className="form-group">
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      value={value}
      autoComplete={autoComplete}
      onChange={onChange}
      required={required}
      checked={checked}
    />
    {label && <label htmlFor={id}>{label}</label>}
  </div>
);

export default Input;
