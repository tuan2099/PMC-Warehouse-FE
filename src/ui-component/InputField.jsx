/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

// Component InputField để tạo các trường nhập liệu (input) trong form
// Nhận vào các props:
// - name: tên của trường
// - label: nhãn cho trường
// - type: loại input (text, number, password, v.v.)
// - value: giá trị hiện tại của trường
// - handleBlur: hàm xử lý sự kiện khi người dùng rời khỏi trường
// - handleChange: hàm xử lý sự kiện khi giá trị của trường thay đổi
// - touched: theo dõi trạng thái đã được tương tác của trường
// - errors: chứa lỗi của trường nếu có
// - disabled: trạng thái khóa trường (người dùng không thể chỉnh sửa), mặc định là false

const InputField = ({ name, label, type, value, handleBlur, handleChange, touched, errors, disabled = false }) => (
  <FormControl fullWidth error={Boolean(touched[name] && errors[name])}>
    {/* Nhãn cho trường nhập liệu */}
    <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>

    {/* Input dưới dạng OutlinedInput */}
    <OutlinedInput
      id={`outlined-adornment-${name}`} // Thiết lập id của input, dựa trên tên của trường
      type={type} // Loại input (text, number, v.v.)
      value={value} // Giá trị hiện tại của input
      name={name} // Tên của trường, dùng để quản lý trong form
      onBlur={handleBlur} // Xử lý khi người dùng rời khỏi input
      onChange={handleChange} // Xử lý khi giá trị input thay đổi
      inputProps={{}} // Thuộc tính bổ sung cho input nếu cần
      disabled={disabled} // Xác định liệu input có bị khóa hay không
    />

    {/* Hiển thị lỗi nếu trường đã được tương tác và có lỗi */}
    {touched[name] && errors[name] && (
      <FormHelperText error id={`standard-weight-helper-text-${name}`}>
        {errors[name]} {/* Thông báo lỗi hiển thị dưới input */}
      </FormHelperText>
    )}
  </FormControl>
);

export default InputField;
