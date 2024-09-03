/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

const InputField = ({ name, label, type, value, handleBlur, handleChange, touched, errors, disabled = false }) => (
  <FormControl fullWidth error={Boolean(touched[name] && errors[name])}>
    <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>
    <OutlinedInput
      id={`outlined-adornment-${name}`}
      type={type}
      value={value}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      inputProps={{}}
      disabled={disabled}
    />
    {touched[name] && errors[name] && (
      <FormHelperText error id={`standard-weight-helper-text-${name}`}>
        {errors[name]}
      </FormHelperText>
    )}
  </FormControl>
);

export default InputField;
