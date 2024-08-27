/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';

// MUI components
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Box, FormControl, useTheme, InputLabel, OutlinedInput, FormHelperText, Button } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

function CustomerForm({ formState, addCustomer, handleCloseDialog, isEdit, updateCustomer }) {
  const theme = useTheme(); // theme setting
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
            <FormControl fullWidth error={Boolean(touched.pm && errors.pm)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-pm-register">Tên người dùng</InputLabel>
              <OutlinedInput
                id="outlined-adornment-pm-register"
                type="pm"
                value={values.pm}
                name="pm"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.pm && errors.pm && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.pm}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.location && errors.location)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-location-register">Tên người dùng</InputLabel>
              <OutlinedInput
                id="outlined-adornment-location-register"
                type="location"
                value={values.location}
                name="location"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.location && errors.location && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.location}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.branch && errors.branch)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-branch-register">Tên người dùng</InputLabel>
              <OutlinedInput
                id="outlined-adornment-branch-register"
                type="branch"
                value={values.branch}
                name="branch"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.branch && errors.branch && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.branch}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.representative && errors.representative)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-representative-register">Tên người dùng</InputLabel>
              <OutlinedInput
                id="outlined-adornment-representative-register"
                type="representative"
                value={values.representative}
                name="representative"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.representative && errors.representative && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.representative}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.status && errors.status)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-status-register">Tên người dùng</InputLabel>
              <OutlinedInput
                id="outlined-adornment-status-register"
                type="status"
                value={values.status}
                name="status"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.status && errors.status && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.status}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.phoneNumber && errors.phoneNumber)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-phoneNumber-register">Tên người dùng</InputLabel>
              <OutlinedInput
                id="outlined-adornment-phoneNumber-register"
                type="phoneNumber"
                value={values.phoneNumber}
                name="phoneNumber"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.phoneNumber}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.note && errors.note)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-note-register">Tên người dùng</InputLabel>
              <OutlinedInput
                id="outlined-adornment-note-register"
                type="note"
                value={values.note}
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
