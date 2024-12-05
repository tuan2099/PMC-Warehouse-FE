/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Formik, FieldArray } from 'formik';
import { Box, Typography, Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import InputField from 'ui-component/InputField';
import SelectField from 'ui-component/SelectField';
import OrderItem from './OrderItem';
import orderApi from 'api/order.api';

const INITIAL_STATE = {
  name: '',
  orderCode: '',
  purchaseDate: '',
  purchaseType: '',
  purchaseQuantity: '',
  purchaseTotalAmount: '',
  purchaseVATAmount: '',
  purchaseTotalAmountAfterVAT: '',
  note: '',
  paymentStatus: '',
  supplierId: '',
  userId: '',
  vat: 0,
  warehouseID: '',
  orderDetail: [
    {
      product: '',
      quantity: '',
      price: '',
      totalPriceProduct: ''
    }
  ]
};

function OrderForm({ userLogin, handleCloseDialog, createOrderMutation, suppliersData, ProductsData, refetch, updateOrderMutation }) {
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [searchParams] = useSearchParams();
  const isAddMode = searchParams.get('mode') === 'add';
  const ODid = searchParams.get('id');
  const getCurrentDateTime = () => {
    const now = new Date();
    return `PN-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
  };

  const { data: OrderData } = useQuery({
    queryKey: ['OrderDetail', ODid],
    queryFn: () => orderApi.getOrderDetails(ODid),
    enabled: !isAddMode && Boolean(ODid),
    keepPreviousData: true
  });

  const calculateTotalQuantity = (orderDetail) => {
    Array.isArray(orderDetail) ? orderDetail.reduce((total, dispatch) => total + Number(dispatch.quantity || 0), 0) : 0;
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (OrderData) {
      const newValue = {
        ...OrderData.data,
        supplierId: OrderData.data.supplierID,
        purchaseDate: formatDateForInput(OrderData.data.purchaseDate) || '',
        orderDetail: OrderData.data.purchaseordersdetails.map((dispatch) => ({
          quantity: dispatch.quantity,
          product: dispatch.product_order_details[0].productID,
          price: dispatch.price || 0,
          totalPriceProduct: dispatch.totalPriceProduct || 0
        }))
      };
      delete newValue.updatedAt;
      delete newValue.user;
      delete newValue.warehouse;
      delete newValue.purchaseordersdetails;
      delete newValue.createdAt;
      delete newValue.id;
      setFormState(newValue);
    }
  }, [OrderData]);

  const handleSubmitForm = (values) => {
    const totalBeforeVAT = values.orderDetail.reduce((acc, item) => acc + Number(item.totalPriceProduct || 0), 0); // Tổng tiền trước VAT
    const vatAmount = (totalBeforeVAT * (values.purchaseVATAmount || 0)) / 100; // Tính số tiền VAT
    const totalAfterVAT = totalBeforeVAT + vatAmount; // Tổng tiền sau VAT

    const formattedData = {
      purchaseOd: {
        orderCode: getCurrentDateTime(),
        purchaseDate: values.purchaseDate,
        purchaseType: values.purchaseType,
        purchaseQuantity: calculateTotalQuantity(values.orderDetail),
        purchaseTotalAmount: totalBeforeVAT,
        purchaseVATAmount: vatAmount,
        purchaseTotalAmountAfterVAT: totalAfterVAT,
        note: values.note,
        paymentStatus: values.paymentStatus,
        userId: userLogin.id,
        warehouseID: values.warehouseID,
        supplierID: values.supplierId,
        orderDetail: values.orderDetail.map((dispatch) => ({
          quantity: dispatch.quantity,
          product: dispatch.product
        })),
        vat: values.vat
      }
    };

    if (isAddMode) {
      createOrderMutation.mutate(formattedData, {
        onSuccess: () => {
          handleCloseDialog();
          toast.success('Tạo phiếu thành công');
          refetch();
        },
        onError: (error) => {
          toast.error(`Tạo phiếu xuất kho thất bại: ${error.message}`);
        }
      });
    } else {
      updateOrderMutation.mutate({ id: ODid, body: formattedData });
    }
  };

  return (
    <>
      <Formik initialValues={formState} enableReinitialize onSubmit={handleSubmitForm}>
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
              <SelectField
                name="paymentStatus"
                label="Trạng thái thanh toán"
                value={values.paymentStatus}
                handleBlur={handleBlur}
                handleChange={handleChange}
                options={[
                  { value: 'paid', label: 'Đã thanh toán' },
                  { value: 'unpaid', label: 'Chưa thanh toán' },
                  { value: 'non-payment', label: 'Không thanh toán' }
                ]}
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
                label="VAT (%)"
                type="number"
                value={values.vat}
                handleBlur={handleBlur}
                handleChange={(e) => {
                  setFieldValue('vat', e.target.value);
                  const total = values.orderDetail.reduce((acc, item) => acc + (item.totalPriceProduct || 0), 0);
                  const purchaseVATAmount = total + (total * e.target.value) / 100;
                  setFieldValue('purchaseVATAmount', purchaseVATAmount);
                }}
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
                      vat={values.vat}
                      orderDetail={values.orderDetail}
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

                {/* Tổng số tiền trước VAT */}
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Tổng số tiền:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: '700' }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                      .format(values.orderDetail.reduce((acc, item) => acc + (item.totalPriceProduct || 0), 0))
                      .replace('₫', 'đ')}
                  </Typography>
                </Grid>

                {/* Tính VAT dựa trên tổng tiền trước VAT */}
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">VAT ({values.vat}%):</Typography>
                  <Typography variant="body1" sx={{ fontWeight: '700' }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                      .format(values.purchaseVATAmount - values.orderDetail.reduce((acc, item) => acc + (item.totalPriceProduct || 0), 0))
                      .replace('₫', 'đ')}
                  </Typography>
                </Grid>

                {/* Tính tổng tiền sau VAT */}
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Tổng tiền sau VAT:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: '700' }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                      .format(values.purchaseVATAmount)
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
    </>
  );
}

export default OrderForm;
