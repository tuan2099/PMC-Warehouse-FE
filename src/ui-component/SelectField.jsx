import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

function SelectField({ name, label, value, handleBlur, handleChange, options = [], touched, errors, onValueChange }) {
    const theme = useTheme();

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        handleChange(event);
        if (onValueChange) {
            onValueChange(selectedValue);
        }
    };

    return (
        <>
            <FormControl fullWidth error={Boolean(touched?.[name] && errors?.[name])} sx={{ ...theme.typography.customSelect }}>
                <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>
                <Select name={name} onBlur={handleBlur} onChange={handleSelectChange} value={value || ''}>
                    {Array.isArray(options) && options.length > 0 ? (
                        options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled value="">
                            Không có tùy chọn nào
                        </MenuItem>
                    )}
                </Select>
                {touched?.[name] && errors?.[name] && (
                    <FormHelperText error id={`standard-weight-helper-text-${name}`}>
                        {errors[name]}
                    </FormHelperText>
                )}
            </FormControl>
        </>
    );
}

SelectField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired
        })
    ),
    touched: PropTypes.object,
    errors: PropTypes.object,
    onValueChange: PropTypes.func
};

SelectField.defaultProps = {
    value: '',
    handleBlur: () => {},
    options: [],
    touched: {},
    errors: {},
    onValueChange: null
};

export default SelectField;
