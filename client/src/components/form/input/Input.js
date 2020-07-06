import React from 'react';

import './Input.css';

const Input = ({ name, type, placeholder, value, setValue, onSubmit, error }) => {
  let errClass = '';
  if (error !== undefined)
  {
    if (error === '')
    {
      errClass = 'highlighted';
    }
    else
    {
      errClass = 'hasError';
    }
  }

  return (
    <div className="form-input">
      <p className="form-input-placeholder">{!placeholder ? name : placeholder}</p>
      <input
        className={`shake form-input ${errClass}`}
        name={name}
        type={type}
        value={value}
        onChange={setValue}
        onKeyDown={(e) => e.keyCode === 13 ? onSubmit() : null}
      />
      <span></span>
      <div className="error-message">{error}</div>
    </div>
  );
};

export default  Input;
