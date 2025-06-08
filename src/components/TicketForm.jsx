// src/components/TicketForm.jsx

import React, { useState } from 'react';

/**
 * Formulärskomponent för att skapa eller uppdatera ett ärende (ticket).
 *
 * @param {Object} props
 * @param {Function} props.onSubmit - Funktion som anropas vid formulärinsändning.
 *                                    Tar två argument: ärendedata och eventuellt befintligt id.
 * @param {Object} [props.initial={}] - Initiala värden för formuläret vid uppdatering.
 *                                      Kan innehålla id, title, description, status.
 */
export default function TicketForm({ onSubmit, initial = {} }) {
  // State för titelfält, initieras med initial.title eller tom sträng
  const [title, setTitle] = useState(initial.title || '');
  // State för beskrivningsfält, initieras med initial.description eller tom sträng
  const [description, setDescription] = useState(initial.description || '');

  /**
   * Hanterar formulärets submit-händelse:
   * - Förhindrar standardbeteendet.
   * - Validerar att titel och beskrivning inte är tomma.
   * - Anropar onSubmit med objekt innehållande title, description och status.
   * - Återställer fälten efter inskick.
   *
   * @param {Event} e - Submit-eventet från formen.
   */
  const handle = (e) => {
    e.preventDefault();
    // Avbryt om något fält endast innehåller whitespace
    if (!title.trim() || !description.trim()) return;

    // Bygg ärendedataobjekt
    const ticketData = {
      title,
      description,
      // Behåll status vid uppdatering, annars sätt 'Open' som standard
      status: initial.id ? initial.status : 'Open'
    };

    // Anropa callback med data och id (om det finns)
    onSubmit(ticketData, initial.id);

    // Nollställ formulärfält
    setTitle('');
    setDescription('');
  };

  return (
    <form
      onSubmit={handle}
      className="border rounded p-4 shadow-sm"
    >
      {/* Titelfält */}
      <div className="mb-2">
        <label htmlFor="title" className="block text-sm">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}  // Uppdatera state vid ändring
          className="w-full border rounded p-1"
          required  // Browser-validering: fältet måste vara ifyllt
        />
      </div>

      {/* Beskrivningsfält */}
      <div className="mb-2">
        <label htmlFor="description" className="block text-sm">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}  // Uppdatera state vid ändring
          className="w-full border rounded p-1"
          required  // Browser-validering: fältet måste vara ifyllt
        />
      </div>

      {/* Submit-knapp ändrar text beroende på om vi skapar eller uppdaterar */}
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {initial.id ? 'Update Ticket' : 'Create Ticket'}
      </button>
    </form>
  );
}
