/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, Box, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';

import InputField from 'ui-component/InputField';
import SelectField from 'ui-component/SelectField';

function ProductForm({ formState }) {
  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên sản phẩm là bắt buộc'),
    size: Yup.string().required('Kích thước là bắt buộc'),
    salePrice: Yup.number().required('Giá bán là bắt buộc').positive('Giá bán phải là số dương'),
    purchasePrice: Yup.number().required('Giá nhập là bắt buộc').positive('Giá nhập phải là số dương'),
    quantityIn: Yup.number().required('Số lượng tối thiểu là bắt buộc').min(0, 'Số lượng tối thiểu không thể nhỏ hơn 0'),
    quantityOut: Yup.number().required('Số lượng tối đa là bắt buộc').min(0, 'Số lượng tối đa không thể nhỏ hơn 0'),
    // image: Yup.string().url('URL hình ảnh không hợp lệ').required('Hình ảnh là bắt buộc'),
    status: Yup.string().required('Trạng thái là bắt buộc'),
    minimumQuantity: Yup.number().required('Số lượng tối thiểu là bắt buộc').min(0, 'Số lượng tối thiểu không thể nhỏ hơn 0'),
    maximumQuantity: Yup.number().required('Số lượng tối đa là bắt buộc').min(0, 'Số lượng tối đa không thể nhỏ hơn 0'),
    note: Yup.string().required('Ghi chú là bắt buộc')
  });

  const statusOptions = [
    { value: 'available', label: 'Còn hàng' },
    { value: 'unavailable', label: 'Hết hàng' },
    { value: 'discontinued', label: 'Ngừng kinh doanh' }
  ];

  return (
    <Formik
      initialValues={formState}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        setSubmitting(false);
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
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

          <InputField
            name="minimumQuantity"
            label="Số lượng tối thiểu"
            type="number"
            value={values.minimumQuantity}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />

          <InputField
            name="maximumQuantity"
            label="Số lượng tối đa"
            type="number"
            value={values.maximumQuantity}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />

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

          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                Tạo sản phẩm
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default ProductForm;
