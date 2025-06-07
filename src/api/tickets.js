// src/api/tickets.js
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || '/api';
const api = axios.create({ baseURL });

// Always supply a status, as the API requires it
export const getTickets = (status) =>
  api.get('/Tickets', { params: { status } });
export const createTicket = (data) => api.post('/Tickets', data);
export const updateTicket = (id, data) => api.patch(`/Tickets/${id}`, data);
export const addComment = (ticketId, data) => api.post(`/Tickets/${ticketId}/comments`, data);

