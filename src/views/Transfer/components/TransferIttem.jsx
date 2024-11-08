/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */

import React from 'react';
import { Box, Button, FormControl, Autocomplete, TextField, useTheme } from '@mui/material';
import InputField from 'ui-component/InputField';
// import { useSearchParams } from 'react-router-dom';

function TransferItem({ dispatch, index, handleBlur, ProductsData, handleChange, setFieldValue, remove, touched, errors }) {
  const theme = useTheme(); // theme setting
  //   const [searchParams] = useSearchParams();
  //   const isAddMode = searchParams.get('mode') === 'add';

  const product = ProductsData.find((item) => item.id === dispatch.product);

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
                setFieldValue(`transferDetail.${index}.quantity`, newValue ? newValue.quantity : '');
                setFieldValue(`transferDetail.${index}.product`, newValue ? newValue.id : '');
              }}
              renderInput={(params) => <TextField {...params} label="Tên sản phẩm" />}
            />
          </FormControl>
          <InputField
            name={`transferDetail.${index}.quantity`}
            label="Số lượng"
            type="number"
            value={dispatch.quantity}
            handleBlur={handleBlur}
            handleChange={(event) => {
              handleChange(event);
              const quantity = Number(event.target.value);
              setFieldValue(`transferDetail.${index}.quantity`, quantity);
              const price = dispatch.price || 0;
              setFieldValue(`transferDetail.${index}.totalPriceProduct`, quantity * price);
            }}
            touched={touched}
            errors={errors}
          />
          <Button onClick={() => remove(index)} color="error">
            Xóa biển bảng
          </Button>
        </div>
      </Box>
    </>
  );
}

export default TransferItem;
