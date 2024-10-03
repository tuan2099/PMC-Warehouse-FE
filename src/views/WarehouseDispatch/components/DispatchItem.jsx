/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Box, Button, FormControl, Autocomplete, TextField, useTheme } from '@mui/material';
import InputField from 'ui-component/InputField';

function DispatchItem({
  dispatch,
  index,
  ListProductFormWarehouse,
  handleBlur,
  handleChange,
  setFieldValue,
  remove,
  touched,
  errors,
  values
}) {
  const theme = useTheme(); // theme setting
  return (
    <Box key={index} sx={{ mb: 2 }}>
      <div className="form-add-detail">
        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
          <Autocomplete
            id={`dispatch-product-${index}`}
            options={ListProductFormWarehouse?.warehouse_inventories || []}
            getOptionLabel={(option) => {
              return option?.productName ? `${option.productName} (${option.quantity})` : `${option}`;
            }}
            value={ListProductFormWarehouse?.warehouse_inventories?.[index]?.productName || null}
            onChange={(event, newValue) => {
              setFieldValue(`dispatches.${index}.product`, newValue ? newValue.id : '');
              setFieldValue(`dispatches.${index}.quantity`, newValue ? newValue.quantity : '');
              setFieldValue(`dispatches.${index}.price`, newValue ? newValue.salePrice : 0);
              setFieldValue(`dispatches.${index}.totalPriceProduct`, newValue ? newValue.salePrice * values.dispatches[index].quantity : 0);
            }}
            renderInput={(params) => <TextField {...params} label="Tên sản phẩm" />}
          />
        </FormControl>
        <InputField
          name={`dispatches.${index}.quantity`}
          label="Số lượng"
          type="number"
          value={dispatch.quantity}
          handleBlur={handleBlur}
          handleChange={(event) => {
            handleChange(event);
            const quantity = event.target.value;
            const price = dispatch.price || 0;
            setFieldValue(`dispatches.${index}.totalPriceProduct`, quantity * price);
          }}
          touched={touched}
          errors={errors}
        />
        <InputField
          name={`dispatches.${index}.price`}
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
          name={`dispatches.${index}.totalPriceProduct`}
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
  );
}

export default DispatchItem;
