import React from "react";
import "./Input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  // id: string;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // required?: boolean;
  // checked?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type,
  id,
  value,
  autoComplete,
  onChange,
  required,
  checked,
  ...props
}) => (
  <div className="auth-form__input">
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      value={value}
      autoComplete={autoComplete}
      onChange={onChange}
      required={required}
      checked={checked}
      {...props}
    />
    {label && (
      <label className="checkbox-label" htmlFor={id}>
        {label}
      </label>
    )}
  </div>
);
