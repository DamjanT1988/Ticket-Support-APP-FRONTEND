// src/components/TicketItem.test.jsx

import React from 'react';
// Importerar verktyg från React Testing Library för rendering och interaktion
import { render, screen, fireEvent } from '@testing-library/react';
// Importerar komponenten som ska testas
import TicketItem from './TicketItem';

describe('TicketItem', () => {
  // Mockdata: Ett exempel-ärende med minimum av fält för att testa komponenten
  const ticket = {
    id: 1,
    title: 'T',
    description: 'D',
    status: 'Open',
    createdAt: '',
    updatedAt: '',
    comments: []
  };

  /**
   * Testar att onUpdate-anropet görs med korrekt argument
   * när användaren ändrar status i dropdown-menyn.
   */
  it('byter status vid val', () => {
    // Skapar en jest-mock för onUpdate-propen
    const mockUpdate = jest.fn();

    // Renderar TicketItem-komponenten med mock-funktionen
    render(
      <TicketItem
        ticket={ticket}
        onUpdate={mockUpdate}
      />
    );

    // Hittar <select>-elementet via dess nuvarande värde och ändrar det till 'Closed'
    fireEvent.change(
      screen.getByDisplayValue('Open'),
      { target: { value: 'Closed' } }
    );

    // Verifierar att mockUpdate kallades med:
    // 1) korrekt ticket.id (1)
    // 2) ett objekt där title och description är oförändrade, och status är 'Closed'
    expect(mockUpdate).toHaveBeenCalledWith(
      1,
      { title: 'T', description: 'D', status: 'Closed' }
    );
  });
});
