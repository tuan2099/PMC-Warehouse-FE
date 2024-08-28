/* eslint-disable prettier/prettier */
import React from 'react';

// MUI components
import MainCard from 'ui-component/cards/MainCard';
import { Box, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, ModeEdit as ModeEditIcon, Search as SearchIcon } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

// third party
import { useMutation, useQuery } from '@tanstack/react-query';

// Api
import productsApi from '../../api/product.api';

function Products() {
    // cài đặt column cho data-grid
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Tên Biển bảng', width: 350 },
        { field: 'quantityInStock', headerName: 'Số lượng tồn', width: 250 },
        { field: 'salePrice', headerName: 'Giá bán', width: 250 },
        { field: 'purchasePrice', headerName: 'Giá nhập', width: 250 },
        { field: 'quantityIn', headerName: 'Số lượng tối thiểu', width: 250 },
        { field: 'quantityOut', headerName: 'Số lượng tối đa', width: 250 },
        { field: 'size', headerName: 'Kích thước', width: 250 },
        { field: 'note', headerName: 'Ghi chú', width: 250 },
        { field: 'createdAt', headerName: 'Ngày tạo', width: 200 },
        { field: 'updatedAt', headerName: 'Ngày cập nhật gần nhất', with: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 220,
            renderCell: ({ id }) => (
                <>
                    <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDeleteWarehouse(id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleUpdateUser(id)}>
                        <ModeEditIcon />
                    </IconButton>
                    <IconButton onClick={() => console.log(123)}>
                        <SearchIcon />
                    </IconButton>
                </>
            )
        }
    ];

    const { data: ProductsData, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => await productsApi.getAllProducts()
    });

    return (
        <>
            <MainCard title="Quản lý biển bảng">
                <Box sx={{ height: '100%', width: '100%' }}>
                    <DataGrid rows={ProductsData?.data} columns={columns} pageSize={5} checkboxSelection />
                </Box>
            </MainCard>
        </>
    );
}

export default Products;
