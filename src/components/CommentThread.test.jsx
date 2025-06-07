// src/components/CommentThread.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CommentThread from './CommentThread';
import * as api from '../api/tickets';

jest.mock('../api/tickets');

describe('CommentThread', () => {
  beforeEach(() => {
    // Mocka getComments, inte getTickets
    api.getComments
      .mockResolvedValueOnce({ data: [
        { id: 1, ticketId: 1, text: 'Hej', createdAt: '2025-06-03T18:24:36.4517897' }
      ]})
      .mockResolvedValueOnce({ data: [
        { id: 1, ticketId: 1, text: 'Hej', createdAt: '2025-06-03T18:24:36.4517897' },
        { id: 2, ticketId: 1, text: 'Ny', createdAt: '2025-06-07T12:00:00.000Z' }
      ]});
    api.addComment.mockResolvedValue({}); 
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('visar initiala kommentarer', async () => {
    render(<CommentThread ticket={{ id: 1, status: 'Open', comments: [] }} />);
    expect(await screen.findByText('Hej')).toBeInTheDocument();
  });

  it('lägger till kommentar och visar den nya', async () => {
    render(<CommentThread ticket={{ id: 1, status: 'Open', comments: [] }} />);
    // Vänta på första hämtningen
    await screen.findByText('Hej');

    // Lägg till ny kommentar
    fireEvent.change(screen.getByPlaceholderText(/Add a comment/i), {
      target: { value: 'Ny' }
    });
    fireEvent.click(screen.getByText(/Post Comment/i));

    // Säkerställ att API-anropet gjordes
    await waitFor(() => {
      expect(api.addComment).toHaveBeenCalledWith(1, { text: 'Ny' });
    });

    // Kontrollera att den nya kommentaren syns
    expect(await screen.findByText('Ny')).toBeInTheDocument();
  });
});
