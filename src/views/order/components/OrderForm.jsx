/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';
import { Formik, FieldArray } from 'formik';
import { Box, Typography, Button, Grid } from '@mui/material';
import InputField from 'ui-component/InputField';
import SelectField from 'ui-component/SelectField';
import { toast } from 'react-toastify';
import OrderItem from './OrderItem';
function OrderForm({ formState, userLogin, handleCloseDialog, createOrderMutation, suppliersData, ProductsData, refetch }) {
  const getCurrentDateTime = () => {
    const now = new Date();
    return `PN-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
  };

  const calculateTotalQuantity = (orderDetail) => {
    Array.isArray(orderDetail) ? orderDetail.reduce((total, dispatch) => total + Number(dispatch.quantity || 0), 0) : 0;
  };

  return (
    <div>
      <Formik
        initialValues={formState}
        enableReinitialize
        validationSchema={Yup.object().shape({})}
        onSubmit={(values) => {
          const formattedData = {
            purchaseOd: {
              orderCode: getCurrentDateTime(),
              purchaseDate: values.purchaseDate,
              purchaseType: values.purchaseType,
              purchaseQuantity: calculateTotalQuantity(values.orderDetail),
              purchaseTotalAmount: 1,
              purchaseVATAmount: values.purchaseVATAmount,
              purchaseTotalAmountAfterVAT: values.purchaseTotalAmountAfterVAT,
              note: values.note,
              paymentStatus: values.paymentStatus,
              userId: userLogin.id,
              warehouseID: values.warehouseID,
              supplierID: values.supplierId,
              orderDetail: values.orderDetail.map((dispatch) => ({
                quantity: dispatch.quantity,
                product: dispatch.product
              }))
            }
          };

          createOrderMutation.mutate(formattedData, {
            onSuccess: () => {
              handleCloseDialog();
              toast.success('Tạo phiếu nhập kho thành công', {
                position: 'top-right',
                autoClose: 3000, // Tự động đóng sau 3 giây
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              });
              refetch();
            },
            onError: (error) => {
              toast.error(`Tạo phiếu xuất kho thất bại: ${error.message}`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              });
            }
          });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 4 }}>
              Thông tin xuất kho
            </Typography>
            <div className="Form-add-warehouse">
              <InputField
                name="orderCode"
                label="Mã nhập kho"
                type="text"
                value={getCurrentDateTime()}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
                disabled
              />
              <SelectField
                name="warehouseID"
                label="Chọn kho"
                value={values.warehouseID}
                handleBlur={handleBlur}
                handleChange={(event) => {
                  handleChange(event);
                  const warehouse = userLogin?.user_warehouses.find((wh) => wh.id === event.target.value);
                  if (warehouse) {
                    setFieldValue(
                      'orderDetail',
                      warehouse.warehouse_inventories.map((inventory) => ({
                        quantity: '',
                        product: inventory.id,
                        price: inventory.salePrice,
                        totalPriceProduct: 0
                      }))
                    );
                  }
                }}
                options={userLogin?.user_warehouses?.map((item) => ({ value: item.id, label: item.name }))}
                touched={touched}
                errors={errors}
              />
              <InputField
                name="purchaseDate"
                label="Ngày nhập kho"
                type="date"
                value={values.purchaseDate}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
              />
              <SelectField
                name="purchaseType"
                label="Loại nhập kho"
                value={values.purchaseType}
                handleBlur={handleBlur}
                handleChange={handleChange}
                options={[
                  { value: 'Nhập Mới', label: 'Nhập Mới' },
                  { value: 'Nhập thay thế', label: 'Nhập thay thế' },
                  { value: 'Nhập vip', label: 'Nhập vip' }
                ]}
                touched={touched}
                errors={errors}
              />
              <InputField
                name="totalProductQuantity"
                label="Tổng số lượng sản phẩm"
                type="number"
                value={calculateTotalQuantity(values.orderDetail)}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
                disabled
              />
              <InputField
                name="note"
                label="Mô tả nhập kho"
                type="text"
                value={values.note}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
              />
            </div>
            <Typography variant="h4" gutterBottom sx={{ mb: 1, mt: 4 }}>
              Nhà cung cấp
            </Typography>
            <div className="Form-add-warehouse">
              <SelectField
                name="supplierId"
                label="Nhà cung cấp"
                value={values.supplierId}
                handleBlur={handleBlur}
                handleChange={handleChange}
                options={suppliersData?.data?.data.map((item) => ({ value: item.id, label: item.name }))}
                touched={touched}
                errors={errors}
              />
              <InputField
                name="purchaseVATAmount"
                label="VAT"
                type="number"
                value={values.purchaseVATAmount}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
              />
            </div>
            <Typography variant="h4" gutterBottom sx={{ mb: 1, mt: 4 }}>
              Nhân viên
            </Typography>
            <div className="Form-add-warehouse">
              <InputField
                name="userID"
                label="Người nhập kho"
                type="text"
                value={userLogin?.name}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
                disabled
              />
            </div>

            <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 4 }}>
              Thêm biển bảng
            </Typography>

            <FieldArray name="orderDetail">
              {({ push, remove }) => (
                <>
                  {values.orderDetail.map((dispatch, index) => (
                    <OrderItem
                      key={index}
                      index={index}
                      dispatch={dispatch}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      remove={remove}
                      touched={touched}
                      errors={errors}
                      ProductsData={ProductsData?.data?.data}
                    />
                  ))}
                  <Button onClick={() => push({ quantity: '', product: '', price: 0, totalPriceProduct: 0 })} color="primary">
                    Thêm biển bảng
                  </Button>
                </>
              )}
            </FieldArray>

            <Box sx={{ mt: 8, bgcolor: '#E3F2FD', pt: 6, pb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={8}></Grid>
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Tổng số tiền:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: '700' }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                      .format(values.orderDetail.reduce((acc, item) => acc + (item.purchaseTotalAmount || 0), 0))
                      .replace('₫', 'đ')}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation size="large" type="submit" variant="contained" color="secondary">
                  Tạo phiếu nhập kho
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default OrderForm;
