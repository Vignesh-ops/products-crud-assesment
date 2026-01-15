import React from 'react';

const Select=({ label, value, onChange, options, required = false })=>{
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="form-select"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
