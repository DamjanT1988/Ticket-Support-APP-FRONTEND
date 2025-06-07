// src/hooks/useTickets.test.js
import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import { useTickets } from './useTickets';

jest.mock('axios');

describe('useTickets', () => {
  const sample = [{ id:1, title:'T1', description:'D', status:'Open', createdAt:'', updatedAt:'', comments:[] }];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: sample });
  });

  it('hämtar tickets initialt', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTickets());
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.tickets).toEqual(sample);
    expect(axios.get).toHaveBeenCalledWith('/api/Tickets', { params: { status: 'Open' } });
  });

  it('ändrar filter och hämtar igen', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTickets());
    await waitForNextUpdate();
    act(() => {
      result.current.setFilter('Closed');
    });
    await waitForNextUpdate();
    expect(axios.get).toHaveBeenCalledWith('/api/Tickets', { params: { status: 'Closed' } });
  });
});
