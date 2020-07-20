import React, { useState, useEffect, Children, cloneElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors } from '../../redux/actions/errorActions';

import './Form.css';

const globalValidation = (value, validator) => {
  const validatorErr = !validator ? '' : validator(value);
  if (validatorErr === '' && value.length === 0)
  {
    return 'Required field.';
  }
  
  return validatorErr;
}

const Form = ({ title, buttonName, onSubmit, children }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});

  const [formLoader, formErrors] = useSelector((state) => [state.loaders.formLoader, state.errors.formErrors]);

  buttonName = !buttonName ? title : buttonName;

  useEffect(() => {
    const initFields = {};
    Children.forEach(children, (child) => {
      initFields[child.props.name] = '';
    });
    setFields(initFields);
    return () => {
      dispatch(clearErrors());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newErrors = {};
    const newTouchedFields = {};
    Children.forEach(children, (child) => {
      if (fields[child.props.name] !== '' && fields[child.props.name] !== undefined)
      {
        newTouchedFields[child.props.name] = true;
      }
      
      if (!!touchedFields[child.props.name] || !!newTouchedFields[child.props.name])
      {
        const errorMessage = globalValidation(fields[child.props.name], child.props.validator);
        newErrors[child.props.name] = errorMessage;
      }
    });
    setTouchedFields({ ...touchedFields, ...newTouchedFields });
    setErrors(newErrors);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);


  const submit = () => {
    let missingField = false;
    const newErrors = {};
    Children.forEach(children, (child) => {
      const error = errors[child.props.name];
      if (error !== '' || error === undefined)
      {
        if (error === undefined)
        {
          newErrors[child.props.name] = 'Required';
        }
        missingField = true;
      }
    });
    if (missingField)
    {
      setErrors({ ...errors, ...newErrors });
      return;
    }
    dispatch(clearErrors());
    onSubmit(fields);
  };
  return (
    <div className="form-container">
      <h1>{title}</h1>
      {!formErrors ? null : Object.keys(formErrors).map((errorName, i) => (
        <div key={`formError${i}`} className="form-error">{formErrors[errorName]}</div>
      ))}
      {Children.map(children, (child) => {
        return cloneElement(child, {
          key: child.key,
          onSubmit: submit, 
          error: errors[child.props.name],
          value: fields[child.props.name] || '',
          setValue: (e) => {
            setFields({ ...fields, [child.props.name]: e.target.value });
          },
        });
      })}
      <button
        type="button"
        onClick={submit}
        style={formLoader ? loadingButton : null}
      >
        {formLoader ? 'loading' : buttonName}
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
