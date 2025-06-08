// src/App.test.js

import React from 'react';
// Importerar metoder från React Testing Library för att rendera komponent och söka i DOM
import { render, screen } from '@testing-library/react';
// Importerar huvudkomponenten App som ska testas
import App from './App';

describe('App', () => {
  /**
   * Testar att huvudrubriken för applikationen renderas korrekt.
   * 
   * - Renderar <App />
   * - Förväntar att texten "Support Tickets" finns i dokumentet,
   *   oavsett versaler/gemener (case-insensitive).
   */
  it('visar huvudrubriken', () => {
    // Rendera App-komponenten
    render(<App />);
    // Kontrollera att texten "Support Tickets" finns på skärmen
    expect(screen.getByText(/Support Tickets/i)).toBeInTheDocument();
  });
});
