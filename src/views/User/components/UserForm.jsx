/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Formik } from 'formik';
import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Button,
  IconButton,
  useTheme,
  Select,
  MenuItem
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as Yup from 'yup';
import warehouseApi from 'api/warehouse.api';
import customerApi from 'api/customer.api';
import { useQuery } from '@tanstack/react-query';

function UserForm({
  updateUserMutation,
  addUserMutation,
  handleClickShowPassword,
  handleMouseDownPassword,
  isEdit,
  formState,
  showPassword,
  handleCloseDialog
}) {
  const theme = useTheme();
  const { data: WarehouseData } = useQuery({
    queryKey: ['warehouse'],
    queryFn: () => {
      return warehouseApi.getAllWarehouse();
    }
  });
  const { data: CustomerData } = useQuery({
    queryKey: ['customer'],
    queryFn: () => {
      return customerApi.getAllCustomer();
    }
  });

  const transformValuesToApiFormat = (values) => {
    return {
      users: [
        {
          name: values.name,
          email: values.email,
          password: values.password,
          date_of_birth: values.date_of_birth || '',
          role: values.role || '',
          warehouseId: values.warehouseId || [],
          customerId: values.customerId || []
        }
      ]
    };
  };

  return (
    <>
      <Formik
        initialValues={formState}
        enableReinitialize
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
        })}
        onSubmit={(values) => {
          if (isEdit.length === 0) {
            addUserMutation.mutate(transformValuesToApiFormat(values), {
              onSuccess: (values) => {
                console.log(values);
              },
              onError: (error) => {
                alert(error.message);
              }
            });
          } else {
            updateUserMutation.mutate({ userId: isEdit?.id, values });
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

            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            {isEdit.length === 0 ? (
              <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-register"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  inputProps={{}}
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-register">
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>
            ) : (
              <>
                <FormControl fullWidth error={Boolean(touched.role && errors.role)} sx={{ ...theme.typography.customSelect }}>
                  <InputLabel htmlFor="outlined-adornment-password-register">Quyền hạn</InputLabel>
                  <Select
                    name="role"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.role}
                    label="Age"
                    inputProps={{}}
                  >
                    <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
                    <MenuItem value={'USER'}>USER</MenuItem>
                    <MenuItem value={'SUPPER_ADMIN'}>SUPPER_ADMIN</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth error={Boolean(touched.warehouseId && errors.warehouseId)} sx={{ ...theme.typography.customSelect }}>
                  <InputLabel htmlFor="outlined-adornment-password-register">Phân quyền kho</InputLabel>
                  <Select
                    name="warehouseId"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.warehouseId}
                    multiple
                    label="Age"
                    inputProps={{}}
                  >
                    {WarehouseData?.data &&
                      WarehouseData?.data?.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                <FormControl fullWidth error={Boolean(touched.customerId && errors.customerId)} sx={{ ...theme.typography.customSelect }}>
                  <InputLabel htmlFor="outlined-adornment-password-register">Phân quyền dự án</InputLabel>
                  <Select
                    name="customerId"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.customerId}
                    multiple
                    label="Age"
                    inputProps={{}}
                  >
                    {CustomerData
                      ? CustomerData?.data?.data?.map((item) => {
                          return (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          );
                        })
                      : []}
                  </Select>
                </FormControl>
              </>
            )}

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary">
                {isEdit.length === 0 ? 'Tạo người dùng' : 'Cập nhật người dùng'}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default UserForm;
