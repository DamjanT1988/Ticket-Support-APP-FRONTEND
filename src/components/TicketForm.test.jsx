// src/components/TicketForm.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TicketForm from './TicketForm';

describe('TicketForm', () => {
  it('anropar onSubmit med rätt data', () => {
    const mockSubmit = jest.fn();
    render(<TicketForm onSubmit={mockSubmit} />);
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Ny titel' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Beskrivning' } });
    fireEvent.click(screen.getByText(/Create Ticket/i));
    expect(mockSubmit).toHaveBeenCalledWith(
      { title: 'Ny titel', description: 'Beskrivning', status: 'Open' },
      undefined
    );
  });
});
