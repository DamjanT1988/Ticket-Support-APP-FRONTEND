// src/components/TicketList.test.jsx

import React from 'react';
// Importerar test‐verktyg från React Testing Library för att rendera komponent,
// söka element i DOM och simulera användarinteraktioner.
import { render, screen, fireEvent } from '@testing-library/react';
// Importerar komponenten som ska testas
import TicketList from './TicketList';

describe('TicketList', () => {
  // Mockdata: En array med två biljetter för att testa olika status
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
  // Mock-funktioner för props
  const onUpdate = jest.fn();  // Ska kallas när en ticket uppdateras
  const setFilter = jest.fn(); // Ska kallas när filter ändras

  it('renderar alla tickets initialt och kallar setFilter vid statusändring', () => {
    // Renderar TicketList-komponenten med nödvändiga props
    render(
      <TicketList
        tickets={tickets}
        onUpdate={onUpdate}
        filter="All"
        setFilter={setFilter}
      />
    );

    // Verifierar att båda ticket-titlarna finns i dokumentet från början
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();

    // Hittar alla <select>-element (comboboxar) i komponenten
    const combos = screen.getAllByRole('combobox');
    // Simulerar att användaren ändrar det första <select>-värdet till 'Open'
    fireEvent.change(combos[0], { target: { value: 'Open' } });
    // Kontrollera att setFilter anropas med rätt argument när filter ändras
    expect(setFilter).toHaveBeenCalledWith('Open');
  });
});
