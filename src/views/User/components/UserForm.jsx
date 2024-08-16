/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Checkbox,
  Button,
  IconButton,
  Typography,
  useTheme,
  Autocomplete,
  TextField
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

function UserForm({
  updateUserMutation,
  addUserMutation,
  handleClickShowPassword,
  handleMouseDownPassword,
  changePassword,
  isEdit,
  formState,
  showPassword,
  handleCloseDialog
}) {
  const theme = useTheme(); // theme setting
  const [strength, setStrength] = useState(0); // password setting
  const [checked, setChecked] = useState(true); // checkbox setting
  console.log(isEdit);
  const aiOptions = [
    { title: 'Admin', id: 1 },
    { title: 'Editor', id: 2 },
    { title: 'Viewer', id: 3 },
    { title: 'Viewer', id: 4 },
    { title: 'Viewer', id: 5 },
    { title: 'Viewer', id: 6 }
  ];
  return (
    <>
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
          const transformValuesToApiFormat = (values) => {
            return {
              users: [
                {
                  name: values.name,
                  email: values.email,
                  date_of_birth: values.date_of_birth || '',
                  password: values.password,
                  role: values.role
                }
              ]
            };
          };
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
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
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
                  changePassword(e.target.value);
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

            <FormControl fullWidth error={Boolean(touched.role && errors.role)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-role-register">Quyền hạn</InputLabel>
              <OutlinedInput
                id="outlined-adornment-role-register"
                type="role"
                value={values.role}
                name="role"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.role && errors.role && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.role}
                </FormHelperText>
              )}
            </FormControl>
            {isEdit.length === 0 ? (
              ''
            ) : (
              <>
                <FormControl fullWidth error={Boolean(touched.ai && errors.ai)} sx={{ ...theme.typography.customInput }}>
                  <Autocomplete
                    multiple
                    options={aiOptions}
                    getOptionLabel={(option) => option.title}
                    onChange={(event, value) => setFieldValue('ai', value)}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Quyền hạn"
                        variant="outlined"
                        placeholder="Select ais"
                        onBlur={handleBlur}
                        error={Boolean(touched.ai && errors.ai)}
                        helperText={touched.ai && errors.ai}
                      />
                    )}
                  />
                </FormControl>
              </>
            )}
            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  {isEdit.length === 0 ? 'tạo người dùng' : 'Cập nhật người dùng'}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default UserForm;
