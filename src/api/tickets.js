// src/api/tickets.js

// Importerar Axios för att göra HTTP-anrop
import axios from 'axios';

// Hämtar bas-URL från miljövariabeln REACT_APP_API_URL.
// Om variabeln inte är satt, används '/api' som standard.
const baseURL = process.env.REACT_APP_API_URL || '/api';

// Skapar en Axios-instans med angiven bas-URL.
// Alla anrop via denna instans kommer att förkortas med baseURL.
const api = axios.create({ baseURL });

/**
 * Hämtar en lista med ärenden (tickets) från API:et.
 *
 * @param {string} status - Statusfilter för ärenden (t.ex. "open", "closed").
 * @returns {Promise} - En Promise som löser till svaret med ärendelistan.
 */
export const getTickets = (status) =>
  api.get('/Tickets', {
    params: { status } // Skickar status som query-parameter
  });

/**
 * Skapar ett nytt ärende i systemet.
 *
 * @param {Object} data - Objekt med fält för nytt ärende, t.ex. title, description, priority, status.
 * @returns {Promise} - En Promise som löser till svaret med det skapade ärendet.
 */
export const createTicket = (data) =>
  api.post('/Tickets', data);

/**
 * Uppdaterar ett befintligt ärende.
 *
 * @param {number|string} id - ID för det ärende som ska uppdateras.
 * @param {Object} data - Objekt med de fält som ska uppdateras (t.ex. status, assignedTo).
 * @returns {Promise} - En Promise som löser till svaret med det uppdaterade ärendet.
 */
export const updateTicket = (id, data) =>
  api.patch(`/Tickets/${id}`, data);

/**
 * Lägger till en kommentar på ett ärende.
 *
 * @param {number|string} ticketId - ID för ärendet som kommentaren ska kopplas till.
 * @param {Object} data - Objekt med kommentardata, t.ex. author och message.
 * @returns {Promise} - En Promise som löser till svaret med den skapade kommentaren.
 */
export const addComment = (ticketId, data) =>
  api.post(
    `/Tickets/${ticketId}/comments`, // Dynamisk rutt till rätt ärende
    data                            // Kommentarens innehåll i request body
  );
