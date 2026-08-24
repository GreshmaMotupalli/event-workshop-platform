import api from "./api";

export const registerForEvent = (eventId) => {
  return api.post(`/events/${eventId}/register`);
};

export const getMyRegistrations = () => {
  return api.get("/my-events");
};