// src/components/TicketList.test.jsx

import React from 'react';
// Importerar metoder från React Testing Library för rendering och användarsimulering
import { render, screen, fireEvent } from '@testing-library/react';
// Importerar komponenten som ska testas
import TicketList from './TicketList';

describe('TicketList', () => {
  // Mockdata: två ärenden med olika status och datum för att testa renderingen
  const tickets = [
    {
      id: 1,
      title: 'A',
      description: '',
      status: 'Open',
      createdAt: '2025-06-01T00:00:00Z',
      updatedAt: '',
      comments: []
    },
    {
      id: 2,
      title: 'B',
      description: '',
      status: 'Closed',
      createdAt: '2025-06-02T00:00:00Z',
      updatedAt: '',
      comments: []
    }
  ];
  // Mockfunktioner för props: onUpdate anropas vid statusändring, setFilter vid filterändring
  const onUpdate = jest.fn();
  const setFilter = jest.fn();

  /**
   * Verifierar att komponenten:
   * 1) Renderar alla ärenden initialt
   * 2) Anropar setFilter med nytt värde när användaren ändrar statusfiltret
   */
  it('renderar alla tickets initialt och kallar setFilter vid statusändring', () => {
    // Renderar TicketList med våra mockade tickets och funktioner
    render(
      <TicketList
        tickets={tickets}
        onUpdate={onUpdate}
        filter="All"
        setFilter={setFilter}
      />
    );

    // Kontroll: båda titlarna ska finnas i dokumentet från start
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();

    // Hitta alla <select>-element (comboboxar) som finns i komponenten
    const combos = screen.getAllByRole('combobox');
    // Simulerar att användaren väljer "Open" i den första comboboxen
    fireEvent.change(combos[0], { target: { value: 'Open' } });
    // Förväntar att setFilter anropas med argumentet "Open"
    expect(setFilter).toHaveBeenCalledWith('Open');
  });
});
