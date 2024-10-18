/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Formik } from 'formik';
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput, Button, useTheme } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';

function WarehouseForm({ updateWarehouseMutaiton, formState, handleCloseDialog, createWarehouseMutation, isEdit }) {
  const theme = useTheme(); // Sử dụng chủ đề (theme) của MUI
  return (
    <>
      <Formik
        initialValues={formState} // Khởi tạo giá trị form dựa trên formState
        enableReinitialize // Cho phép khởi tạo lại giá trị nếu formState thay đổi
        // Validation cho form sử dụng Yup
        validationSchema={Yup.object().shape({
          // email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
          // password: Yup.string().max(255).required('Password is required')
        })}
        // Hàm xử lý khi submit form
        onSubmit={(values) => {
          // Hàm chuyển đổi dữ liệu đầu vào để phù hợp với API
          const transformValuesToApiFormat = (values) => {
            return {
              name: values.name,
              address: values.address,
              note: values.note || '', // Ghi chú có thể là chuỗi rỗng
              type: values.type,
              info: values.info
            };
          };

          if (isEdit) {
            // Nếu đang ở chế độ chỉnh sửa, gọi hàm updateWarehouseMutation
            updateWarehouseMutaiton.mutate({ warehouseId: isEdit?.id, values });
          } else {
            // Nếu đang ở chế độ tạo mới, gọi hàm createWarehouseMutation
            createWarehouseMutation.mutate(transformValuesToApiFormat(values), {
              onSuccess: (values) => {
                console.log(values);
              },
              onError: (error) => {
                alert(error.message);
              }
            });
          }
          handleCloseDialog(); // Đóng dialog sau khi xử lý xong
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className="Form-add-warehouse">
              {/* Trường Tên Kho */}
              <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-name-register">Tên Kho</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-name-register"
                  type="text"
                  value={values.name} // Giá trị của trường Tên Kho
                  name="name"
                  onBlur={handleBlur} // Hàm xử lý khi người dùng rời khỏi trường
                  onChange={handleChange} // Hàm xử lý khi giá trị thay đổi
                  inputProps={{}}
                />
                {touched.name && errors.name && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.name}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Trường Địa chỉ Kho */}
              <FormControl fullWidth error={Boolean(touched.address && errors.address)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-address-register">Địa chỉ</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-address-register"
                  type="text"
                  value={values.address} // Giá trị của trường Địa chỉ
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.address && errors.address && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.address}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Trường Ghi chú */}
              <FormControl fullWidth error={Boolean(touched.note && errors.note)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-note-register">Ghi chú</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-note-register"
                  type="text"
                  value={values.note} // Giá trị của trường Ghi chú
                  name="note"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.note && errors.note && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.note}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Trường Loại hình kho */}
              <FormControl fullWidth error={Boolean(touched.type && errors.type)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-type-register">Loại hình kho</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-type-register"
                  type="text"
                  value={values.type} // Giá trị của trường Loại hình kho
                  name="type"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.type && errors.type && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.type}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Trường Thông tin thêm */}
              <FormControl fullWidth error={Boolean(touched.info && errors.info)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-info-register">Thông tin thêm</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-info-register"
                  type="text"
                  value={values.info} // Giá trị của trường Thông tin thêm
                  name="info"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.info && errors.info && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.info}
                  </FormHelperText>
                )}
              </FormControl>
            </div>

            {/* Hiển thị lỗi chung nếu có */}
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            {/* Nút Submit */}
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  {isEdit ? 'Cập nhật kho' : 'Tạo kho'} {/* Hiển thị nút phụ thuộc vào trạng thái chỉnh sửa hay tạo mới */}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default WarehouseForm;
