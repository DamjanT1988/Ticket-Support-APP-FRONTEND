import { render, screen } from '@testing-library/react';
import App from './App';

test('visar titeln Support Tickets', () => {
  render(<App />);
  expect(screen.getByText(/Support Tickets/i)).toBeInTheDocument();
});