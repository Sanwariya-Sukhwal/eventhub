import API from "../api/axiosConfig";

export const createVenue = (venueData) => {
  return API.post("/api/venues", venueData);
};

export const getVenueById = (id) => {
  return API.get(`/api/venues/${id}`);
};

export const getAllVenues = (
  page = 0,
  size = 10,
  sortBy = "name",
  direction = "asc"
) => {
  return API.get(
    `/api/venues?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`
  );
};