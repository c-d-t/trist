import React from 'react';

import './Input.css';

const Input = ({ type, placeholder, value, setValue, onSubmit }) => {
  return (
    <div className="form-input">
      <p className="form-input-placeholder">{placeholder}</p>
      <input
        className="form-input"
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => (e.keyCode === 13) && (!!onSubmit) ? onSubmit() : null}
      />
      <span></span>
    </div>
  );
};

export default  Input;
