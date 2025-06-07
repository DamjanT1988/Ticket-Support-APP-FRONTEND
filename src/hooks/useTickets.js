// src/hooks/useTickets.js
import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/tickets';

export function useTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Open'); // default

  // Fetch whenever filter changes
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.getTickets(filter);
      setTickets(data);
    } catch (err) {
      console.error('Failed to fetch tickets', err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const add = async (newData) => {
    await api.createTicket(newData);
    await fetchAll();
  };

  const update = async (id, changes) => {
    await api.updateTicket(id, changes);
    await fetchAll();
  };

  return { tickets, loading, add, update, filter, setFilter };
}

