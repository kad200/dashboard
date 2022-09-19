import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
}

const Select: React.FC<SelectProps> = ({ label, id, children, value, onChange }) => (
  <div className="form-group">
    {label && <label htmlFor={id}>{label}</label>}
    <br />
    <select id={id} value={value} onChange={onChange} required>
      {children}
    </select>
  </div>
);

export default Select;
