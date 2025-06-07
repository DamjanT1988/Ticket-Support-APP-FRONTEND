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
  const setFilter = jest.fn();

  it('renderar alla tickets initialt och kallar setFilter vid statusändring', () => {
    render(
      <TicketList
        tickets={tickets}
        onUpdate={onUpdate}
        filter="All"
        setFilter={setFilter}
      />
    );

    // Båda biljetterna syns initialt
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();

    // Hitta alla comboboxar, använd den första som är status‐filtret
    const combos = screen.getAllByRole('combobox');
    fireEvent.change(combos[0], { target: { value: 'Open' } });
    expect(setFilter).toHaveBeenCalledWith('Open');
  });
});
