import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import ColumnDialog from './ColumnDialog';
import FilterDialog from './FilterDialog';
import DataGridComponent from './DataGridComponent';
import './index.css'; // Import CSS for styling

const columns = [
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'company', headerName: 'Company', width: 300 },
  { field: 'city', headerName: 'City', width: 300 },
  { field: 'state', headerName: 'State', width: 300 },
];

const rows = [
  { id: 1, name: 'Jone James', company: 'Example', city: "Yonkers", state: "NY" },
  { id: 2, name: 'Bob Herm', company: 'Example', city: "Tampa", state: "FL" },
  { id: 3, name: 'Kaui Ignace', company: 'Example', city: "Tampa", state: "NY" },
  { id: 4, name: 'Christian', company: 'Example', city: "Yonkers", state: "FL" },
  { id: 5, name: 'Deep Pau', company: 'Example', city: "Tampa", state: "NY" },
  { id: 6, name: 'Marciano', company: 'Example', city: "Yonkers", state: "FL" },
];

const App = () => {
  const [openColumns, setOpenColumns] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({ cities: [], companies: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumns, setSelectedColumns] = useState(columns.map(col => col.field)); // All columns selected by default

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

  const filteredRows = rows.filter(row => {
    const matchesCityFilter = filters.cities.length === 0 || filters.cities.includes(row.city);
    const matchesCompanyFilter = filters.companies.length === 0 || filters.companies.includes(row.company);
    const matchesSearchTerm = searchTerm === '' || Object.values(row).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    return matchesCityFilter && matchesCompanyFilter && matchesSearchTerm;
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
        rows={filteredRows}
        selectedRows={selectedRows}
        onRowSelection={handleRowSelection}
        toggleSelectAll={toggleSelectAll}
        selectedColumns={selectedColumns} // Pass selected columns to DataGridComponent
      />

      <ColumnDialog 
        open={openColumns} 
        onClose={handleCloseColumns} 
        columns={columns} 
        selectedColumns={selectedColumns} 
        onColumnSelectionChange={setSelectedColumns} // Handle column selection change
      />
      <FilterDialog open={openFilter} onClose={handleCloseFilter} onFilterChange={handleFilterChange} />
    </div>
  );
};

export default App;