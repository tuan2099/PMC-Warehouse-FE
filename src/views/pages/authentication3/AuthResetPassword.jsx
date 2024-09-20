/* eslint-disable prettier/prettier */
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useMediaQuery from '@mui/material/useMediaQuery';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useMutation } from '@tanstack/react-query';
import { isAxiosUnprocessableEntityError } from 'utils/utils';
import AuthWrapper1 from '../AuthWrapper1';
import { Divider, Grid, Typography } from '@mui/material';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import userApi from 'api/auth.api';

const AuthResetPassword = ({ ...others }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Lấy token từ URL
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  // setting password input visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: (body) => userApi.resetPassWord(body)
  });

  return (
    <>
      <AuthWrapper1>
        <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item sx={{ mb: 3 }}>
                      <Link to="#" aria-label="logo">
                        <Logo />
                      </Link>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container direction={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
                        <Grid item>
                          <Stack alignItems="center" justifyContent="center" spacing={1}>
                            <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                              Rì sét mật khẩu
                            </Typography>
                            <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                              Vui lòng nhập mật khẩu mới
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Formik
                        initialValues={{
                          password: '',
                          confirmPassword: '',
                          submit: null
                        }}
                        validationSchema={Yup.object().shape({
                          password: Yup.string()
                            .min(6, 'Password should be at least 6 characters')
                            .max(255)
                            .required('Password is required'),
                          confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Passwords must match')
                            .required('Confirm Password is required')
                        })}
                        onSubmit={(values, { setErrors, setSubmitting }) => {
                          if (token) {
                            resetPasswordMutation.mutate(
                              { token, newPassword: values.password }, // Gửi token và mật khẩu mới
                              {
                                onSuccess: () => {
                                  // Redirect to login after successful reset
                                  navigate('/pages/login/login3');
                                },
                                onError: (error) => {
                                  setSubmitting(false);
                                  if (isAxiosUnprocessableEntityError(error)) {
                                    const formError = error.response?.data.message;
                                    if (formError) {
                                      setErrors({ submit: formError });
                                    }
                                  }
                                }
                              }
                            );
                          } else {
                            setErrors({ submit: 'Invalid or missing token' });
                            setSubmitting(false);
                          }
                        }}
                      >
                        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                          <form noValidate onSubmit={handleSubmit} {...others}>
                            <FormControl
                              fullWidth
                              error={Boolean(touched.password && errors.password)}
                              sx={{ ...theme.typography.customInput }}
                            >
                              <InputLabel htmlFor="outlined-adornment-password-reset">Password mới</InputLabel>
                              <OutlinedInput
                                id="outlined-adornment-password-reset"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
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
                                label="New Password"
                              />
                              {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-reset">
                                  {errors.password}
                                </FormHelperText>
                              )}
                            </FormControl>

                            <FormControl
                              fullWidth
                              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                              sx={{ ...theme.typography.customInput }}
                            >
                              <InputLabel htmlFor="outlined-adornment-confirm-password-reset">Nhập lại Password mới</InputLabel>
                              <OutlinedInput
                                id="outlined-adornment-confirm-password-reset"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={values.confirmPassword}
                                name="confirmPassword"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle confirm password visibility"
                                      onClick={handleClickShowConfirmPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                      size="large"
                                    >
                                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                label="Confirm New Password"
                              />
                              {touched.confirmPassword && errors.confirmPassword && (
                                <FormHelperText error id="standard-weight-helper-text-confirm-password-reset">
                                  {errors.confirmPassword}
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
                                <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
                                  Đặt lại mật khẩu
                                </Button>
                              </AnimateButton>
                            </Box>
                          </form>
                        )}
                      </Formik>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container direction="column" alignItems="center" xs={12}>
                        <Typography component={Link} to="/pages/register/register3" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                          Don&apos;t have an account?
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
            <AuthFooter />
          </Grid>
        </Grid>
      </AuthWrapper1>
    </>
  );
};

export default AuthResetPassword;
