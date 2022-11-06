import React from 'react';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, type, id, ...props }) => (
  <div className="auth-form__input">
    <input type={type} id={id} {...props} />
    {label && (
      <label className={`${type}-label`} htmlFor={id}>
        {label}
      </label>
    )}
  </div>
);
