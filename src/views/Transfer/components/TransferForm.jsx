/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Formik, FieldArray } from 'formik';
import { Box, Typography, Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import InputField from 'ui-component/InputField';
import SelectField from 'ui-component/SelectField';
import transferApi from 'api/transfer.api';

const INITIAL_STATE = {
  transferCode: '',
  transferDate: '',
  fromWarehouseID: '',
  toWarehouseID: '',
  note: '',
  userId: '',
  transferDetail: [
    {
      product: '',
      quantity: ''
    }
  ]
};
function TransferForm({ userLogin }) {
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [searchParams] = useSearchParams();
  const isAddMode = searchParams.get('mode') === 'add';
  const TPid = searchParams.get('id');
  const getCurrentDateTime = () => {
    const now = new Date();
    return `PC-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
  };

  const { data: TransferData } = useQuery({
    queryKey: ['transfer', TPid],
    queryFn: async () => {
      if (TPid) {
        const response = await transferApi.getTransferById(TPid);
        return response.data;
      }
      return null;
    }
  });

  useEffect(() => {}, [TransferData]);

  const handleSubmitForm = (values) => {
    const formatData = {
      transferCode: getCurrentDateTime(),
      transferDate: values.transferDate,
      fromWarehouseID: values.fromWarehouseID,
      toWarehouseID: values.toWarehouseID,
      note: values.note,
      userId: userLogin.id,
      transferDetail: values.transferDetail.map((detail) => ({
        quantity: detail.quantity,
        product: detail.product
      }))
    };

    if (isAddMode) {
    }
  };
  return (
    <>
      <Formik initialValues={formState} enableReinitialize onSubmit={handleSubmitForm}>
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 4 }}>
              Thông tin chuyển kho
            </Typography>
            <div className="Form-add-warehouse">
              <InputField
                name="transferCode"
                label="Mã chuyển kho"
                type="text"
                value={getCurrentDateTime()}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
                disabled
              />
              <InputField
                name="transferDate"
                label="Ngày chuyển kho"
                type="date"
                value={values.transferDate}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
              />
              <SelectField
                name="fromWarehouseID"
                label="Chọn kho"
                value={values.fromWarehouseID}
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
              <SelectField
                name="toWarehouseID"
                label="Chọn kho"
                value={values.toWarehouseID}
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
            </div>
            <Typography variant="h4" gutterBottom sx={{ mb: 1, mt: 4 }}>
              Nhân viên
            </Typography>
            <div className="Form-add-warehouse">
              <InputField
                name="userId"
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

            {/* <FieldArray name="orderDetail">
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
            </FieldArray> */}

            {/* <Box sx={{ mt: 8, bgcolor: '#E3F2FD', pt: 6, pb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={8}></Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Tổng số tiền:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: '700' }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                      .format(values.orderDetail.reduce((acc, item) => acc + (item.totalPriceProduct || 0), 0))
                      .replace('₫', 'đ')}
                  </Typography>
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">VAT ({values.vat}%):</Typography>
                  <Typography variant="body1" sx={{ fontWeight: '700' }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                      .format(
                        (values.orderDetail.reduce((acc, item) => acc + (item.totalPriceProduct || 0), 0) *
                          (values.purchaseVATAmount || 0)) /
                          100
                      )
                      .replace('₫', 'đ')}
                  </Typography>
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Tổng tiền sau VAT:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: '700' }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                      .format(values.purchaseVATAmount)
                      .replace('₫', 'đ')}
                  </Typography>
                </Grid>
              </Grid>
            </Box> */}

            <Box sx={{ mt: 2 }}>
              <Button disableElevation size="large" type="submit" variant="contained" color="secondary">
                Tạo phiếu chuyển kho
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default TransferForm;
