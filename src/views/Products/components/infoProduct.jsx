import React from 'react';
import { Box, Tabs, Tab, Grid, Typography } from '@mui/material';
function InfoProduct({ productID }) {
  console.log(productID);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h5">Tên sản phẩm</Typography>
          <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{productID?.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">Kích thước</Typography>
          <Typography sx={{ mt: 1, color: 'rgb(72, 70, 68)' }}>{productID?.size}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default InfoProduct;
