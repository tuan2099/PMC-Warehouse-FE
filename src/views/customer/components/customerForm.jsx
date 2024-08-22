/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, FormControl, useTheme, InputLabel, OutlinedInput, FormHelperText, Button } from '@mui/material';

function CustomerForm({ formState, addCustomer, handleCloseDialog, isEdit, updateCustomer }) {
  const theme = useTheme(); // theme setting
  console.log(formState);
  return (
    <>
      <Formik
        initialValues={formState}
        enableReinitialize
        // validation form
        validationSchema={Yup.object().shape({})}
        // setting submit
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
            <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-name-register">Tên người dùng</InputLabel>
              <OutlinedInput
                id="outlined-adornment-name-register"
                type="name"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.name && errors.name && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  {isEdit ? ' Cập nhật dự án' : 'Tạo dự án mới'}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default CustomerForm;
