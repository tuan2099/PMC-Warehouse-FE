import React from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Box, Button, Grid } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import InputField from 'ui-component/InputField';
export default function SupplierForm({ formState, addSuppliers, isEdit, updateSuppliers, handleCloseDialog }) {
  return (
    <>
      <Formik
        initialValues={formState}
        enableReinitialize
        validationSchema={Yup.object().shape({})}
        onSubmit={(values) => {
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
