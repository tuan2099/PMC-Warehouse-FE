/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Formik, FieldArray } from 'formik';
import { Box, Typography, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import InputField from 'ui-component/InputField';
import SelectField from 'ui-component/SelectField';
import transferApi from 'api/transfer.api';
import TransferItem from './TransferIttem';

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

function TransferForm({ userLogin, createTransferMutation, ProductsData }) {
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

  useEffect(() => {
    setFormState();
  }, [TransferData]);

  const handleSubmitForm = (values) => {
    const formattedData = {
      transferData: {
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
      }
    };

    if (isAddMode) {
      createTransferMutation.mutate(formattedData, {
        onSuccess: () => {
          toast.success('Tạo phiếu thành công');
          refetch();
        },
        onError: (error) => {
          toast.error(`Tạo phiếu thất bại: ${error.message}`);
        }
      });
      handleCloseDialog();
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
                label="Kho gốc"
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
                label="Kho đến"
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

            <FieldArray name="transferDetail">
              {({ push, remove }) => (
                <>
                  {values.transferDetail.map((dispatch, index) => (
                    <TransferItem
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
