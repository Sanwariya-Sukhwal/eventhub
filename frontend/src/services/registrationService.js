import API from "../api/axiosConfig";

export const createRegistration = (data) => {
  return API.post("/api/registrations", data);
};

export const getRegistrationById = (id) => {
  return API.get(`/api/registrations/${id}`);
};

export const deleteRegistration = (id) => {
  return API.delete(`/api/registrations/${id}`);
};

export const getRegistrationsByEvent = (eventId) => {
  return API.get(
    `/api/registrations/event/${eventId}`
  );
};