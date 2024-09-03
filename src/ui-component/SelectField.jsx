/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

const SelectField = ({ name, label, value, handleBlur, handleChange, options, touched, errors }) => (
  <FormControl fullWidth error={Boolean(touched[name] && errors[name])}>
    <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>
    <Select name={name} onBlur={handleBlur} onChange={handleChange} value={value}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
    {touched[name] && errors[name] && (
      <FormHelperText error id={`standard-weight-helper-text-${name}`}>
        {errors[name]}
      </FormHelperText>
    )}
  </FormControl>
);

export default SelectField;
