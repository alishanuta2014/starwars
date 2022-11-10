import React, { useState } from "react";
import "./App.css";
import { CircularProgress, Pagination, Paper } from "@mui/material";
import Planet from "./components/Planet";
import PlanetSearchWidget from "./components/PlanetSearchWidget";
import useFetchPlanets from "./hooks/useFetchPlanets";
import axios from "axios";

function App() {
  const [page, setPage] = useState(1);
  const [filteredPlanet, setFilteredPlanet] = useState(null);
  const { planets, count, loading, error } = useFetchPlanets(page);

  const handlePageSelection = (event, page) => {
    setPage(page)
  }

  const handleSearchChange = (event, planetName) => {
    if (planetName) {
      axios.get(`https://swapi.dev/api/planets/?search=${planetName}`).then((res) => {
        setFilteredPlanet(res.data.results[0])
      });
    } else {
      setFilteredPlanet(null)
    }
  }
 
  return (
    <div className="App">
      <h1>Star Wars Planets Guide</h1>
      {!loading && <PlanetSearchWidget planets={planets} handleSearchChange={handleSearchChange} />}
      {loading && <CircularProgress />}
      {error && <div>Please try refreshing your browser</div>}
      <Paper style={{ width: 360, maxHeight: 500, overflow: "auto", marginBottom: 20 }}>
        {!loading && !filteredPlanet && planets &&
          planets.length &&
          planets.map((planet) => {
            return <Planet planet={planet} />;
          })}
          {filteredPlanet && <Planet planet={filteredPlanet} />}
      </Paper>
      <Pagination 
        style={(loading || filteredPlanet) ? { display: 'none' } : {}}
        count={count / planets.length} showFirstButton showLastButton 
        onChange={handlePageSelection}
      />
    </div>
  );
}

export default App;
