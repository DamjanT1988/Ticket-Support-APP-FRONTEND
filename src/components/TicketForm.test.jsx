// src/components/TicketForm.test.jsx

import React from 'react';
// Importerar verktyg från React Testing Library för att rendera komponent,
// söka element i DOM och simulera användarinteraktioner.
import { render, screen, fireEvent } from '@testing-library/react';
// Importerar komponenten som ska testas
import TicketForm from './TicketForm';

describe('TicketForm', () => {
  /**
   * Testar att onSubmit anropas med korrekt data när formuläret skickas in.
   */
  it('anropar onSubmit med rätt data', () => {
    // Skapar en mock-funktion för onSubmit-propen
    const mockSubmit = jest.fn();

    // Renderar TicketForm-komponenten med mockSubmit som onSubmit-prop
    render(<TicketForm onSubmit={mockSubmit} />);

    // Hittar titel-input genom dess label och simulerar inmatning
    fireEvent.change(
      screen.getByLabelText(/Title/i),
      { target: { value: 'Ny titel' } }
    );

    // Hittar beskrivnings-textarea genom dess label och simulerar inmatning
    fireEvent.change(
      screen.getByLabelText(/Description/i),
      { target: { value: 'Beskrivning' } }
    );

    // Hittar och klickar på submit-knappen (skapar ticket)
    fireEvent.click(
      screen.getByText(/Create Ticket/i)
    );

    // Verifierar att mockSubmit anropades med:
    // 1. Ett objekt innehållande title, description och status = 'Open'
    // 2. undefined som id (eftersom initial.id ej är satt)
    expect(mockSubmit).toHaveBeenCalledWith(
      { title: 'Ny titel', description: 'Beskrivning', status: 'Open' },
      undefined
    );
  });
});
