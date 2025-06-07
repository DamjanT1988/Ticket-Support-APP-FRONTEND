
// src/pages/Home.jsx
import React from 'react';
import TicketForm from '../components/TicketForm';
import TicketList from '../components/TicketList';
import { useTickets } from '../hooks/useTickets';

export default function Home() {
  const { tickets, loading, add, update, filter, setFilter } = useTickets();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Support Tickets</h1>
      <TicketForm onSubmit={add} />
      {loading ? (
        <p className="mt-4">Loading tickets…</p>
      ) : (
        <TicketList
          tickets={tickets}
          onUpdate={update}
          filter={filter}
          setFilter={setFilter}
        />
      )}
    </div>
  );
}
