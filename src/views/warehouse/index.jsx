import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Button, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, ModeEdit as ModeEditIcon, Search as SearchIcon } from '@mui/icons-material';
import { useMutation, useQuery } from '@tanstack/react-query';
import warehouseApi from '../../api/warehouse.api';
import WarehouseForm from './components/WarehouseForm';
import InfoWarehouse from './components/InfoWarehouse';
import AddItemDialog from 'ui-component/AddItemDialog';
import ViewDetailDialog from 'ui-component/ViewDetailDialog';
import DataTable from 'ui-component/DataTable';
const INITIAL_STATE = {
  name: '',
  address: '',
  note: '',
  type: '',
  info: ''
};

function Warehouse() {
  const [isEdit, setIsEdit] = useState(false);
  const [warehouseId, setWarehouseId] = useState();
  const [openDialog, setOpenDialog] = useState();
  const [formState, setFormState] = useState(INITIAL_STATE);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Tên kho', width: 350 },
    { field: 'address', headerName: 'Địa chỉ kho', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      renderCell: ({ id }) => (
        <>
          <IconButton aria-label="delete" variant="contained" color="secondary" onClick={() => handleDeleteWarehouse(id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleUpdateWarehouse(id)}>
            <ModeEditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleOpenDialog('dialog2');
              handleGetWarehouse(id);
            }}
          >
            <SearchIcon />
          </IconButton>
        </>
      )
    }
  ];

  const handleOpenDialog = (dialogId) => {
    setOpenDialog(dialogId);
  };

  const handleCloseDialog = (dialogId) => {
    setOpenDialog(null);
    if (dialogId === 'dialog1') {
      setFormState(INITIAL_STATE);
      setIsEdit(false);
    } else if (dialogId === 'dialog2') {
      setFormState(INITIAL_STATE);
      setWarehouseId(null);
      setIsEdit(false);
    }
  };

  const getWarehouseMutation = useMutation({
    mutationFn: (body) => warehouseApi.getWarehouseById(body),
    onSuccess: (warehouse) => {
      const warehouseData = warehouse?.data?.simplifiedWarehouseDetail;
      setWarehouseId(warehouseData);
      setIsEdit(warehouseData);
      setFormState({
        name: warehouseData.name,
        address: warehouseData.address
      });
    }
  });

  const handleGetWarehouse = (rowID) => {
    getWarehouseMutation.mutate(rowID);
  };

  const {
    data: WarehouseData,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['warehouse'],
    queryFn: () => {
      const userID = JSON.parse(localStorage.getItem('auth_user'));
      return warehouseApi.getAllWarehouse({
        role: userID.role,
        id: userID.id
      });
    }
  });

  const deleteWarehouseMutation = useMutation({
    mutationFn: warehouseApi.deleteWarehouse,
    onSuccess: () => {
      alert('Xóa kho hàng thành công');
      refetch();
    },
    onError: (error) => {
      alert(error.response.data.error);
      refetch();
    }
  });

  const handleDeleteWarehouse = (rowId) => {
    if (window.confirm('Are you sure you want to delete')) {
      deleteWarehouseMutation.mutate(rowId);
    }
  };

  const createWarehouseMutation = useMutation({
    mutationFn: (body) => warehouseApi.addWarehouse(body),
    onSuccess: () => {
      alert('Thêm kho thành công!');
      refetch();
    }
  });

  const handleUpdateWarehouse = (rowId) => {
    getWarehouseMutation.mutate(rowId);
    handleOpenDialog('dialog1');
  };

  const updateWarehouseMutaiton = useMutation({
    mutationFn: ({ warehouseId, values }) => {
      if (!warehouseId) {
        throw new Error('Warehouse ID is missing');
      }
      return warehouseApi.updateWarehouse(Number(warehouseId), values);
    },
    onSuccess: () => {
      alert('Cập nhật kho thành công!');
      refetch();
    }
  });
  return (
    <>
      <MainCard>
        <Button
          sx={{ mb: 2 }}
          variant="outlined"
          onClick={() => {
            handleOpenDialog('dialog1');
          }}
          startIcon={<AddIcon />}
        >
          Tạo kho hàng
        </Button>

        <AddItemDialog onClose={() => handleCloseDialog('dialog1')} isOpen={openDialog === 'dialog1'}>
          <WarehouseForm
            updateWarehouseMutaiton={updateWarehouseMutaiton}
            isEdit={isEdit}
            formState={formState}
            handleCloseDialog={handleCloseDialog}
            createWarehouseMutation={createWarehouseMutation}
          />
        </AddItemDialog>

        <ViewDetailDialog onClose={() => handleCloseDialog('dialog2')} isOpen={openDialog === 'dialog2'}>
          <InfoWarehouse warehouseId={warehouseId} />
        </ViewDetailDialog>

        <Box sx={{ height: '100%', width: '100%' }}>
          <DataTable rows={WarehouseData?.data} columns={columns} isLoading={isLoading} />
        </Box>
      </MainCard>
    </>
  );
}

export default Warehouse;
