import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';

const DataGridComponent = ({ rows, selectedRows, onRowSelection, toggleSelectAll, selectedColumns }) => {
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={[
          {
            field: 'checkbox',
            headerName: '',
            width: 50,
            renderCell: (params) => (
              <Checkbox
                checked={selectedRows.includes(params.row.id)}
                onChange={() => onRowSelection(params.row.id)}
              />
            ),
          },
          ...selectedColumns.map(field => ({
            field,
            headerName: field.charAt(0).toUpperCase() + field.slice(1),
            width: 300,
          })),
        ]}
        pageSize={5}
        checkboxSelection={false} // Disable the default checkbox selection
        getRowClassName={(params) =>
          selectedRows.includes(params.row.id) ? 'selected-row' : ''
        }
      />
      <div style={{ margin: '10px 0' }}>
        <Checkbox
          checked={selectedRows.length === rows.length && rows.length > 0}
          onChange={toggleSelectAll}
          color="primary"
        />
        <span>Select All</span>
      </div>
    </div>
  );
};

export default DataGridComponent;