import React from "react";
import { Paper, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

const MovieSort = ({ onSort, currentSort }) => {
  const handleSortChange = (event) => {
    onSort(event.target.value);
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ minWidth: 220 }}>
        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={currentSort}
            label="Sort By"
            onChange={handleSortChange}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="title-asc">Title (A-Z)</MenuItem>
            <MenuItem value="title-desc">Title (Z-A)</MenuItem>
            <MenuItem value="rating-desc">Rating (Highest)</MenuItem>
            <MenuItem value="rating-asc">Rating (Lowest)</MenuItem>
            <MenuItem value="release-desc">Release Date (Newest)</MenuItem>
            <MenuItem value="release-asc">Release Date (Oldest)</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default MovieSort;