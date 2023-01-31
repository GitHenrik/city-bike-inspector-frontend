/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import JourneyList from "./components/journeyList";
import StationList from "./components/stationList";
import journeyApi from "./api/journeyApi";
import stationApi from "./api/stationApi";
import StationTable from "./components/stationTable";
import { getUrl } from "./utils/mapHandler";

export interface Station {
  fid: number;
  id: string;
  nameFinnish: string;
  nameSwedish: string;
  nameEnglish: string;
  addressFinnish: string;
  addressSwedish: string;
  cityFinnish?: string;
  citySwedish?: string;
  operator?: string;
  capacity: number;
  locationX: number;
  locationY: number;
}

export interface Journey {
  departureTime: string;
  returnTime: string;
  departureStationId: string;
  departureStationName: string;
  returnStationId: string;
  returnStationName: string;
  coveredDistance: number;
  duration: number;
  id: number;
}

// TODO:
// generic cleanup after implementing wanted frontend functionalities
// wanted error/loading states
// Open coordinates on map

/**
 * A simple frontend to display backend data.
 * This project is mainly backend-focused.
 */

const App = () => {
  // station / journey states
  const [stationNames, setStationNames] = React.useState<string[]>();
  const [journeys, setJourneys] = React.useState<Journey[]>();
  const [stations, setStations] = React.useState<Station[]>([]);

  // loading / error states
  const [hasStationError, setHasStationHerror] = React.useState(false);
  const [hasJourneyError, setHasJourneyError] = React.useState(false);
  const [isLoadingStations, setIsLoadingStations] = React.useState(false);
  const [isLoadingJourneys, setIsLoadingJourneys] = React.useState(false);

  // coordinate states
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [mapUrl, setMapUrl] = React.useState("");

  //get all station names on load
  React.useEffect(() => {
    setIsLoadingStations(true);
    stationApi
      .getStationNames()
      .then((names) => setStationNames(names))
      .catch((_) => setHasStationHerror(true))
      .finally(() => setIsLoadingStations(false));
  }, []);

  // get some journeys on load
  React.useEffect(() => {
    setIsLoadingJourneys(true);
    journeyApi
      .getJourneys()
      .then((journeys) => setJourneys(journeys))
      .catch((_) => setHasJourneyError(true))
      .finally(() => setIsLoadingJourneys(false));
  }, []);

  const fetchStations = async () => {
    const stations = await stationApi.getStations();
    setStations(stations);
  };

  const getCoordinates = (station: Station) => {
    const { locationX, locationY } = station;
    setX(locationX);
    setY(locationY);
    setMapUrl(getUrl(locationX, locationY));
  };

  return (
    <div className="App">
      <h1>City Bike Inspector</h1>
      <StationList stationNames={stationNames} isLoading={isLoadingStations} />
      <hr />
      <JourneyList journeys={journeys} />
      <hr />
      <h2>Select coordinates by clicking a station from the station table.</h2>
      <h3>Selected coordinates:</h3>
      <div>
        X: {x}, Y: {y}
      </div>
      {mapUrl && (
        <a href={mapUrl} target="_blank" rel="noreferrer">
          <button>Show in Google Maps!</button>
        </a>
      )}
      <hr />
      <h2>Every station in existence</h2>
      <button onClick={() => fetchStations()}>Click for stations</button>
      <StationTable stations={stations} getCoordinates={getCoordinates} />
    </div>
  );
};

export default App;
