import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders superheroes header', () => {
  render(<App />);
  const superheroElement = screen.getByText(/superheroes/i);
  expect(superheroElement).toBeInTheDocument();
});


