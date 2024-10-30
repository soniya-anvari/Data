import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox, Button } from '@mui/material';

const ColumnDialog = ({ open, onClose, columns, selectedColumns, onColumnSelectionChange }) => {
  const handleColumnChange = (columnField) => {
    const updatedColumns = selectedColumns.includes(columnField)
      ? selectedColumns.filter(field => field !== columnField)
      : [...selectedColumns, columnField];
    
    onColumnSelectionChange(updatedColumns);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Columns</DialogTitle>
      <DialogContent>
        {columns.map((col) => (
          <FormControlLabel
            key={col.field}
            control={
              <Checkbox
                checked={selectedColumns.includes(col.field)}
                onChange={() => handleColumnChange(col.field)}
              />
            }
            label={col.headerName}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColumnDialog;