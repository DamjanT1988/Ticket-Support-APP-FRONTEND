// src/components/TicketList.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TicketList from './TicketList';

describe('TicketList', () => {
  const tickets = [
    { id: 1, title: 'A', description: '', status: 'Open', createdAt: '2025-06-01T00:00:00Z', updatedAt: '', comments: [] },
    { id: 2, title: 'B', description: '', status: 'Closed', createdAt: '2025-06-02T00:00:00Z', updatedAt: '', comments: [] }
  ];
  const onUpdate = jest.fn();

  it('visar alla tickets initialt och filtrerar när man väljer status', () => {
    render(<TicketList tickets={tickets} onUpdate={onUpdate} />);

    // Initialt ska både A och B synas (status All)
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();

    // Filtrera på "Open" via aria‐label
    fireEvent.change(screen.getByLabelText(/Status filter/i), { target: { value: 'Open' } });

    // Efter filtrering ska bara A synas
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.queryByText('B')).toBeNull();
  });
});
