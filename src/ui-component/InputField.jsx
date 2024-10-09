/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput, useTheme } from '@mui/material';

function InputField({ name, label, type, value, handleBlur, handleChange, touched, errors, disabled = false }) {
  const theme = useTheme();
  return (
    <>
      <FormControl fullWidth error={Boolean(touched[name] && errors[name])} sx={{ ...theme.typography.customInput }}>
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
    </>
  );
}

export default InputField;
