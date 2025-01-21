import React, { useEffect } from 'react';
import { Box, Button, FormControl, Autocomplete, TextField, useTheme } from '@mui/material';
import InputField from 'ui-component/InputField';
import { useSearchParams } from 'react-router-dom';

function OrderItem({ dispatch, index, handleBlur, handleChange, setFieldValue, remove, touched, errors, ProductsData, vat, orderDetail }) {
  const theme = useTheme(); // theme setting
  const [searchParams] = useSearchParams();
  const isAddMode = searchParams.get('mode') === 'add';
  const product = ProductsData.find((item) => item.id === dispatch.product);

  useEffect(() => {
    const total = orderDetail.reduce((acc, item) => acc + (item.totalPriceProduct || 0), 0);
    const purchaseVATAmount = total + (total * vat) / 100;
    setFieldValue('purchaseVATAmount', purchaseVATAmount);
    if (!isAddMode && dispatch.product) {
      setFieldValue(`orderDetail.${index}.quantity`, dispatch.quantity || '');
      setFieldValue(`orderDetail.${index}.product`, product.id || '');
      setFieldValue(`orderDetail.${index}.price`, product.salePrice || 0);
      setFieldValue(`orderDetail.${index}.totalPriceProduct`, product.salePrice * dispatch.quantity || 0);
    }
  }, [isAddMode, dispatch]);

  return (
    <>
      <Box key={index} sx={{ mb: 2 }}>
        <div className="form-add-detail">
          <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
            <Autocomplete
              id={`dispatch-product-${index}`}
              options={ProductsData || []}
              getOptionLabel={(option) => option.name || product?.name || ''}
              defaultValue={dispatch}
              onChange={(_, newValue) => {
                setFieldValue(`orderDetail.${index}.quantity`, newValue ? newValue.quantity : '');
                setFieldValue(`orderDetail.${index}.product`, newValue ? newValue.id : '');
                setFieldValue(`orderDetail.${index}.price`, newValue ? newValue.salePrice : 0);
                setFieldValue(`orderDetail.${index}.totalPriceProduct`, newValue ? newValue.salePrice * dispatch.quantity : 0);
              }}
              renderInput={(params) => <TextField {...params} label="Tên sản phẩm" />}
            />
          </FormControl>
          <InputField
            name={`orderDetail.${index}.quantity`}
            label="Số lượng"
            type="number"
            value={dispatch.quantity}
            handleBlur={handleBlur}
            handleChange={(event) => {
              handleChange(event);
              const quantity = Number(event.target.value);
              setFieldValue(`orderDetail.${index}.quantity`, quantity);
              const price = dispatch.price || 0;
              setFieldValue(`orderDetail.${index}.totalPriceProduct`, quantity * price);
            }}
            touched={touched}
            errors={errors}
          />
          <InputField
            name={`orderDetail.${index}.price`}
            label="Đơn giá"
            type="number"
            value={dispatch.price}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
            disabled={true}
          />
          <InputField
            name={`orderDetail.${index}.totalPriceProduct`}
            label="Tổng"
            type="number"
            value={dispatch.totalPriceProduct}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
            disabled={true}
          />
          <Button onClick={() => remove(index)} color="error">
            Xóa biển bảng
          </Button>
        </div>
      </Box>
    </>
  );
}

export default OrderItem;
