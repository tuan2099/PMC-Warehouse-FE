/* eslint-disable prettier/prettier */
import React from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';
import { Formik, FieldArray } from 'formik';
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput, Button, Typography, useTheme } from '@mui/material';

function WarehouseDispatchForm({ formState, createWarehouseMutation }) {
  const theme = useTheme(); // theme setting

  return (
    <>
      <Formik
        initialValues={formState}
        enableReinitialize
        // validation form
        validationSchema={Yup.object().shape({
          exportCode: Yup.string().required('Mã xuất kho là bắt buộc'),
          exportDate: Yup.date().required('Ngày xuất kho là bắt buộc').nullable(),
          exportType: Yup.string().required('Loại xuất kho là bắt buộc'),
          totalProductQuantity: Yup.number().min(1, 'Số lượng sản phẩm phải lớn hơn 0').required('Tổng số lượng sản phẩm là bắt buộc'),
          totalAmount: Yup.number().min(0, 'Tổng số tiền phải lớn hơn hoặc bằng 0').required('Tổng số tiền là bắt buộc'),
          exportDescription: Yup.string().max(500, 'Mô tả xuất kho không quá 500 ký tự').required('Mô tả xuất kho là bắt buộc'),
          recipient: Yup.string().required('Người nhận là bắt buộc'),
          userID: Yup.number().required('User ID là bắt buộc'),
          warehouseID: Yup.number().required('Warehouse ID là bắt buộc'),
          dispatches: Yup.array().of(
            Yup.object().shape({
              quantity: Yup.number().min(1, 'Số lượng sản phẩm phải lớn hơn 0').required('Số lượng sản phẩm là bắt buộc'),
              product: Yup.number().required('Product ID là bắt buộc')
            })
          )
        })}
        // setting submit
        onSubmit={(values) => {
          const formattedData = {
            warehouseDcp: {
              exportCode: values.exportCode,
              exportDate: values.exportDate, // định dạng ngày tháng
              exportType: values.exportType,
              totalProductQuantity: values.totalProductQuantity,
              totalAmount: values.totalAmount,
              exportDescription: values.exportDescription,
              recipient: values.recipient,
              userID: values.userID,
              warehouseID: values.warehouseID,
              dispatches: values.dispatches.map((dispatch) => ({
                quantity: dispatch.quantity,
                product: dispatch.product
              }))
            }
          };
          createWarehouseMutation.mutate(formattedData, {
            onSuccess: () => {
              alert('Tạo phiếu xuất kho thành công!');
            },
            onError: (error) => {
              alert(error.message);
            }
          });
          // Log dữ liệu đã format để gửi lên server
          console.log(formattedData);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Typography variant="h3" gutterBottom>
              Thông tin xuất kho
            </Typography>
            <div className="Form-add-warehouse">
              <FormControl fullWidth error={Boolean(touched.exportCode && errors.exportCode)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-exportCode">Mã xuất kho</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-exportCode"
                  type="text"
                  value={values.exportCode}
                  name="exportCode"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.exportCode && errors.exportCode && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.exportCode}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth error={Boolean(touched.exportDate && errors.exportDate)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-exportDate">Ngày xuất kho</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-exportDate"
                  type="date"
                  value={values.exportDate}
                  name="exportDate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.exportDate && errors.exportDate && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.exportDate}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth error={Boolean(touched.exportType && errors.exportType)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-exportType">Loại xuất kho</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-exportType"
                  type="text"
                  value={values.exportType}
                  name="exportType"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.exportType && errors.exportType && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.exportType}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.totalProductQuantity && errors.totalProductQuantity)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-totalProductQuantity">Tổng số lượng sản phẩm</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-totalProductQuantity"
                  type="number"
                  value={values.totalProductQuantity}
                  name="totalProductQuantity"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.totalProductQuantity && errors.totalProductQuantity && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.totalProductQuantity}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth error={Boolean(touched.totalAmount && errors.totalAmount)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-totalAmount">Tổng số tiền</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-totalAmount"
                  type="number"
                  value={values.totalAmount}
                  name="totalAmount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.totalAmount && errors.totalAmount && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.totalAmount}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.exportDescription && errors.exportDescription)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-exportDescription">Mô tả xuất kho</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-exportDescription"
                  type="text"
                  value={values.exportDescription}
                  name="exportDescription"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.exportDescription && errors.exportDescription && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.exportDescription}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth error={Boolean(touched.recipient && errors.recipient)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-recipient">Người nhận</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-recipient"
                  type="text"
                  value={values.recipient}
                  name="recipient"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.recipient && errors.recipient && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.recipient}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth error={Boolean(touched.userID && errors.userID)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-userID">User ID</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-userID"
                  type="number"
                  value={values.userID}
                  name="userID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.userID && errors.userID && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.userID}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth error={Boolean(touched.warehouseID && errors.warehouseID)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-warehouseID">Warehouse ID</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-warehouseID"
                  type="number"
                  value={values.warehouseID}
                  name="warehouseID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.warehouseID && errors.warehouseID && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.warehouseID}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <Typography variant="h3" gutterBottom sx={{ mt: 2, mb: 4 }}>
              Sản phẩm
            </Typography>
            <FieldArray name="dispatches">
              {({ push, remove }) => (
                <>
                  {values.dispatches.map((dispatch, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <div className="form-add-detail">
                        <FormControl
                          fullWidth
                          error={Boolean(touched.dispatches?.[index]?.quantity && errors.dispatches?.[index]?.quantity)}
                        >
                          <InputLabel htmlFor={`outlined-adornment-dispatch-quantity-${index}`}>Số lượng</InputLabel>
                          <OutlinedInput
                            id={`outlined-adornment-dispatch-quantity-${index}`}
                            type="number"
                            value={dispatch.quantity}
                            name={`dispatches.${index}.quantity`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                          />
                          {touched.dispatches?.[index]?.quantity && errors.dispatches?.[index]?.quantity && (
                            <FormHelperText error>{errors.dispatches[index].quantity}</FormHelperText>
                          )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.dispatches?.[index]?.product && errors.dispatches?.[index]?.product)}>
                          <InputLabel htmlFor={`outlined-adornment-dispatch-product-${index}`}>Product ID</InputLabel>
                          <OutlinedInput
                            id={`outlined-adornment-dispatch-product-${index}`}
                            type="number"
                            value={dispatch.product}
                            name={`dispatches.${index}.product`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                          />
                          {touched.dispatches?.[index]?.product && errors.dispatches?.[index]?.product && (
                            <FormHelperText error>{errors.dispatches[index].product}</FormHelperText>
                          )}
                        </FormControl>
                        <FormControl
                          fullWidth
                          error={Boolean(touched.dispatches?.[index]?.QtyInStock && errors.dispatches?.[index]?.QtyInStock)}
                        >
                          <InputLabel htmlFor={`outlined-adornment-dispatch-QtyInStock-${index}`}>Số lượng tồn trong kho</InputLabel>
                          <OutlinedInput
                            id={`outlined-adornment-dispatch-QtyInStock-${index}`}
                            type="number"
                            value={dispatch.QtyInStock}
                            name={`dispatches.${index}.QtyInStock`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                          />
                          {touched.dispatches?.[index]?.QtyInStock && errors.dispatches?.[index]?.QtyInStock && (
                            <FormHelperText error>{errors.dispatches[index].QtyInStock}</FormHelperText>
                          )}
                        </FormControl>
                        <FormControl
                          fullWidth
                          error={Boolean(touched.dispatches?.[index]?.totalPriceProduct && errors.dispatches?.[index]?.totalPriceProduct)}
                        >
                          <InputLabel htmlFor={`outlined-adornment-dispatch-totalPriceProduct-${index}`}>totalPriceProduct ID</InputLabel>
                          <OutlinedInput
                            id={`outlined-adornment-dispatch-totalPriceProduct-${index}`}
                            type="number"
                            value={dispatch.totalPriceProduct}
                            name={`dispatches.${index}.totalPriceProduct`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                          />
                          {touched.dispatches?.[index]?.totalPriceProduct && errors.dispatches?.[index]?.totalPriceProduct && (
                            <FormHelperText error>{errors.dispatches[index].totalPriceProduct}</FormHelperText>
                          )}
                        </FormControl>
                        <Button onClick={() => remove(index)} color="error" sx={{ padding: '0', height: '90%' }}>
                          Xóa biển bảng
                        </Button>
                      </div>
                    </Box>
                  ))}

                  <Button
                    onClick={() =>
                      push({
                        quantity: '',
                        product: ''
                      })
                    }
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    Thêm biển bảng
                  </Button>
                </>
              )}
            </FieldArray>

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Submit
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default WarehouseDispatchForm;
