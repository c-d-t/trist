import React, { useState, cloneElement } from 'react';

import './Form.css';

const Form = ({ title, onSubmit, buttonName, children }) => {
  const [isLoading, setIsLoading] = useState(false);

  buttonName = !buttonName ? title : buttonName;

  const submit = () => {
    setIsLoading(true);
    onSubmit()
    .then(() => {
      setIsLoading(false)
    })
    .catch((e) => {
      console.error(e);
    });
  };

  if (!children.length)
  {
    children = [children];
  }

  return (
    <div className="form-container">
      <h1>{title}</h1>
      {children.map((child, index) => {
        if (index === children.length - 1)
        {
          return cloneElement(child, { key: child.key, onSubmit: submit });
        }
        return child;
      })}
      <button
        type="button"
        onClick={submit}
        style={isLoading ? loadingButton : null}
      >
        {isLoading ? 'loading' : buttonName}
      </button>
    </div>
  );
};

const loadingButton = {
  transform: 'translate(10%, 0)',
  backgroundColor: '#ddd',
  color: '#333',
};

export default Form;
