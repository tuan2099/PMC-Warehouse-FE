/* eslint-disable prettier/prettier */
import React from 'react';
import { Formik } from 'formik';
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput, Button, useTheme } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';
function WarehouseForm({ formState }) {
  const theme = useTheme(); // theme setting

  return (
    <div>
      <Formik
        initialValues={formState}
        enableReinitialize
        // validation form
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        // setting submit
        onSubmit={(values) => {
          // convert data
          //   const transformValuesToApiFormat = (values) => {
          //     return {
          //       users: [
          //         {
          //           name: values.name,
          //           email: values.email,
          //           date_of_birth: values.date_of_birth || '',
          //           password: values.password,
          //           role: values.role
          //         }
          //       ]
          //     };
          //   };
          //   if (isEdit) {
          //     updateUserMutation.mutate({ userId: isEdit?.id, values });
          //   } else {
          //     addUserMutation.mutate(transformValuesToApiFormat(values), {
          //       onSuccess: (values) => {
          //         console.log(values);
          //       },
          //       onError: (error) => {
          //         alert(error.message);
          //       }
          //     });
          //   }
          console.log(values);
          handleCloseDialog();
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
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

            <FormControl fullWidth error={Boolean(touched.address && errors.address)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-address-register">Địa chỉ</InputLabel>
              <OutlinedInput
                id="outlined-adornment-address-register"
                type="address"
                value={values.address}
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

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Tạo kho
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default WarehouseForm;
