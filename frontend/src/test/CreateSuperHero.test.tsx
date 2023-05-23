import React from 'react'
import {
    render,
    screen,
    fireEvent,
    getByLabelText,
} from '@testing-library/react'
import { SuperheroList } from '../components/SuperheroList'
import { MemoryRouter, Router, Route, BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { CreateSuperHero } from '../components/CreateSuperHero'

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

test('renders  "submit" button', () => {
    renderWithRouter(<CreateSuperHero />)
    const superheroElement = screen.getByRole('button', {
        name: /submit/i,
    })
    expect(superheroElement).toBeInTheDocument()
})

test('create "superhero "', () => {
    const user = userEvent.setup()
    renderWithRouter(<CreateSuperHero />)
    const nicknameInput = screen.getByLabelText('nickname', { exact: false })
    fireEvent.change(nicknameInput, {
        target: { value: 'dickman' },
    })
    const superheroElement = screen.getByRole('button', {
        name: /submit/i,
    })
    expect(nicknameInput).toBeInTheDocument()
    expect(superheroElement).toBeInTheDocument()
})
