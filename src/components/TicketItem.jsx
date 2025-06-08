// src/components/TicketItem.jsx

import React, { useState } from 'react';
import CommentThread from './CommentThread';

// Definierar möjliga statusvärden som dropdown-alternativ
const STATUS_OPTIONS = ['Open', 'In Progress', 'Closed'];

/**
 * Visar ett enskilt ärende (ticket) med titel, beskrivning, statusval,
 * skapandedatum och möjlighet att visa kommentarer.
 *
 * @param {Object} props
 * @param {Object} props.ticket    - Ärendeobjekt som innehåller id, title, description, status, createdAt och comments.
 * @param {Function} props.onUpdate - Callback som anropas när ärendets status ändras.
 */
export default function TicketItem({ ticket, onUpdate }) {
  // State för att styra om kommentarssektionen ska visas eller döljas
  const [showComments, setShowComments] = useState(false);

  /**
   * Hanterar statusändring i dropdown.
   * Anropar onUpdate med ticket.id och ett uppdaterat ärendeobjekt.
   *
   * @param {Event} e - Change-event från select-elementet.
   */
  const handleStatusChange = (e) => {
    onUpdate(ticket.id, {
      // Behåll övriga fält oförändrade
      title:       ticket.title,
      description: ticket.description,
      // Uppdatera statusvärdet till det nya
      status:      e.target.value
    });
  };

  return (
    <div className="border rounded p-4 shadow-sm">
      {/* Rad för titel och beskrivning */}
      <div className="flex justify-between items-start">
        <div>
          {/* Ärendets titel */}
          <h3 className="font-semibold text-lg">{ticket.title}</h3>
          {/* Ärendets beskrivning */}
          <p className="text-gray-700">{ticket.description}</p>
        </div>
        {/* Kontroller för statusval och visning av kommentarer */}
        <div className="space-y-2">
          {/* Dropdown för att välja ärendets status */}
          <select
            value={ticket.status}
            onChange={handleStatusChange}
            className="border rounded p-1"
          >
            {STATUS_OPTIONS.map((s) => (
              // Varje alternativ renderas utifrån STATUS_OPTIONS
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {/* Knapp för att visa/dölja kommentarssektionen */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-sm underline"
          >
            {showComments ? 'Hide Comments' : 'Comments'}
          </button>
        </div>
      </div>

      {/* Visar när ärendet skapades, formaterat som lokal tid */}
      <p className="text-xs text-gray-500 mt-2">
        Created: {new Date(ticket.createdAt).toLocaleString()}
      </p>

      {/* Visa CommentThread-komponenten om showComments är true */}
      {showComments && <CommentThread ticket={ticket} />}
    </div>
  );
}
