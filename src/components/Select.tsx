import React from "react";

export interface Props {
  label?: string;
  id: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
// To manage the options 
  options?: [];
}

const Select: React.FC<Props> = ({
  label,
  id,
  value,
  onChange,
}) => (
  <div className="form-group">
    {label && <label htmlFor={id}>{label}</label>}
    <br />
    <select
      id={id}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default Select;
