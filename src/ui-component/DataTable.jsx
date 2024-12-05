/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { DataGrid, useGridApiRef, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .no-rows-primary': {
    fill: theme.palette.mode === 'light' ? '#AEB8C2' : '#3D4751'
  },
  '& .no-rows-secondary': {
    fill: theme.palette.mode === 'light' ? '#E8EAED' : '#1D2126'
  }
}));

const CustomDensitySelector = ({ apiRef }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDensityChange = (density) => {
    apiRef.current.setDensity(density);
    handleClose();
  };

  return (
    <>
      <IconButton variant="contained" color="primary" onClick={handleClick}>
        <ViewStreamIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleDensityChange('compact')}>Nhỏ</MenuItem>
        <MenuItem onClick={() => handleDensityChange('standard')}> bự</MenuItem>
        <MenuItem onClick={() => handleDensityChange('comfortable')}>Siêu Bự</MenuItem>
      </Menu>
    </>
  );
};

function CustomToolbar({ apiRef }) {
  const handleExport = () => {
    apiRef.current.exportDataAsCsv({ fileName: 'CustomFileName', utf8WithBom: true });
  };

  const handleFilterClick = () => {
    apiRef.current.showFilterPanel(); // Open filter panel programmatically
  };

  return (
    <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 10px 30px' }}>
      <GridToolbarQuickFilter sx={{ backgroundImage: '#000' }} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton variant="contained" color="primary" size="large" onClick={handleExport}>
          <FileDownloadIcon />
        </IconButton>
        <IconButton variant="contained" size="large" color="primary" onClick={handleFilterClick}>
          <FilterListIcon />
        </IconButton>
        <CustomDensitySelector apiRef={apiRef} />
      </Box>
    </GridToolbarContainer>
  );
}

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={96} viewBox="0 0 452 257" aria-hidden focusable="false">
        <path
          className="no-rows-primary"
          d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
        />
        <path
          className="no-rows-primary"
          d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
        />
        <path
          className="no-rows-primary"
          d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
        />
        <path
          className="no-rows-secondary"
          d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
        />
      </svg>
      <Box sx={{ mt: 2 }}>Không có dữ liệu</Box>
    </StyledGridOverlay>
  );
}

const DataTable = ({ columns, data, totalRows, isLoading, page, pageSize, onPageChange, onPageSizeChange, ...props }) => {
  const apiRef = useGridApiRef();
  return (
    <>
      <div style={{ width: '100%', overflowX: 'auto', height: '65vh' }}>
        <DataGrid
          apiRef={apiRef}
          rows={data?.data?.data}
          pagination
          columns={columns}
          checkboxSelection
          rowCount={totalRows}
          page={page}
          loading={isLoading}
          pageSize={pageSize}
          onPaginationModelChange={(model) => {
            onPageChange(model.page);
            onPageSizeChange(model.pageSize);
          }}
          slots={{
            toolbar: () => <CustomToolbar apiRef={apiRef} />,  noRowsOverlay: CustomNoRowsOverlay
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                debounceMs: 500
              }
            }
          }}
          {...props}
        />
      </div>
    </>
  );
};

export default DataTable;
