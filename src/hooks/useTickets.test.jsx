// src/hooks/useTickets.test.js
import { renderHook, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useTickets } from './useTickets';

jest.mock('axios');

describe('useTickets', () => {
  const sample = [
    {
      id: 1,
      title: 'T1',
      description: 'D',
      status: 'Open',
      createdAt: '',
      updatedAt: '',
      comments: []
    }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: sample });
  });

  it('hämtar tickets initialt', async () => {
    const { result } = renderHook(() => useTickets());

    // Ska vara loading först
    expect(result.current.loading).toBe(true);

    // Vänta tills loadingen avslutas
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Kontrollera data och API-anrop
    expect(result.current.tickets).toEqual(sample);
    expect(axios.get).toHaveBeenCalledWith('/api/Tickets', { params: { status: 'Open' } });
  });

  it('ändrar filter och hämtar igen', async () => {
    const { result } = renderHook(() => useTickets());

    // Vänta initial load
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Ändra filter
    act(() => {
      result.current.setFilter('Closed');
    });

    // Vänta andra load
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Kontrollera kall på API med nytt filter
    expect(axios.get).toHaveBeenCalledWith('/api/Tickets', { params: { status: 'Closed' } });
  });
});
