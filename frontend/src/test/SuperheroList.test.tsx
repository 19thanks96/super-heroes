import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SuperheroList } from '../components/SuperheroList';


test('renders  "you have no heroes created yet" when no heroes pass', () => {
    render(<SuperheroList superheroes={[]} /> );
    const superheroElement = screen.getByText(/you have no heroes created yet/i);
    expect(superheroElement).toBeInTheDocument();
  });

test('renders `add new hero` button when no heroes pass', async () => {
  render(<SuperheroList superheroes={[]} /> );
  const superheroElement = screen.getByRole('button', {
    name: /add new hero/i
  })
  fireEvent.click(superheroElement)
  await screen.findByText(/create your hero/i)
  expect(superheroElement).toBeInTheDocument();
});