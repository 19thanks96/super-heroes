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
import { SuperHeroForm } from '../components/SuperHeroForm'

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
    renderWithRouter(<SuperHeroForm />)
    const superheroElement = screen.getByRole('button', {
        name: /submit/i,
    })
    expect(superheroElement).toBeInTheDocument()
})

test('create "superhero"', async () => {
    const user = userEvent.setup()
    renderWithRouter(<SuperHeroForm />)

    const nicknameInput = screen.getByLabelText('nickname', {
        exact: false,
    }) as HTMLInputElement
    expect(nicknameInput).toBeInTheDocument()
    fireEvent.change(nicknameInput, {
        target: { value: 'superman' },
    })
    expect(nicknameInput.value).toEqual('superman')

    const realNameInput = screen.getByLabelText('realname', {
        exact: false,
    }) as HTMLInputElement
    expect(realNameInput).toBeInTheDocument()
    fireEvent.change(realNameInput, {
        target: { value: 'Clark Kent' },
    })
    expect(realNameInput.value).toEqual('Clark Kent')

    const originDescriptionInput = screen.getByLabelText('origin description', {
        exact: false,
    }) as HTMLInputElement
    expect(originDescriptionInput).toBeInTheDocument()
    fireEvent.change(originDescriptionInput, {
        target: { value: 'he was born Kal-El on the planet Krypton' },
    })
    expect(originDescriptionInput.value).toEqual(
        'he was born Kal-El on the planet Krypton'
    )

    const catchPhraseInput = screen.getByLabelText('catch phrase', {
        exact: false,
    }) as HTMLInputElement
    expect(catchPhraseInput).toBeInTheDocument()
    fireEvent.change(catchPhraseInput, {
        target: {
            value: "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
        },
    })
    expect(catchPhraseInput.value).toEqual(
        "Look, up in the sky, it's a bird, it's a plane, it's Superman!"
    )

    const superheroSubmitButton = screen.getByRole('button', {
        name: /submit/i,
    })
    expect(superheroSubmitButton).toBeInTheDocument()
    await user.click(superheroSubmitButton)
    expect(window.location.pathname).toEqual('/')
})
