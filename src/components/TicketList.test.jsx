// src/components/TicketList.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import TicketList from './TicketList';

const tickets = [
  { id:1, title:'A', description:'', status:'Open', createdAt:'2025-06-01T00:00:00Z', updatedAt:'', comments:[] },
  { id:2, title:'B', description:'', status:'Closed', createdAt:'2025-06-02T00:00:00Z', updatedAt:'', comments:[] }
];

describe('TicketList', () => {
  it('visar och filtrerar tickets', () => {
    const mockUpdate = jest.fn();
    const mockSetFilter = jest.fn();
    render(<TicketList tickets={tickets} onUpdate={mockUpdate} filter="Open" setFilter={mockSetFilter} />);
    // kontrollera att bara ticket med status Open visas
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.queryByText('B')).toBeNull();
    // byt filter
    fireEvent.change(screen.getByRole('combobox'), { target:{ value:'Closed' } });
    expect(mockSetFilter).toHaveBeenCalledWith('Closed');
  });
});
