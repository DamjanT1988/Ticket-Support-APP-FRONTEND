// src/hooks/useTickets.test.js

// Importerar verktyg för att rendera och interagera med custom hooks
import { renderHook, act, waitFor } from '@testing-library/react';
// Importerar hela API-modulen för att kunna mocka dess metoder
import * as api from '../api/tickets';
// Importerar vår custom hook som ska testas
import { useTickets } from './useTickets';

// Mockar hela API-modulen för att undvika verkliga HTTP-anrop
jest.mock('../api/tickets');

describe('useTickets', () => {
  // Sample-data som API-mock kommer att returnera
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

  // Körs före varje test: ställer in getTickets för att resolved promisen med sample-data
  beforeEach(() => {
    api.getTickets.mockResolvedValue({ data: sample });
  });

  // Körs efter varje test: rensar alla jest-mocks så att de inte påverkar andra tester
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('hämtar tickets initialt', async () => {
    // Renderar hooken och får tillbaka result-objektet
    const { result } = renderHook(() => useTickets());

    // Direkt efter render förväntas loading vara true
    expect(result.current.loading).toBe(true);

    // Väntar tills loading blir false, dvs. fetchAll har avslutats
    await waitFor(() => expect(result.current.loading).toBe(false));

    // När loadingen är klar ska tickets vara lika med vår sample-data
    expect(result.current.tickets).toEqual(sample);

    // Verifierar att API:et anropades med default-filter 'Open'
    expect(api.getTickets).toHaveBeenCalledWith('Open');
  });

  it('ändrar filter och hämtar igen', async () => {
    // Renderar hooken igen för ett separat test
    const { result } = renderHook(() => useTickets());

    // Väntar inledande fetch
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Ändrar filter genom att anropa setFilter inom act för att simulera React-uppdatering
    act(() => result.current.setFilter('Closed'));

    // Väntar in nya fetchAll-körningen efter filterändring
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Verifierar att API:et nu anropas med det nya filtret 'Closed'
    expect(api.getTickets).toHaveBeenCalledWith('Closed');
  });
});
