import API from "../api/axiosConfig";

export const createOrganizer = async (data) => {
  return await API.post("/api/organizers", data);
};

export const getOrganizerById = async (id) => {
  return await API.get(`/api/organizers/${id}`);
};

