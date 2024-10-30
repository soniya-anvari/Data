import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Checkbox } from '@mui/material';
import ColumnDialog from './ColumnDialog';
import FilterDialog from './FilterDialog';
import DataGridComponent from './DataGridComponent';
import './index.css'; // Import CSS for styling

const columns = [
  { field: 'col1', headerName: 'Name', width: 300 },
  { field: 'col2', headerName: 'Company', width: 300 },
  { field: 'col3', headerName: 'City', width: 300 },
  { field: 'col4', headerName: 'State', width: 300 },
];

const rows = [
  { id: 1, col1: 'Jone James', col2: 'Example', col3: "Yonkers", col4: "NY" },
  { id: 2, col1: 'Bob Herm', col2: 'Example', col3: "Tampa", col4: "FL" },
  { id: 3, col1: 'Kaui Ignace', col2: 'Example', col3: "Tampa", col4: "NY" },
  { id: 4, col1: 'Christian', col2: 'Example', col3: "Yonkers", col4: "FL" },
  { id: 5, col1: 'Deep Pau', col2: 'Example', col3: "Tampa", col4: "NY" },
  { id: 6, col1: 'Marciano', col2: 'Example', col3: "Yonkers", col4: "FL" },
];

const App = () => {
  const [openColumns, setOpenColumns] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({ cities: [], companies: [] });

  const handleOpenColumns = () => setOpenColumns(true);
  const handleCloseColumns = () => setOpenColumns(false);

  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);

  const toggleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(rows.map(row => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelection = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          style={{ margin: '10px 0', width: '200px' }}
        />
        <div>
          <Button variant="outlined" onClick={handleOpenColumns} style={{ marginLeft: '10px' }}>
            Select Columns
          </Button>
          <Button variant="outlined" onClick={handleOpenFilter} style={{ marginLeft: '10px' }}>
            Filter
          </Button>
        </div>
      </div>

      <div style={{ marginTop: '10px' }}>
        <strong>Selected Rows: {selectedRows.length}</strong>
      </div>

      <DataGridComponent
        rows={rows.filter(row => 
          (filters.cities.length === 0 || filters.cities.includes(row.col3)) &&
          (filters.companies.length === 0 || filters.companies.includes(row.col2))
        )}
        selectedRows={selectedRows}
        onRowSelection={handleRowSelection}
        toggleSelectAll={toggleSelectAll}
      />

      <ColumnDialog open={openColumns} onClose={handleCloseColumns} columns={columns} />
      <FilterDialog open={openFilter} onClose={handleCloseFilter} onFilterChange={handleFilterChange} />
    </div>
  );
};

export default App;