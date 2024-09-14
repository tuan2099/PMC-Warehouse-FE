import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import TablePagination from './Pagination';

const DataTable = ({ columns, rows, pageSize, from, to, total, ...props }) => {
  return (
    <>
      <div style={{ height: 525, width: '100%', overflowX: 'auto' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          hideFooter
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true
            }
          }}
          {...props}
        />
      </div>
      <div className="mt-3 flex gap-3 border-t border-inputColor py-3">
        <TablePagination count={pageSize || 0} />
      </div>
    </>
  );
};

export default DataTable;
