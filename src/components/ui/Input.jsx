import React from 'react';

function Input({ label, type = 'text', value, onChange, placeholder, required = false }) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="form-input"
      />
    </div>
  );
}

export default Input;
