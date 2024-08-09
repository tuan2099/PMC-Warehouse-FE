/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Api support
import userApi from '../../../api/auth.api';
import { useMutation, useQuery } from '@tanstack/react-query';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
// eslint-disable-next-line no-unused-vars
function UserForm({ userDetail, handleDeleteUser, onClose, ...others }) {
  const theme = useTheme(); // theme setting
  const [strength, setStrength] = useState(0); // password setting
  const [checked, setChecked] = useState(true); // checkbox setting
  const [showPassword, setShowPassword] = useState(false); // password setting
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  useEffect(() => {
    if (userDetail) {
      setFormState({
        name: userDetail.name,
        email: userDetail.email,
        password: userDetail.email,
        role: userDetail.role
      });
    } else {
      setFormState({
        name: '',
        email: '',
        password: '',
        role: ''
      });
    }
  }, [userDetail]);
  // setting passwords input
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // get api use to refetch
  const { refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      return userApi.getAllUser();
    }
  });
  const changePassword = () => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  // add user logic
  const addUserMutation = useMutation({
    mutationFn: (body) => userApi.adduser(body),
    onSuccess: (user) => {
      console.log(user);
      alert('Thêm người dùng thành công!');
      refetch();
    }
  });

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
          if (userDetail) {
            console.log('update');
          } else {
            addUserMutation.mutate(transformValuesToApiFormat(values), {
              onSuccess: (values) => {
                console.log(values);
              },
              onError: (error) => {
                alert(error.message);
              }
            });
          }
          onClose();
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
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
                  {userDetail ? 'Cập nhật người dùng' : 'Tạo người dùng'}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default UserForm;
