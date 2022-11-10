import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function PlanetSearchWidget({ planets, handleSearchChange }) {
  return (
    <>
      <Autocomplete
        disablePortal
        freeSolo
        options={planets.map((planet) => planet.name)}
        onChange={handleSearchChange}
        sx={{ width: 360 }}
        renderInput={(params) => <TextField {...params} label="Search For Planets" />}
      />
    </>
  );
}
