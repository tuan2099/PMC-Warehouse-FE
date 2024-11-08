/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, Box, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';

import InputField from 'ui-component/InputField';
import SelectField from 'ui-component/SelectField';

function ProductForm({ formState, productID, isEdit, createProductMutation, updateProductMutation, handleCloseDialog }) {
  // Xác thực dữ liệu form bằng Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên sản phẩm là bắt buộc'), // Xác thực trường 'name'
    size: Yup.string().required('Kích thước là bắt buộc'), // Xác thực trường 'size'
    salePrice: Yup.number().required('Giá bán là bắt buộc').positive('Giá bán phải là số dương'), // Xác thực trường 'salePrice'
    purchasePrice: Yup.number().required('Giá nhập là bắt buộc').positive('Giá nhập phải là số dương'), // Xác thực trường 'purchasePrice'
    quantityIn: Yup.number().required('Số lượng tối thiểu là bắt buộc').min(0, 'Số lượng tối thiểu không thể nhỏ hơn 0'), // Xác thực trường 'quantityIn'
    quantityOut: Yup.number().required('Số lượng tối đa là bắt buộc').min(0, 'Số lượng tối đa không thể nhỏ hơn 0'), // Xác thực trường 'quantityOut'
    status: Yup.string().required('Trạng thái là bắt buộc'), // Xác thực trường 'status'
    minimumQuantity: Yup.number().required('Số lượng tối thiểu là bắt buộc').min(0, 'Số lượng tối thiểu không thể nhỏ hơn 0'), // Xác thực trường 'minimumQuantity'
    maximumQuantity: Yup.number().required('Số lượng tối đa là bắt buộc').min(0, 'Số lượng tối đa không thể nhỏ hơn 0'), // Xác thực trường 'maximumQuantity'
    note: Yup.string().required('Ghi chú là bắt buộc') // Xác thực trường 'note'
  });

  const statusOptions = [
    { value: 'available', label: 'Còn hàng' }, // Trạng thái 'Còn hàng'
    { value: 'unavailable', label: 'Hết hàng' }, // Trạng thái 'Hết hàng'
    { value: 'discontinued', label: 'Ngừng kinh doanh' } // Trạng thái 'Ngừng kinh doanh'
  ];

  return (
    <Formik
      initialValues={formState} // Giá trị ban đầu của form lấy từ prop 'formState'
      enableReinitialize // Cập nhật lại form khi giá trị formState thay đổi
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const transformValues = {
          product: [values]
        };
        setSubmitting(true);
        if (isEdit) {
          updateProductMutation.mutate({ productId: productID.id, values });
        } else {
          createProductMutation.mutate(transformValues);
        }
        setSubmitting(false);
        handleCloseDialog();
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          {/* Trường nhập tên sản phẩm */}
          <InputField
            name="name"
            label="Tên sản phẩm"
            type="text"
            value={values.name}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />

          {/* Trường nhập kích thước sản phẩm */}
          <InputField
            name="size"
            label="Kích thước"
            type="text"
            value={values.size}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />

          {/* Trường nhập giá bán */}
          <InputField
            name="salePrice"
            label="Giá bán"
            type="number"
            value={values.salePrice}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />

          {/* Trường nhập giá nhập */}
          <InputField
            name="purchasePrice"
            label="Giá nhập"
            type="number"
            value={values.purchasePrice}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />

          {/* Trường nhập số lượng tối thiểu */}
          <InputField
            name="quantityIn"
            label="Số lượng tối thiểu"
            type="number"
            value={values.quantityIn}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />

          {/* Trường nhập số lượng tối đa */}
          <InputField
            name="quantityOut"
            label="Số lượng tối đa"
            type="number"
            value={values.quantityOut}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />

          {/* Trường nhập hình ảnh */}
          <InputField
            name="image"
            label="Hình ảnh"
            type="text"
            value={values.image}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />

          {/* Trường chọn trạng thái sản phẩm */}
          <SelectField
            name="status"
            label="Trạng thái"
            value={values.status}
            handleBlur={handleBlur}
            handleChange={handleChange}
            options={statusOptions}
            touched={touched}
            errors={errors}
          />

          {/* Trường nhập ghi chú */}
          <InputField
            name="note"
            label="Ghi chú"
            type="text"
            value={values.note}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />

          {/* Hiển thị lỗi nếu có */}
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}

          {/* Nút submit form */}
          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                {isEdit ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm'} {/* Hiển thị nút khác nhau khi ở chế độ tạo mới và chỉnh sửa */}
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default ProductForm;
