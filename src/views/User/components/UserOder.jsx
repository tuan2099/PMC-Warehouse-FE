import React, { useState } from 'react';
import DataTable from 'ui-component/DataTable';
import { Box, Button, IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const OrderDetailsDrawer = ({ open, onClose, products }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 99999 }}>
      <div style={{ width: 1000, padding: 20 }}>
        <Typography variant="h6" gutterBottom>
          Products in this Order
        </Typography>

        <List>
          {products.map((product, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={product.productName}
                secondary={
                  <>
                    <Typography variant="body2">Quantity: {product.quantity}</Typography>
                    <Typography variant="body2">Price: ${product.price}</Typography>
                    <Typography variant="body2">Total: ${product.quantity * product.price}</Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

function UserOrder({ dataOrder }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentProducts, setCurrentProducts] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'orderCode', headerName: 'Mã đơn nhập', width: 150 },
    { field: 'purchaseDate', headerName: 'Ngày nhập', width: 350 },
    { field: 'paymentStatus', headerName: 'Trạng thái thanh toán', width: 250 },
    { field: 'user_name', headerName: 'Người tạo đơn', width: 350 },
    { field: 'warehouse_name', headerName: 'Kho', width: 350 },
    {
      field: 'actions',
      headerName: '',
      width: 220,
      renderCell: ({ id, row }) => (
        <>
          <IconButton onClick={() => handleOpenDrawer(row.products)}>
            <SearchIcon />
          </IconButton>
        </>
      )
    }
  ];

  const handleOpenDrawer = (products) => {
    setCurrentProducts(products);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Box>
        <DataTable rows={dataOrder} columns={columns} />
      </Box>

      <OrderDetailsDrawer open={drawerOpen} onClose={handleCloseDrawer} products={currentProducts} />
    </>
  );
}

export default UserOrder;
