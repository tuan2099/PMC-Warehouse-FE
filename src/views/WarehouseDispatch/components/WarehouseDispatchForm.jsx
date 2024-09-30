/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';
import { Formik, FieldArray } from 'formik';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import InputField from 'ui-component/InputField';
import SelectField from 'ui-component/SelectField';
import DispatchItem from './DispatchItem';
import warehouseDispatchApi from 'api/warehouseDispatch';

const INITIAL_STATE = {
  createdAt: '',
  customer: '',
  // { id: 1, name: 'KHO A', pm: 'ABC', location: '57 HTK', branch: 'HN' }
  customerEmail: '',
  customerID: '',
  exportCode: '',
  exportDate: '',
  exportDescription: '',
  exportType: '',
  id: null,
  recipient: '',
  signatureCustomer: null,
  signatureUser: null,
  token: null,
  tokenExpiresAt: null,
  totalAmount: '',
  totalProductQuantity: null,
  updatedAt: '',
  user: '',
  // {
  //   id: 1,
  //   name: 'hoangduy',
  //   email: 'hoangnhatbaduy2001@gmail.com',
  //   date_of_birth: '2024-09-22',
  //   password: '$2a$12$LLl8E0IZtAe6GagN./KE/eZdu6rSU4IOHDCk/upzUMk12PaJZrVXe'
  // }
  userID: null,
  userId: null,
  warehouse: null,
  // {
  //   id: 1,
  //   name: 'KHO 1',
  //   address: '123 thuy khue',
  //   createdAt: '2024-09-30T16:03:02.000Z',
  //   updatedAt: '2024-09-30T16:03:02.000Z'
  // }
  warehouseDispatchDetails: [],
  warehouseID: 1
};

function WarehouseDispatchForm({ userLogin }) {
  const [formValue, _] = useState(INITIAL_STATE);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const isAddMode = Boolean(mode === 'add');
  const WHDPid = searchParams.get('id');

  const { data: WHDPdata } = useQuery({
    queryKey: ['WHDPData', WHDPid],
    queryFn: () => warehouseDispatchApi.getOne(WHDPid),
    enabled: mode === 'update' && Boolean(WHDPid),
    keepPreviousData: true
  });

  const handleCreateOrUpdateWHDP = useMutation({
    mutationFn: (data) => {
      if (isAddMode) return warehouseDispatchApi.createWarehouseDispatch(data);
      return warehouseDispatchApi.updateWarehouseDispatch({ id: WHDPid, body: data });
    }
  });

  const getCurrentDateTime = () => {
    const now = new Date();
    return `PN-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
  };

  const calculateTotalQuantity = (dispatches) =>
    Array.isArray(dispatches) ? dispatches.reduce((total, dispatch) => total + Number(dispatch.quantity || 0), 0) : 0;

  return (
    <Formik
      initialValues={isAddMode ? formValue : WHDPdata?.data || formValue}
      enableReinitialize
      validationSchema={Yup.object().shape({})}
      onSubmit={(values) => {
        const formattedData = {
          warehouseDcp: {
            exportCode: getCurrentDateTime(),
            exportDate: values.exportDate,
            exportType: values.exportType,
            totalProductQuantity: calculateTotalQuantity(values.dispatches),
            totalAmount: values.warehouseDispatchDetails.reduce((acc, item) => acc + (item.totalPriceProduct || 0), 0),
            exportDescription: values.exportDescription,
            recipient: values.recipient,
            userID: userLogin.id,
            warehouseID: values.warehouseID,
            customerID: values.customerID,
            warehouseDispatchDetails: values.warehouseDispatchDetails.map((dispatch) => ({
              quantity: dispatch.quantity,
              product: dispatch.product
            }))
          }
        };
        handleCreateOrUpdateWHDP.mutate(formattedData, {
          onSuccess: () => alert('Tạo phiếu xuất kho thành công!'),
          onError: (error) => alert(error.message)
        });
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Typography variant="h3" gutterBottom>
            Thông tin xuất kho
          </Typography>
          <div className="Form-add-warehouse">
            <InputField
              name="exportCode"
              label="Mã xuất kho"
              type="text"
              value={isAddMode ? getCurrentDateTime() : values.exportCode}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              disabled
            />
            <InputField
              name="exportDate"
              label="Ngày xuất kho"
              type="date"
              value={values.exportDate}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
            />
            <SelectField
              name="exportType"
              label="Loại xuất kho"
              value={values.exportType}
              handleBlur={handleBlur}
              handleChange={handleChange}
              options={[
                { value: 'Xuất Mới', label: 'Xuất Mới' },
                { value: 'Xuất thay thế', label: 'Xuất thay thế' },
                { value: 'Xuất vip', label: 'Xuất vip' }
              ]}
              touched={touched}
              errors={errors}
            />
            <InputField
              name="totalProductQuantity"
              label="Tổng số lượng sản phẩm"
              type="number"
              value={calculateTotalQuantity(values.dispatches)}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              disabled
            />
            <InputField
              name="exportDescription"
              label="Mô tả xuất kho"
              type="text"
              value={values.exportDescription}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
            />
            <InputField
              name="recipient"
              label="Người nhận"
              type="text"
              value={values.recipient}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
            />
            <InputField
              name="userID"
              label="Người xuất kho"
              type="text"
              value={userLogin?.name}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              disabled
            />
            <SelectField
              name="customerID"
              label="Chọn dự án"
              value={values.customerID}
              handleBlur={handleBlur}
              handleChange={handleChange}
              options={userLogin?.user_customers?.map((item) => ({ value: item.id, label: item.name }))}
              touched={touched}
              errors={errors}
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
                    'dispatches',
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

          <Typography variant="h3" gutterBottom sx={{ mt: 2, mb: 4 }}>
            Thêm biển bảng
          </Typography>

          <FieldArray name="dispatches">
            {({ push, remove }) => (
              <>
                {values.warehouseDispatchDetails.map((dispatch, index) => (
                  <DispatchItem
                    key={index}
                    index={index}
                    dispatch={dispatch}
                    ListProductFormWarehouse={
                      userLogin?.user_warehouses.find((wh) => wh.id === values.warehouseID)?.warehouse_inventories || []
                    }
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    remove={remove}
                    touched={touched}
                    errors={errors}
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
                <Typography variant="body1" sx={{ fontWeight: '700' }}></Typography>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button disableElevation size="large" type="submit" variant="contained" color="secondary">
                {isAddMode ? 'Tạo phiếu xuất kho' : 'Cập nhập phiếu xuất kho'}
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default WarehouseDispatchForm;
