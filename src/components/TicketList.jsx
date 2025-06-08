// src/components/TicketList.jsx

import React, { useState } from 'react';
import TicketItem from './TicketItem';

// Tillåtna statusvärden för filtrering
const STATUS_OPTIONS = ['Open', 'In Progress', 'Closed'];

/**
 * Lista över ärenden med filtrering och sortering.
 *
 * @param {Object} props
 * @param {Array<Object>} props.tickets - Array med ärendeobjekt att visa.
 * @param {Function} props.onUpdate - Callback som anropas när ett ärende uppdateras.
 * @param {string} props.filter - Aktuellt statusfilter (värde från STATUS_OPTIONS).
 * @param {Function} props.setFilter - Funktion för att uppdatera statusfiltret.
 */
export default function TicketList({ tickets, onUpdate, filter, setFilter }) {
  // State för sorteringsordningen: false = fallande, true = stigande
  const [sortAsc, setSortAsc] = useState(false);

  /**
   * Skapar en sorterad kopia av tickets-arrayen baserat på createdAt.
   * Om sortAsc är true sorteras stigande (äldst först), annars fallande (nyast först).
   */
  const sorted = [...tickets].sort((a, b) => {
    // Beräkna skillnaden i tid mellan två ärenden
    const diff = new Date(a.createdAt) - new Date(b.createdAt);
    // Returnera diff för stigande, annars negated diff för fallande
    return sortAsc ? diff : -diff;
  });

  return (
    <div className="mt-6">
      {/* Kontrollpanel: filter-dropdown och sorteringsknapp */}
      <div className="flex items-center justify-between mb-4">
        {/* Dropdown för att välja statusfilter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)} // Uppdatera filter via props
          className="border rounded p-1"
        >
          {STATUS_OPTIONS.map((s) => (
            // Skapa <option>-element för varje status
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Knapp för att vända sorteringsordningen */}
        <button
          onClick={() => setSortAsc(!sortAsc)}  // Växla mellan stigande/fallande
          className="px-3 py-1 border rounded"
        >
          {/* Visa pil upp eller ner beroende på sortAsc */}
          Sort by Date {sortAsc ? '↑' : '↓'}
        </button>
      </div>

      {/* Lista med ärenden; varje TicketItem får eget onUpdate och props */}
      <div className="space-y-4">
        {sorted.map((ticket) => (
          <TicketItem
            key={ticket.id}         // Unikt nyckelvärde för React
            ticket={ticket}         // Ärendeobjekt som prop
            onUpdate={onUpdate}     // Callback för statusändring
          />
        ))}
      </div>
    </div>
  );
}
