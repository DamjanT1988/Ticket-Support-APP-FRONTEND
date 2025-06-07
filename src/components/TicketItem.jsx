
// src/components/TicketItem.jsx
import React, { useState } from 'react';
import CommentThread from './CommentThread';

// Define status options here as well
const STATUS_OPTIONS = ['Open', 'In Progress', 'Closed'];

export default function TicketItem({ ticket, onUpdate }) {
  const [showComments, setShowComments] = useState(false);

  const handleStatusChange = (e) => {
    onUpdate(ticket.id, { status: e.target.value });
  };

  return (
    <div className="border rounded p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{ticket.title}</h3>
          <p className="text-gray-700">{ticket.description}</p>
        </div>
        <div className="space-y-2">
          <select
            value={ticket.status}
            onChange={handleStatusChange}
            className="border rounded p-1"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-sm underline"
          >
            {showComments ? 'Hide Comments' : 'Comments'}
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Created: {new Date(ticket.createdAt).toLocaleString()}
      </p>
      {showComments && <CommentThread ticket={ticket} />}
    </div>
  );
}

