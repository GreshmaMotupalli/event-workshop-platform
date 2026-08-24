import api from "./api";

export const getEvents = (params) => {
  return api.get("/events", {
    params,
  });
};

export const getMyEvents = () => {
  return api.get("/events/my-events");
};

export const getEvent = (id) => {
  return api.get(`/events/${id}`);
};

export const createEvent = (eventData) => {
  return api.post("/events", eventData);
};

export const updateEvent = (id, eventData, token) => {
  return api.put(`/events/${id}`, eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteEvent = (id, token) => {
  return api.delete(`/events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

