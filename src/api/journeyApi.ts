import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

// journey URL's
const journeysBaseUrl = `${baseUrl}/journeys`;

const getJourneys = () => {
  return axios
    .get(`${journeysBaseUrl}`)
    .then((response) => response.data)
    .catch((error) => console.warn(error));
};

const journeyApi = {
  getJourneys,
};

export default journeyApi;
