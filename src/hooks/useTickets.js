// src/hooks/useTickets.js

import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/tickets';

/**
 * Custom hook för att hämta, skapa och uppdatera tickets med automatisk
 * uppdatering när filter eller data ändras.
 *
 * Returvärden:
 * @returns {Object} 
 *   tickets   – Array med ärendeobjekt hämtade från API:et.
 *   loading   – Boolean som indikerar om en hämtning pågår.
 *   add       – Funktion för att skapa ett nytt ärende. Tar ett dataobjekt som parameter.
 *   update    – Funktion för att uppdatera ett befintligt ärende. Tar id och ändringsobjekt.
 *   filter    – Sträng med aktuell statusfiltrering.
 *   setFilter – Funktion för att ändra filterstatus.
 */
export function useTickets() {
  // State för arrayen med hämtade ärenden
  const [tickets, setTickets] = useState([]);
  // State för att indikera laddningsstatus (true medan fetch pågår)
  const [loading, setLoading] = useState(true);
  // State för aktuell statusfilter; standardvärde 'Open'
  const [filter, setFilter] = useState('Open');

  /**
   * Hämtar ärenden från API:et baserat på aktuell filter-status.
   * Används både initialt och när filter ändras.
   * useCallback säkerställer att funktionen byts ut först när filter ändras,
   * vilket gör att useEffect kan bevaka den som beroende.
   */
  const fetchAll = useCallback(async () => {
    // Sätt loading till true innan hämtningen startar
    setLoading(true);
    try {
      // Anropa API med valt filter och uppdatera tickets-state
      const { data } = await api.getTickets(filter);
      setTickets(data);
    } catch (err) {
      // Logga fel vid misslyckad API-anrop
      console.error('Failed to fetch tickets', err);
    } finally {
      // Oavsett resultat, avsluta loading-state
      setLoading(false);
    }
  }, [filter]);

  /**
   * Effekt som kör fetchAll när hooken mountas och när fetchAll (dvs filter) ändras.
   */
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  /**
   * Skapar ett nytt ärende via API och hämtar sedan om listan.
   *
   * @param {Object} newData – Objekt med fält för det nya ärendet.
   */
  const add = async (newData) => {
    await api.createTicket(newData);
    await fetchAll();
  };

  /**
   * Uppdaterar ett befintligt ärende via API och hämtar sedan om listan.
   *
   * @param {number|string} id      – ID för ärendet som ska uppdateras.
   * @param {Object} changes        – Objekt med de fält som ska ändras.
   */
  const update = async (id, changes) => {
    await api.updateTicket(id, changes);
    await fetchAll();
  };

  // Exponera state och funktioner för komponenter som använder hooken
  return { tickets, loading, add, update, filter, setFilter };
}
