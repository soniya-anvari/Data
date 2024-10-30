import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';

const DataGridComponent = ({ rows, selectedRows, onRowSelection, toggleSelectAll }) => {
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
          { field: 'col1', headerName: 'Name', width: 300 },
          { field: 'col2', headerName: 'Company', width: 300 },
          { field: 'col3', headerName: 'City', width: 300 },
          { field: 'col4', headerName: 'State', width: 300 },
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