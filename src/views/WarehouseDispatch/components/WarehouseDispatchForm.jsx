import React, { useEffect, useState, useRef } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';
import { Formik, FieldArray } from 'formik';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import InputField from 'ui-component/InputField';
import SelectField from 'ui-component/SelectField';
import DispatchItem from './DispatchItem';
import warehouseDispatchApi from 'api/warehouseDispatch';
import warehouseApi from 'api/warehouse.api';
import customerApi from 'api/customer.api';

const INITIAL_STATE = {
  exportCode: '',
  exportDate: '',
  exportType: '',
  totalProductQuantity: 0,
  totalAmount: 0,
  exportDescription: '0',
  recipient: '',
  userID: null,
  warehouseID: null,
  customerID: null,
  customerEmail: '',
  dispatches: []
};

function WarehouseDispatchForm({ userLogin, createWarehouseMutation, handleCloseDialog }) {
  const [formValue, setFormValue] = useState(INITIAL_STATE);
  const [searchParams] = useSearchParams();
  const isAddMode = searchParams.get('mode') === 'add';
  const WHDPid = searchParams.get('id');
  const userIDFromLocalStr = JSON.parse(localStorage.getItem('auth_user'));
  const getCurrentDateTime = () => {
    const now = new Date();
    return `PN-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
  };

  const exportCodeRef = useRef(null);
  if (!exportCodeRef.current) {
    exportCodeRef.current = getCurrentDateTime();
  }

  const { data: WHDPdata } = useQuery({
    queryKey: ['WHDPData', WHDPid],
    queryFn: () => warehouseDispatchApi.getOne(WHDPid),
    enabled: !isAddMode && Boolean(WHDPid),
    keepPreviousData: true
  });

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (WHDPdata) {
      const newValue = {
        ...WHDPdata.data,
        exportDate: formatDateForInput(WHDPdata.data.exportDate) || '',
        warehouseID: WHDPdata.data.warehouse?.id || null,
        customerID: WHDPdata.data.customer?.id || null,
        dispatches: WHDPdata.data.warehouseDispatchDetails.map((dispatch) => ({
          quantity: dispatch.quantity,
          product: dispatch.product,
          price: dispatch.price || 0,
          totalPriceProduct: dispatch.totalPriceProduct || 0
        }))
      };
      setFormValue(newValue);
    }
  }, [WHDPdata]);

  const handleUpdateWHDP = useMutation({
    mutationFn: (data) => {
      return warehouseDispatchApi.updateWarehouseDispatch({ id: WHDPid, body: data });
    },
    onSuccess: () => {
      handleCloseDialog();
    }
  });

  const calculateTotalQuantity = (dispatches) =>
    Array.isArray(dispatches) ? dispatches.reduce((total, dispatch) => total + Number(dispatch.quantity || 0), 0) : 0;

  const { data: UserWarehouseData } = useQuery({
    queryKey: ['userWarehouses', userIDFromLocalStr.id],
    queryFn: () => warehouseApi.getWarehouseByUser(userIDFromLocalStr.id),
    enabled: !!userIDFromLocalStr?.id
  });

  const { data: UserCustomerData } = useQuery({
    queryKey: ['userCustomer', userIDFromLocalStr.id],
    queryFn: () => customerApi.getCustomerByUser(userIDFromLocalStr.id),
    enabled: !!userIDFromLocalStr.id
  });

  const handleWarehouseSelect = (warehouseID) => {
    console.log('Selected warehouse ID:', warehouseID);
  };
  return (
    <Formik
      initialValues={formValue}
      enableReinitialize
      validationSchema={Yup.object().shape({})}
      onSubmit={(values) => {
        const formattedData = {
          warehouseDcp: {
            exportCode: exportCodeRef.current,
            exportDate: values.exportDate,
            exportType: values.exportType,
            totalProductQuantity: calculateTotalQuantity(values.dispatches),
            totalAmount: values.dispatches.reduce((acc, item) => acc + (item.totalPriceProduct || 0), 0),
            exportDescription: values.exportDescription,
            recipient: values.recipient,
            customerEmail: values.customerEmail,
            userID: userLogin.id,
            warehouseID: values.warehouseID,
            customerID: values.customerID,
            dispatches: values.dispatches.map((dispatch) => ({
              quantity: dispatch.quantity,
              product: dispatch.product
            }))
          }
        };
        if (isAddMode) {
          createWarehouseMutation.mutate(formattedData, {
            onSuccess: () => {
              handleCloseDialog();
              toast.success('Tạo phiếu xuất kho thành công, vui lòng check mail của dự án để xác nhận đơn', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              });
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
        } else {
          handleUpdateWHDP.mutate(formattedData, {
            onSuccess: () => {
              handleCloseDialog();
              toast.success(isAddMode ? 'Tạo phiếu xuất kho thành công!' : 'Cập nhập phiếu xuất kho thành công!', {
                position: 'top-right',
                autoClose: 3000, // Tự động đóng sau 3 giây
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              });
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
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 4 }}>
            Thông tin xuất kho
          </Typography>
          <div className="Form-add-warehouse">
            <InputField
              name="exportCode"
              label="Mã xuất kho"
              type="text"
              value={isAddMode ? exportCodeRef.current : values.exportCode}
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
              handleChange={(e) => {
                handleChange(e);
                handleWarehouseSelect(e.target.value);
              }}
              options={UserWarehouseData?.data?.result?.map((item) => ({ value: item.id, label: item.warehouse_name }))}
              touched={touched}
              errors={errors}
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
          </div>
          <Typography variant="h4" gutterBottom sx={{ mb: 1, mt: 4 }}>
            Thông tin dự án
          </Typography>
          <div className="Form-add-warehouse">
            <SelectField
              name="customerID"
              label="Chọn dự án"
              value={values.customerID}
              handleBlur={handleBlur}
              handleChange={handleChange}
              options={UserCustomerData?.data?.result?.map((item) => ({ value: item.id, label: item.customer_name }))}
              touched={touched}
              errors={errors}
            />
            <InputField
              name="customerEmail"
              label="Email khách hàng"
              type="email"
              value={values.customerEmail}
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
          </div>
          <Typography variant="h4" gutterBottom sx={{ mb: 1, mt: 4 }}>
            Nhân viên
          </Typography>
          <div className="Form-add-warehouse">
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
          </div>

          <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 4 }}>
            Thêm biển bảng
          </Typography>

          <FieldArray name="dispatches">
            {({ push, remove }) => (
              <>
                {values.dispatches.map((dispatch, index) => (
                  <DispatchItem
                    key={index}
                    index={index}
                    dispatch={dispatch}
                    ListProductFormWarehouse={userLogin?.user_warehouses.find((wh) => wh.id === values.warehouseID) || []}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    remove={remove}
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                ))}

                <Button
                  onClick={() => {
                    if (values.warehouseID) push({ quantity: '', product: '', price: 0, totalPriceProduct: 0 });
                  }}
                  color="primary"
                >
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
                    .format(values.dispatches.reduce((acc, item) => acc + item.totalPriceProduct, 0))
                    .replace('₫', 'đ')}
                </Typography>
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
