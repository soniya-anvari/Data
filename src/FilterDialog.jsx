import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox, Button, Chip } from '@mui/material';

const FilterDialog = ({ open, onClose, onFilterChange }) => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const cities = ["Yonkers", "Tampa", "New York", "Los Angeles", "Chicago"];
  const companies = ["Example", "Sample", "Test"];

  const handleCityChange = (city) => {
    setSelectedCities((prev) => 
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  const handleCompanyChange = (company) => {
    setSelectedCompanies((prev) => 
      prev.includes(company) ? prev.filter(c => c !== company) : [...prev, company]
    );
  };

  const handleApplyFilters = () => {
    onFilterChange({ cities: selectedCities, companies: selectedCompanies });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filter Rows</DialogTitle>
      <DialogContent>
        <div>
          <strong style={{ fontWeight: 'bold' }}>City</strong>
          <br />
          {cities.map((city) => (
            <FormControlLabel
              key={city}
              control={
                <Checkbox
                  checked={selectedCities.includes(city)}
                  onChange={() => handleCityChange(city)}
                />
              }
              label={city}
            />
          ))}
        </div>
        <div style={{ marginTop: '20px' }}>
          <strong style={{ fontWeight: 'bold' }}>Company</strong>
          <br />
          {companies.map((company) => (
            <FormControlLabel
              key={company}
              control={
                <Checkbox
                  checked={selectedCompanies.includes(company)}
                  onChange={() => handleCompanyChange(company)}
                />
              }
              label={company}
            />
          ))}
        </div>

        {/* Display Selected Filters */}
        <div style={{ marginTop: '20px' }}>
          <strong>Selected Filters:</strong>
          {selectedCities.map(city => (
            <Chip
              key={city}
              label={city}
              onDelete={() => handleCityChange(city)}
              style={{ margin: '5px' }}
            />
          ))}
          {selectedCompanies.map(company => (
            <Chip
              key={company}
              label={company}
              onDelete={() => handleCompanyChange(company)}
              style={{ margin: '5px' }}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleApplyFilters}>Apply</Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;