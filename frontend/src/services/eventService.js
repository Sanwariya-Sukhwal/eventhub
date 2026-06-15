import API from "../api/axiosConfig";

export const createEvent = (data) => {
  return API.post("/api/events", data);
};

// export const getAllEvents = () => {
//   return API.get("/api/events");
// };

export const getEventById = (id) => {
  return API.get(`/api/events/${id}`);
};

export const updateEvent = (id, data) => {
  return API.put(`/api/events/${id}`, data);
};

export const deleteEvent = (id) => {
  return API.delete(`/api/events/${id}`);
};

export const getEventAttendees = (id) => {
  return API.get(`/api/events/${id}/attendees`);
};

export const getAllEvents = (
  page = 0,
  size = 10,
  sortBy = "eventDate",
  direction = "asc"
) => {
  return API.get(
    `/api/events?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`
  );
};