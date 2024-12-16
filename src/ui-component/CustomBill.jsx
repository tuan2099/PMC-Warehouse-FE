import React from 'react';
import { Box, Typography, Grid, Divider } from '@mui/material';
import DataTable from './DataTable';

const InfoSection = ({ title, content }) => (
  <Box sx={{ '& .MuiTypography-body1': { mb: 1, lineHeight: 1.6 } }}>
    <Typography variant="h4" sx={{ mb: 2 }}>
      {title}
    </Typography>
    {content.map((item, index) => (
      <Typography variant="body1" key={index}>
        <b>{item.label}:</b>&nbsp;&nbsp;{item.value}
      </Typography>
    ))}
  </Box>
);
function CustomBill() {
  return <></>;
}

export default CustomBill;
