// src/components/CommentThread.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CommentThread from './CommentThread';

jest.mock('axios');

const ticket = { id:1, status:'Open', comments:[{id:1,text:'Hej',createdAt:''}] };

describe('CommentThread', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [ ticket ] });
    axios.post.mockResolvedValue({});
  });

  it('visar initiala kommentarer', async () => {
    render(<CommentThread ticket={ticket} />);
    await waitFor(() => expect(screen.getByText('Hej')).toBeInTheDocument());
  });

  it('lägger till kommenterar och hämtar om', async () => {
    render(<CommentThread ticket={ticket} />);
    await waitFor(() => screen.getByText('Hej'));
    fireEvent.change(screen.getByPlaceholderText(/Add a comment/i), { target:{ value:'Ny' } });
    fireEvent.click(screen.getByText(/Post Comment/i));
    await waitFor(() => expect(axios.post).toHaveBeenCalledWith('/api/Tickets/1/comments', { text:'Ny' }));
    // sedan hämtas om och visas...
  });
});
