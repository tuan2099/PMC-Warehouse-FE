/* eslint-disable prettier/prettier */
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import { useQuery, useMutation } from '@tanstack/react-query';
import userApi from '../../api/auth.api';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import MainCard from 'ui-component/cards/MainCard';
import { Dialog, DialogContent, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Link } from 'react-router-dom';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
function User() {
  const theme = useTheme(); // theme setting
  const [isEdit, setIsEdit] = useState();
  const [strength, setStrength] = useState(0); // password setting
  const [checked, setChecked] = useState(true); // checkbox setting
  const [showPassword, setShowPassword] = useState(false); // password setting
  const [openDialog, setOpenDialog] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Tên', width: 350 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'date_of_birth', headerName: 'Ngày sinh', width: 110 },
    { field: 'role', headerName: 'Quyền hạn', width: 110 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: ({ id }) => (
        <>
          <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDeleteUser(id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleUpdateUser(id)}>
            <ModeEditIcon />
          </IconButton>
        </>
      )
    }
  ];
  // call Api get user
  const { data: userData, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      return userApi.getAllUser();
    }
  });
  // opent Dialog - close
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormState({
      name: '',
      email: '',
      password: '',
      role: ''
    });
    setIsEdit(false);
  };

  // call Api delete user
  const deletePurchasesMutation = useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      refetch();
    }
  });

  const handleDeleteUser = (rowId) => {
    window.confirm('Are you sure you want to delete');
    deletePurchasesMutation.mutate(rowId);
  };
  // call Api get users
  const getUserMutation = useMutation({
    mutationFn: userApi.getUserById,
    onSuccess: (data) => {
      setIsEdit(data.data.userData);
      setFormState({
        name: data?.data?.userData?.name,
        email: data?.data?.userData?.email,
        password: data?.data?.userData?.password,
        role: data?.data?.userData?.role
      });
    }
  });

  const handleUpdateUser = (rowId) => {
    getUserMutation.mutate(rowId);
    handleOpenDialog();
  };

  // setting passwords input
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
  const updateUserMutation = useMutation({
    mutationFn: ({ userId, values }) => {
      console.log(userId, values);
      if (!userId) {
        throw new Error('User ID is missing');
      }
      return userApi.updateUser(Number(userId), values);
    },
    onSuccess: (user) => {
      console.log(user);
      alert('Cập nhật người dùng thành công!');
      refetch();
    }
  });

  return (
    <MainCard title="Quản lý người dùng">
      <Button onClick={handleOpenDialog} variant="outlined" startIcon={<AddIcon />}>
        Thêm người dùng
      </Button>
      <Dialog onClose={handleCloseDialog} open={openDialog}>
        <AppBar sx={{ position: 'relative', backgroundColor: '#fff' }} variant="">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="close" onClick={handleCloseDialog}>
              <CloseIcon color="primary" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
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
              if (isEdit) {
                updateUserMutation.mutate({ userId: isEdit?.id, values });
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
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                    >
                      {isEdit ? 'Cập nhật người dùng' : 'tạo người dùng'}
                    </Button>
                  </AnimateButton>
                </Box>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid rows={userData?.data} columns={columns} pageSize={5} checkboxSelection />
      </Box>
    </MainCard>
  );
}

export default User;
