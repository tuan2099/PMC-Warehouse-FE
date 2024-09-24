// import { IconButton } from '@mui/material';

// export const CUSTOMER_COLUMN = [
//   { field: 'id', headerName: 'ID', width: 100 },
//   { field: 'name', headerName: 'Tên', width: 250 },
//   { field: 'pm', headerName: 'GĐTN', width: 250 },
//   { field: 'location', headerName: 'Địa chỉ', width: 150 },
//   { field: 'branch', headerName: 'Chi nhánh', width: 150 },
//   { field: 'status', headerName: 'Trạng thái', width: 150 },
//   {
//     field: 'actions', // Cột hành động
//     headerName: 'Actions',
//     width: 220,
//     renderCell: ({ id }) => (
//       <>
//         {/* Nút xóa dự án */}
//         <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDeleteCustomer(id)}>
//           <DeleteIcon />
//         </IconButton>
//         {/* Nút chỉnh sửa dự án */}
//         <IconButton onClick={() => handleUpdateCustomer(id)}>
//           <ModeEditIcon />
//         </IconButton>
//         {/* Nút xem chi tiết dự án */}
//         <IconButton
//           onClick={() => {
//             handleOpenDialog('dialog2'), handlegetInfoCustomer(id);
//           }}
//         >
//           <SearchIcon />
//         </IconButton>
//       </>
//     )
//   }
// ];

// export const PRODUCT_COLUMN = [
//   { field: 'id', headerName: 'ID', width: 100 },
//   { field: 'name', headerName: 'Tên Biển bảng', width: 350 },
//   { field: 'size', headerName: 'Kích thước', width: 250 },
//   { field: 'salePrice', headerName: 'Giá bán', width: 250 },
//   { field: 'purchasePrice', headerName: 'Giá nhập', width: 250 },
//   { field: 'quantityIn', headerName: 'Số lượng tối thiểu', width: 250 },
//   { field: 'quantityOut', headerName: 'Số lượng tối đa', width: 250 },
//   { field: 'note', headerName: 'Ghi chú', width: 250 },
//   {
//     field: 'actions',
//     headerName: 'Actions', // Cột hành động
//     width: 220,
//     renderCell: ({ id }) => (
//       <>
//         {/* Nút xóa kho hàng */}
//         <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDeleteProduct(id)}>
//           <DeleteIcon />
//         </IconButton>
//         {/* Nút chỉnh sửa kho hàng */}
//         <IconButton onClick={() => handleGetProduct(id)}>
//           <ModeEditIcon />
//         </IconButton>
//         {/* Nút xem thông tin chi tiết kho hàng */}
//         <IconButton
//           onClick={() => {
//             handleOpenDialog('dialog2');
//             handleGetWarehouse(id);
//           }}
//         >
//           <SearchIcon />
//         </IconButton>
//       </>
//     )
//   }
// ];
