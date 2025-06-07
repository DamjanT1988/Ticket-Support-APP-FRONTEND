// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('visar huvudrubriken', () => {
    render(<App />);
    expect(screen.getByText(/Support Tickets/i)).toBeInTheDocument();
  });
});
