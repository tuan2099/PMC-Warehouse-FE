import React from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Box, Button, Grid } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import InputField from 'ui-component/InputField';
function CustomerForm({ formState, addCustomer, handleCloseDialog, isEdit, updateCustomer }) {
  return (
    <Formik
      initialValues={formState}
      enableReinitialize
      validationSchema={Yup.object().shape({})}
      onSubmit={(values) => {
        if (isEdit) {
          updateCustomer.mutate({ customerId: formState?.userId, values });
        } else {
          addCustomer.mutate(values);
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
                label="Tên kho"
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
