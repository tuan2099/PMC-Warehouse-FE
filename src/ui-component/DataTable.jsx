/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { DataGrid, useGridApiRef, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import TablePagination from './Pagination';

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

const DataTable = ({ columns, data, totalRows, page, pageSize, ...props }) => {
  const apiRef = useGridApiRef();
  return (
    <>
      <div style={{ height: 525, width: '100%', overflowX: 'auto' }}>
        <DataGrid
          apiRef={apiRef}
          rows={data?.data?.data}
          pagination
          paginationMode="server"
          columns={columns}
          checkboxSelection
          rowCount={totalRows}
          page={page}
          pageSize={pageSize}
          onPaginationModelChange={(model) => {
            onPageChange(model.page);
            onPageSizeChange(model.pageSize);
          }}
          slots={{
            toolbar: () => <CustomToolbar apiRef={apiRef} />
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
      <div className="mt-3 flex gap-3 border-t border-inputColor py-3">
        <TablePagination count={+data?.data?.meta?.totalPages || 1 || 0} />
      </div>
    </>
  );
};

export default DataTable;
