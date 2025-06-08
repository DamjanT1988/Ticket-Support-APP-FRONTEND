// src/components/CommentThread.jsx

import React, { useState, useEffect } from 'react';
import * as api from '../api/tickets';

/**
 * Kommentarstråd-komponent för ett specifikt ärende.
 *
 * @param {Object} props
 * @param {Object} props.ticket - Ärender-objekt som innehåller bl.a. id, status och initiala kommentarer.
 */
export default function CommentThread({ ticket }) {
  // Lokalt state för att hålla reda på kommentarslistan.
  // Initieras med eventuella kommentarer som redan finns på ticket-objektet.
  const [comments, setComments] = useState(ticket.comments || []);
  // Lokalt state för innehållet i textarea när användaren skriver en ny kommentar.
  const [text, setText] = useState('');

  /**
   * Hämtar uppdaterade kommentarer för det aktuella ärendet från API:et.
   * Anropar getTickets med status och filtrerar ut rätt ärende efter id.
   */
  const fetchComments = async () => {
    try {
      // Hämta alla ärenden med aktuell status
      const { data } = await api.getTickets(ticket.status);
      // Hitta ärendet med matching id
      const updated = data.find((t) => t.id === ticket.id);
      // Uppdatera kommentarer i state, eller sätt tom array om det saknas
      setComments(updated.comments || []);
    } catch (err) {
      // Logga fel vid misslyckad hämtning av kommentarer
      console.error('Failed to fetch comments', err);
    }
  };

  // useEffect körs en gång vid komponentmount för att initialt hämta kommentarer.
  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Hanterar inlämning av ny kommentar.
   * - Förhindrar default form-beteende.
   * - Validerar att text inte är tom.
   * - Skickar kommentar till API.
   * - Rensar textarea och hämtar om kommentarer.
   */
  const handleAdd = async (e) => {
    e.preventDefault();
    // Avbryt om användaren inte skrivit något
    if (!text.trim()) return;
    // Skicka kommentar till API
    await api.addComment(ticket.id, { text });
    // Återställ textarea
    setText('');
    // Hämta uppdaterade kommentarer
    fetchComments();
  };

  return (
    <div className="mt-4 border-t pt-2">
      {/* Rubrik för kommentarssektionen */}
      <h4 className="font-medium">Comments</h4>

      {/* Lista över alla kommentarer */}
      {comments.map((c) => (
        <div key={c.id} className="text-sm text-gray-800 mt-1">
          {/* Själva kommentars­texten */}
          <p>{c.text}</p>
          {/* Tidsstämpel formaterad till lokal sträng */}
          <p className="text-xs text-gray-500">
            {new Date(c.createdAt).toLocaleString()}
          </p>
        </div>
      ))}

      {/* Formulär för att lägga till ny kommentar */}
      <form onSubmit={handleAdd} className="mt-2">
        {/* Textarea-bindning till state */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border rounded p-1"
          placeholder="Add a comment"
        />
        {/* Submit-knapp för att skicka formuläret */}
        <button
          type="submit"
          className="mt-1 px-3 py-1 bg-green-600 text-white rounded text-sm"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
}
