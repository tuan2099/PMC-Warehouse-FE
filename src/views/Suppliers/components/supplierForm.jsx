/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Box, Button, Grid } from '@mui/material';
import * as Yup from 'yup'; // Thư viện để xác thực dữ liệu đầu vào
import { Formik } from 'formik'; // Formik dùng để quản lý form và xác thực dữ liệu
import InputField from 'ui-component/InputField'; // Component tùy chỉnh cho các trường đầu vào
export default function SupplierForm({ formState, addSuppliers, isEdit, updateSuppliers, handleCloseDialog }) {
  return (
    <>
      <Formik
        initialValues={formState} // Khởi tạo giá trị của form từ formState (được truyền từ props)
        enableReinitialize // Khi formState thay đổi, form sẽ tự động cập nhật lại các giá trị đầu vào
        validationSchema={Yup.object().shape({
          // Khai báo các quy tắc xác thực cho các trường đầu vào
          // Ví dụ: tên kho phải là một chuỗi và bắt buộc phải có
        })}
        onSubmit={(values) => {
          // Xử lý khi người dùng submit form
          if (isEdit) {
            updateSuppliers.mutate({ suppliersId: formState?.suppliersId, values });
          } else {
            addSuppliers.mutate(values);
          }
          handleCloseDialog();
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            {' '}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputField
                  id="name-register"
                  label="Tên"
                  type="text"
                  value={values.name}
                  name="name"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  errors={errors}
                />
              </Grid>
              {/* Trường nhập tên giám đốc tòa nhà */}
              <Grid item xs={12} sm={6}>
                <InputField
                  id="address-register"
                  label="Địa chỉ"
                  type="text"
                  value={values.address}
                  name="address"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  errors={errors}
                />
              </Grid>
              {/* Trường nhập địa chỉ */}
              <Grid item xs={12} sm={6}>
                <InputField
                  id="email-register"
                  label="Email"
                  type="text"
                  value={values.email}
                  name="email"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  errors={errors}
                />
              </Grid>
              {/* Trường nhập chi nhánh */}
              <Grid item xs={12} sm={6}>
                <InputField
                  id="phoneNumber-register"
                  label="Số điện thoại"
                  type="text"
                  value={values.phoneNumber}
                  name="phoneNumber"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  errors={errors}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  {/* Hiển thị nút tùy vào chế độ (thêm mới hoặc chỉnh sửa) */}
                  {isEdit ? 'Cập nhật nhà cung câp' : 'Tạo nhà cung cấp mới'}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}
