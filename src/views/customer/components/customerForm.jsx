/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Box, Button, Grid } from '@mui/material';
import * as Yup from 'yup'; // Thư viện để xác thực dữ liệu đầu vào
import { Formik } from 'formik'; // Formik dùng để quản lý form và xác thực dữ liệu
import InputField from 'ui-component/InputField'; // Component tùy chỉnh cho các trường đầu vào

// Component form cho khách hàng, hỗ trợ tạo mới và chỉnh sửa thông tin khách hàng
function CustomerForm({ formState, addCustomer, handleCloseDialog, isEdit, updateCustomer }) {
  return (
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
          // Nếu đang ở chế độ chỉnh sửa, gọi hàm updateCustomer
          updateCustomer.mutate({ customerId: formState?.userId, values });
        } else {
          // Nếu đang ở chế độ thêm mới, gọi hàm addCustomer
          addCustomer.mutate(values);
        }
        handleCloseDialog(); // Đóng dialog sau khi xử lý xong
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          {' '}
          {/* Tạo form không validate tự động HTML5 */}
          <Grid container spacing={2}>
            {/* Mỗi Grid item chứa một trường đầu vào */}
            <Grid item xs={12} sm={6}>
              <InputField
                id="name-register"
                label="Tên kho"
                type="text"
                value={values.name} // Giá trị của trường tên kho
                name="name"
                handleBlur={handleBlur} // Hàm xử lý khi người dùng blur khỏi trường
                handleChange={handleChange} // Hàm xử lý khi người dùng thay đổi nội dung
                touched={touched} // Đánh dấu trường đã được người dùng tương tác
                errors={errors} // Hiển thị lỗi nếu có
              />
            </Grid>
            {/* Trường nhập tên giám đốc tòa nhà */}
            <Grid item xs={12} sm={6}>
              <InputField
                id="pm-register"
                label="Giám đốc tòa nhà"
                type="text"
                value={values.pm}
                name="pm"
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
              />
            </Grid>
            {/* Trường nhập địa chỉ */}
            <Grid item xs={12} sm={6}>
              <InputField
                id="location-register"
                label="Địa chỉ"
                type="text"
                value={values.location}
                name="location"
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
              />
            </Grid>
            {/* Trường nhập chi nhánh */}
            <Grid item xs={12} sm={6}>
              <InputField
                id="branch-register"
                label="Chi nhánh"
                type="text"
                value={values.branch}
                name="branch"
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
              />
            </Grid>
            {/* Trường nhập tên người đại diện */}
            <Grid item xs={12} sm={6}>
              <InputField
                id="representative-register"
                label="Người đại diện"
                type="text"
                value={values.representative}
                name="representative"
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
              />
            </Grid>
            {/* Trường nhập trạng thái */}
            <Grid item xs={12} sm={6}>
              <InputField
                id="status-register"
                label="Trạng thái"
                type="text"
                value={values.status}
                name="status"
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
              />
            </Grid>
            {/* Trường nhập số điện thoại */}
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
            {/* Trường nhập ghi chú */}
            <Grid item xs={12} sm={6}>
              <InputField
                id="note-register"
                label="Ghi chú"
                type="text"
                value={values.note}
                name="note"
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
                {isEdit ? 'Cập nhật dự án' : 'Tạo dự án mới'}
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default CustomerForm;
