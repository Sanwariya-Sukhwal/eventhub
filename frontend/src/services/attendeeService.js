import API from "../api/axiosConfig";

export const createAttendee = (data) => {
  return API.post("/api/attendees", data);
};

export const getAttendeeById = (id) => {
  return API.get(`/api/attendees/${id}`);
};

export const updateAttendee = (id, data) => {
  return API.put(`/api/attendees/${id}`, data);
};

export const deleteAttendee = (id) => {
  return API.delete(`/api/attendees/${id}`);
};

export const getAllAttendees = (
  page = 0,
  size = 10,
  sortBy = "name",
  direction = "asc"
) => {
  return API.get(
    `/api/attendees?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`
  );
};