/* eslint-disable prettier/prettier */
import { Button, FormControl, FormHelperText, InputLabel, OutlinedInput, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import React from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';

// eslint-disable-next-line react/prop-types
function ProductForm({ formState }) {
  const theme = useTheme(); // theme setting

  return (
    <>
      <Formik
        initialValues={formState}
        enableReinitialize
        // validation form
        validationSchema={Yup.object().shape({
          // email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
          // password: Yup.string().max(255).required('Password is required')
        })}
        // setting submit
        onSubmit={(values) => {
          // convert data
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className="Form-add-warehouse">
              <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-name-register">Tên Kho</InputLabel>
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
              <FormControl fullWidth error={Boolean(touched.size && errors.size)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-size-register">Kích thước</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-size-register"
                  type="size"
                  value={values.size}
                  name="size"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.size && errors.size && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.size}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth error={Boolean(touched.note && errors.note)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-note-register">Ghi chú</InputLabel>
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
              <FormControl fullWidth error={Boolean(touched.type && errors.type)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-type-register">Loại hình kho</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-type-register"
                  type="type"
                  value={values.type}
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
              <FormControl fullWidth error={Boolean(touched.info && errors.info)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-info-register">Thông tin thêm</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-info-register"
                  type="info"
                  value={values.info}
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
    </>
  );
}

export default ProductForm;
