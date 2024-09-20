/* eslint-disable prettier/prettier */
// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthWrapper1 from '../AuthWrapper1';
import Stack from '@mui/material/Stack';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import AuthFooter from 'ui-component/cards/AuthFooter';
// assets
import { isAxiosUnprocessableEntityError } from 'utils/utils';
import { Divider, Grid } from '@mui/material';
import Logo from 'ui-component/Logo';
import userApi from 'api/auth.api';
const AuthForgotPassword = ({ ...others }) => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const theme = useTheme();
  const navigate = useNavigate();
  const forgotPasswordMutation = useMutation({
    mutationFn: (body) => userApi.forgotPassWord(body)
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
                              Quên mật khẩu
                            </Typography>
                            <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                              Vui lòng nhập email để nhận lại mật khẩu
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Formik
                        initialValues={{
                          email: '',
                          submit: null
                        }}
                        validationSchema={Yup.object().shape({
                          email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
                        })}
                        onSubmit={(values, { setErrors, setSubmitting }) => {
                          forgotPasswordMutation.mutate(values, {
                            onSuccess: (data) => {
                              // Điều hướng sau khi gửi yêu cầu thành công, ví dụ trở về trang login
                              navigate('/pages/login/login3');
                            },
                            onError: (error) => {
                              setSubmitting(false);
                              if (isAxiosUnprocessableEntityError(error)) {
                                const formError = error.response?.data.message;
                                if (formError && formError.includes('email')) {
                                  setErrors({ email: formError });
                                } else {
                                  setErrors({ submit: formError });
                                }
                              }
                            }
                          });
                        }}
                      >
                        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                          <form noValidate onSubmit={handleSubmit} {...others}>
                            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                              <InputLabel htmlFor="outlined-adornment-email-forgot-password">Nhập Email</InputLabel>
                              <OutlinedInput
                                id="outlined-adornment-email-forgot-password"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address"
                              />
                              {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-forgot-password">
                                  {errors.email}
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
                                  Gửi yêu cầu đặt lại mật khẩu
                                </Button>
                              </AnimateButton>
                            </Box>

                            <Box sx={{ mt: 2 }}>
                              <Typography
                                variant="subtitle1"
                                color="secondary"
                                sx={{ cursor: 'pointer' }}
                                onClick={() => navigate('/pages/login/login3')}
                              >
                                Quay lại trang đăng nhập
                              </Typography>
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

export default AuthForgotPassword;
