import React, { useEffect } from 'react';
import { Box, Button, FormControl, Autocomplete, TextField, useTheme } from '@mui/material';
import InputField from 'ui-component/InputField';
import { useSearchParams } from 'react-router-dom';

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
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const isAddMode = searchParams.get('mode') === 'add';
  const ProductsData = ListProductFormWarehouse?.warehouse_inventories;
  const product = ProductsData.find((item) => item.id === dispatch.product);

  useEffect(() => {
    if (!isAddMode && dispatch.product) {
      console.log(product);
      setFieldValue(`dispatches.${index}.product`, dispatch.product);
      setFieldValue(`dispatches.${index}.quantity`, dispatch.quantity);
      setFieldValue(`dispatches.${index}.price`, product.salePrice);
      setFieldValue(`dispatches.${index}.totalPriceProduct`, product.salePrice * dispatch.quantity);
    }
  }, [isAddMode]);

  return (
    <Box key={index} sx={{ mb: 2 }}>
      <div className="form-add-detail">
        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
          <Autocomplete
            id={`dispatch-product-${index}`}
            options={ListProductFormWarehouse?.warehouse_inventories || []}
            defaultValue={dispatch}
            getOptionLabel={(option) => {
              return option?.productName || product?.productName || '';
            }}
            value={ListProductFormWarehouse?.warehouse_inventories?.[index]?.productName || null}
            onChange={(_, newValue) => {
              const price = newValue ? newValue.salePrice : 0;
              const quantity = values.dispatches[index].quantity || 0;
              setFieldValue(`dispatches.${index}.product`, newValue ? newValue.id : '');
              setFieldValue(`dispatches.${index}.quantity`, newValue ? newValue.quantity : '');
              setFieldValue(`dispatches.${index}.price`, price);
              setFieldValue(`dispatches.${index}.totalPriceProduct`, price * quantity);
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
