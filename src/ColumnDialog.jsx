import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox, Button } from '@mui/material';

const ColumnDialog = ({ open, onClose, columns }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Columns</DialogTitle>
      <DialogContent>
        {columns.map((col) => (
          <FormControlLabel
            key={col.field}
            control={<Checkbox checked={true} onChange={() => {}} />}
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