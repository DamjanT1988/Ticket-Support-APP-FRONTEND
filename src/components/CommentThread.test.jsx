// src/components/CommentThread.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as api from '../api/tickets';
import CommentThread from './CommentThread';

jest.mock('../api/tickets');  // Mocka hela api-modulen

beforeEach(() => {
  // Initiala kommentarer för ticket 1
  api.getTickets.mockResolvedValue([
    {
      id: 1,
      title: 'Test',
      description: 'Desc',
      status: 'Open',
      createdAt: '2025-06-03T17:42:35.927062',
      updatedAt: '2025-06-03T17:42:35.927062',
      comments: [
        { id: 1, ticketId: 1, text: 'Hej', createdAt: '2025-06-03T18:24:36.4517897' }
      ]
    }
  ]);
  // Mocka addComment så det alltid lyckas
  api.addComment.mockResolvedValue({});
});

afterEach(() => {
  jest.clearAllMocks();
});

test('visar initiala kommentarer', async () => {
  render(<CommentThread ticket={{ id:1, status:'Open', comments:[] }} />);
  // Vänta på att 'Hej' dyker upp
  expect(await screen.findByText('Hej')).toBeInTheDocument();
});

test('lägger till kommentar', async () => {
  render(<CommentThread ticket={{ id:1, status:'Open', comments:[] }} />);

  // Skriv ny kommentar
  fireEvent.change(screen.getByPlaceholderText(/Add a comment/i), {
    target: { value: 'Ny' }
  });
  fireEvent.click(screen.getByText(/Post Comment/i));

  // Först måste addComment-anropet ha skett
  await waitFor(() => {
    expect(api.addComment).toHaveBeenCalledWith(1, { text: 'Ny' });
  });

  // Sedan omhämtas comments och 'Hej' + eventuell ny kommentar kan testas
  await waitFor(() => {
    expect(api.getTickets).toHaveBeenCalledTimes(2);
  });
});
