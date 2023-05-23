import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SuperheroList } from '../components/SuperheroList'
import { MemoryRouter, Router, Route, BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

const renderWithRouter = (
    ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    { route = '/' } = {}
) => {
    window.history.pushState({}, 'Test page', route)

    return {
        user: userEvent.setup(),
        ...render(ui, { wrapper: BrowserRouter }),
    }
}

test('renders  "you have no heroes created yet" when no heroes pass', () => {
    render(<SuperheroList superheroes={[]} />, { wrapper: BrowserRouter })
    const superheroElement = screen.getByText(/you have no heroes created yet/i)
    expect(superheroElement).toBeInTheDocument()
})

test('renders  "add new hero" button', () => {
  render(<SuperheroList superheroes={[]} />, { wrapper: BrowserRouter })
  const superheroElement = screen.getByRole('link', {
    name: /add new hero/i,
})
  expect(superheroElement).toBeInTheDocument()
})

test('renders `add new hero` button when no heroes pass', async () => {
    const user = userEvent.setup()
    renderWithRouter(<SuperheroList superheroes={[]} />)
    const superheroElement = screen.getByRole('link', {
        name: /add new hero/i,
    })
    await user.click(superheroElement)
    expect(window.location.pathname).toEqual('/createhero')
})

