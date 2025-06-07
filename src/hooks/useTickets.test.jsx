// src/hooks/useTickets.test.js
import { renderHook, act, waitFor } from '@testing-library/react';
import * as api from '../api/tickets';
import { useTickets } from './useTickets';

jest.mock('../api/tickets');

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
    api.getTickets.mockResolvedValue({ data: sample });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('hämtar tickets initialt', async () => {
    const { result } = renderHook(() => useTickets());
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.tickets).toEqual(sample);
    expect(api.getTickets).toHaveBeenCalledWith('Open');
  });

  it('ändrar filter och hämtar igen', async () => {
    const { result } = renderHook(() => useTickets());
    await waitFor(() => expect(result.current.loading).toBe(false));
    act(() => result.current.setFilter('Closed'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(api.getTickets).toHaveBeenCalledWith('Closed');
  });
});
