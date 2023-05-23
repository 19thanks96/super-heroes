import React from 'react';
import { render, screen } from '@testing-library/react';
import { SuperheroList } from '../components/SuperheroList';

test('renders  "you have no heroes created yet" when no heroes pass', () => {
    render(<SuperheroList superheroes={[]} /> );
    const superheroElement = screen.getByText(/you have no heroes created yet/i);
    expect(superheroElement).toBeInTheDocument();
  });