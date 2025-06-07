// src/components/TicketItem.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import TicketItem from './TicketItem';

const ticket = { id:1, title:'T', description:'D', status:'Open', createdAt:'', updatedAt:'', comments:[] };

describe('TicketItem', () => {
  it('byter status vid val', () => {
    const mockUpdate = jest.fn();
    render(<TicketItem ticket={ticket} onUpdate={mockUpdate} />);
    fireEvent.change(screen.getByDisplayValue('Open'), { target:{ value:'Closed' } });
    expect(mockUpdate).toHaveBeenCalledWith(1, {
   title: 'T',
   description: 'D',
   status: 'Closed'
 });
  });
});
