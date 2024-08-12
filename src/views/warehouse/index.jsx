/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import {
  Box,
  Dialog,
  DialogContent,
  Toolbar,
  AppBar,
  Button,
  IconButton,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  useTheme,
  TextField,
  Autocomplete,
  Grid,
  Stack
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  ModeEdit as ModeEditIcon,
  Close as CloseIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useMutation, useQuery } from '@tanstack/react-query';
import warehouseApi from '../../api/warehouse.api';
import WarehouseForm from './components/WarehouseForm';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';

function Warehouse() {
  const [openDialog, setOpenDialog] = useState();
  const [formState, setFormState] = useState({
    name: '',
    address: '',
    note: ''
  });
  const theme = useTheme(); // theme setting

  // setting columns for table users
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Tên kho', width: 350 },
    { field: 'address', headerName: 'Địa chỉ kho', width: 250 },
    { field: 'note', headerName: 'Ghi chú', width: 250 },
    { field: 'createdAt', headerName: 'Ngày tạo', width: 200 },
    { field: 'updatedAt', headerName: 'Ngày cập nhật gần nhất', with: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      renderCell: ({ id }) => (
        <>
          <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDeleteWarehouse(id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleUpdateUser(id)}>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={() => console.log(123)}>
            <SearchIcon />
          </IconButton>
        </>
      )
    }
  ];

  // Open & close ---> Dialog
  const handleOpenDialog = (dialogId) => {
    setOpenDialog(dialogId);
    console.log(dialogId);
  };

  const handleCloseDialog = (dialogId) => {
    setOpenDialog(null);
    if (dialogId === 'dialog1') {
      setFormState({
        name: '',
        email: '',
        password: '',
        role: ''
      });
      setIsEdit(false);
    } else if (dialogId === 'dialog2') {
      // Reset state cho dialog2 nếu cần
    }
  };

  // get api all warehouse
  const { data: WarehouseData, refetch } = useQuery({
    queryKey: ['warehouse'],
    queryFn: () => {
      return warehouseApi.getAllWarehouse();
    }
  });

  // delete warehouse
  const deleteWarehouseMutation = useMutation({
    mutationFn: warehouseApi.deleteWarehouse,
    onSuccess: () => {
      alert('Xóa kho hàng thành công');
      refetch();
    },
    onError: () => {
      alert('Xóa kho hàng thất bại');
      refetch();
    }
  });
  const handleDeleteWarehouse = (rowId) => {
    window.confirm('Are you sure you want to delete');
    deleteWarehouseMutation.mutate(rowId);
  };

  // add new warehouse

  // update warehouse

  return (
    <>
      <MainCard title="Quản lý kho hàng">
        <Button
          sx={{ mb: 2 }}
          variant="outlined"
          onClick={() => {
            handleOpenDialog('dialog1');
          }}
          startIcon={<AddIcon />}
        >
          Tạo kho hàng
        </Button>

        <Dialog onClose={() => handleCloseDialog('dialog1')} open={openDialog === 'dialog1'} maxWidth="xl" fullWidth>
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
                // email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
                // password: Yup.string().max(255).required('Password is required')
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
                  <Grid container>
                    <Grid xs={5}>
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
                    </Grid>
                    <Grid xs={5}>
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
                    </Grid>
                    <Grid xs={5}>
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
                    </Grid>
                    <Grid xs={5}>
                      <FormControl fullWidth error={Boolean(touched.note && errors.note)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-note-register">Loại hình kho</InputLabel>
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
                    </Grid>
                  </Grid>

                  <FormControl fullWidth error={Boolean(touched.note && errors.note)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-note-register">Thông tin thêm</InputLabel>
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

                  <FormControl fullWidth error={Boolean(touched.note && errors.note)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-note-register"></InputLabel>
                    <Autocomplete
                      fullWidth
                      disablePortal
                      value={values.note}
                      id="combo-box-demo"
                      options={[]}
                      sx={{ width: 300 }}
                      name="note"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      renderInput={(params) => <TextField {...params} label="Movie" />}
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
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
                      >
                        Tạo kho
                      </Button>
                    </AnimateButton>
                  </Box>
                </form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>

        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid rows={WarehouseData?.data} columns={columns} pageSize={5} checkboxSelection />
        </Box>
      </MainCard>
    </>
  );
}

export default Warehouse;
