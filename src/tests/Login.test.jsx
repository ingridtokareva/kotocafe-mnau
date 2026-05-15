import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Login from '../pages/Login'

// Mock CartContext
vi.mock('../components/CartContext', () => ({
  useCart: () => ({
    setUser: vi.fn(),
  }),
}))

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

const renderLogin = () =>
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  )

describe('Login – zobrazení', () => {
  it('zobrazí nadpis "Vítejte zpět" při přihlášení', () => {
    renderLogin()
    expect(screen.getByText('Vítejte zpět')).toBeInTheDocument()
  })

  it('zobrazí pole pro e-mail a heslo', () => {
    renderLogin()
    expect(screen.getByLabelText(/e-mailová adresa/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/heslo/i)).toBeInTheDocument()
  })

  it('zobrazí tlačítko "Přihlásit se"', () => {
    renderLogin()
    expect(screen.getByRole('button', { name: /přihlásit se/i })).toBeInTheDocument()
  })

  it('přepne do režimu registrace po kliknutí na odkaz', async () => {
    renderLogin()
    await userEvent.click(screen.getByText(/zaregistrujte se/i))
    expect(screen.getByText('Nová registrace')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /vytvořit účet/i })).toBeInTheDocument()
  })
})

describe('Login – validace', () => {
  it('zobrazí chybu pro neplatný e-mail', async () => {
    renderLogin()
    await userEvent.type(screen.getByLabelText(/e-mailová adresa/i), 'nenimail')
    await userEvent.type(screen.getByLabelText(/heslo/i), 'heslo123')
    await userEvent.click(screen.getByRole('button', { name: /přihlásit se/i }))
    expect(await screen.findByText(/platnou e-mailovou adresu/i)).toBeInTheDocument()
  })

  it('zobrazí chybu pro příliš krátké heslo', async () => {
    renderLogin()
    await userEvent.type(screen.getByLabelText(/e-mailová adresa/i), 'jan@email.cz')
    await userEvent.type(screen.getByLabelText(/heslo/i), '123')
    await userEvent.click(screen.getByRole('button', { name: /přihlásit se/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent(/alespoň 6 znaků/i)
  })

  it('zobrazí chybu pro nesprávné přihlašovací údaje', async () => {
    localStorage.setItem('mnau_cafe_users_db', JSON.stringify([
      { email: 'jan@email.cz', password: 'spravne123' }
    ]))
    renderLogin()
    await userEvent.type(screen.getByLabelText(/e-mailová adresa/i), 'jan@email.cz')
    await userEvent.type(screen.getByLabelText(/heslo/i), 'spatneheslo')
    await userEvent.click(screen.getByRole('button', { name: /přihlásit se/i }))
    expect(await screen.findByText(/neplatný e-mail nebo heslo/i)).toBeInTheDocument()
  })
})