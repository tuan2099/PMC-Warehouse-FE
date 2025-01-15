import React from 'react';
import { Formik } from 'formik';
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput, Button, useTheme } from '@mui/material';
import * as Yup from 'yup';

function WarehouseForm({ updateWarehouseMutaiton, formState, handleCloseDialog, createWarehouseMutation, isEdit }) {
  const theme = useTheme();
  return (
    <>
      <Formik
        initialValues={formState}
        enableReinitialize
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .min(3, 'Tên kho phải có ít nhất 3 ký tự')
            .max(255, 'Tên kho không được vượt quá 255 ký tự')
            .required('Tên kho là bắt buộc'),
          address: Yup.string()
            .min(5, 'Địa chỉ phải có ít nhất 5 ký tự')
            .max(255, 'Địa chỉ không được vượt quá 255 ký tự')
            .required('Địa chỉ là bắt buộc')
        })}
        onSubmit={(values) => {
          const transformValuesToApiFormat = (values) => {
            return {
              name: values.name,
              address: values.address
            };
          };

          if (isEdit) {
            updateWarehouseMutaiton.mutate({ warehouseId: isEdit?.id, values });
          } else {
            createWarehouseMutation.mutate(transformValuesToApiFormat(values), {
              onSuccess: (values) => {
                console.log(values);
              },
              onError: (error) => {
                alert(error.message);
              }
            });
          }
          handleCloseDialog();
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className="Form-add-warehouse">
              <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-name-register">Tên Kho</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-name-register"
                  type="text"
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
                  type="text"
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
            </div>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary">
                {isEdit ? 'Cập nhật kho' : 'Tạo kho'}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default WarehouseForm;
