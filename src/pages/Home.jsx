// src/pages/Home.jsx

import React from 'react';
// Importerar formulär för att skapa nya ärenden
import TicketForm from '../components/TicketForm';
// Importerar listkomponent för att visa befintliga ärenden
import TicketList from '../components/TicketList';
// Importerar custom hook för att hantera hämtning, skapande och uppdatering av ärenden
import { useTickets } from '../hooks/useTickets';

/**
 * Startsida för Support Tickets-appen.
 *
 * - Visar en rubrik.
 * - Ger användaren möjlighet att skapa nya ärenden via TicketForm.
 * - Visar en lista med ärenden via TicketList när de är laddade.
 *
 * Använder useTickets-hooken för datahantering:
 *   tickets   – Array med ärenden.
 *   loading   – Boolean som indikerar om ärenden fortfarande laddas.
 *   add       – Funktion för att skapa nytt ärende.
 *   update    – Funktion för att uppdatera befintligt ärende.
 *   filter    – Sträng med aktuellt statusfilter.
 *   setFilter – Funktion för att ändra statusfiltret.
 */
export default function Home() {
  // Destrukturera värden från useTickets-hooken
  const { tickets, loading, add, update, filter, setFilter } = useTickets();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Huvudrubrik för sidan */}
      <h1 className="text-3xl font-bold mb-4">Support Tickets</h1>

      {/* Formulär för att skapa nya ärenden */}
      <TicketForm onSubmit={add} />

      {/* Villkorlig rendering: visa laddningsmeddelande eller lista */}
      {loading ? (
        // Visas medan tickets hämtas från API
        <p className="mt-4">Loading tickets…</p>
      ) : (
        // När laddning är klar, rendera TicketList med props för data och callbacks
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
