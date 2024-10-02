/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, useTheme } from '@mui/material';

// Component SelectField để tạo các trường chọn (dropdown) trong form
// Nhận vào các props:
// - name: tên của trường
// - label: nhãn cho trường
// - value: giá trị hiện tại của trường
// - handleBlur: hàm xử lý sự kiện khi người dùng rời khỏi trường
// - handleChange: hàm xử lý sự kiện khi giá trị của trường thay đổi
// - options: các lựa chọn để hiển thị trong dropdown
// - touched: theo dõi trạng thái đã được tương tác của trường
// - errors: chứa lỗi của trường nếu có

function SelectField({ name, label, value, handleBlur, handleChange, options, touched, errors }) {
  const theme = useTheme(); // theme setting
  return (
    <>
      <FormControl fullWidth error={Boolean(touched[name] && errors[name])} sx={{ ...theme.typography.customSelect }}>
        {/* Nhãn cho trường chọn */}
        <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>

        {/* Thành phần Select để hiển thị các tùy chọn */}
        <Select
          name={name} // Tên của trường
          onBlur={handleBlur} // Xử lý khi người dùng rời khỏi trường
          onChange={handleChange} // Xử lý khi giá trị của trường thay đổi
          value={value} // Giá trị hiện tại của trường
        >
          {/* Lặp qua danh sách options để hiển thị từng lựa chọn */}
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        {/* Hiển thị lỗi nếu trường đã được tương tác và có lỗi */}
        {touched[name] && errors[name] && (
          <FormHelperText error id={`standard-weight-helper-text-${name}`}>
            {errors[name]}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
}

export default SelectField;
