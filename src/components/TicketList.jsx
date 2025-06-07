
// src/components/TicketList.jsx
import React, { useState } from 'react';
import TicketItem from './TicketItem';

const STATUS_OPTIONS = ['Open', 'In Progress', 'Closed'];

export default function TicketList({ tickets, onUpdate, filter, setFilter }) {
  const [sortAsc, setSortAsc] = useState(false);

  const sorted = [...tickets].sort((a, b) => {
    const diff = new Date(a.createdAt) - new Date(b.createdAt);
    return sortAsc ? diff : -diff;
  });

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-1"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="px-3 py-1 border rounded"
        >
          Sort by Date {sortAsc ? '↑' : '↓'}
        </button>
      </div>
      <div className="space-y-4">
        {sorted.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
}

