import axios from "axios"

const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

// station URL's
const stationsBaseUrl = `${baseUrl}/stations`
const stationNamesUrl = `${stationsBaseUrl}/names`
const singleStationByNameUrl = (name: string) => `${stationNamesUrl}/${name}`

const getStationNames = () => {
  return axios.get(stationNamesUrl)
    .then(response => response.data)
    .catch(error => console.warn(error))
}

const getStationByName = (name: string) => {
  return axios.get(singleStationByNameUrl(name))
    .then(response => response.data)
    .catch(error => console.warn(error))
    // .then((response) => setSelectedStation(response.data))
    // .catch((_) => setHasStationHerror(true))
    // .finally(() => setIsLoading(false))
}

const getStations = () => {
  return axios.get(stationsBaseUrl)
    .then(response => response.data)
    .catch(error => console.warn(error))
}

const stationApi = {
  getStationNames,
  getStationByName,
  getStations
}

export default stationApi