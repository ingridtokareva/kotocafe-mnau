import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Cart from '../pages/Cart'

const mockRemoveFromCart = vi.fn()

// Mock CartContext s různými stavy košíku
const mockUseCart = vi.fn()
vi.mock('../components/CartContext', () => ({
  useCart: () => mockUseCart(),
}))

const renderCart = () =>
  render(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>
  )

describe('Cart – prázdný košík', () => {
  it('zobrazí zprávu o prázdném košíku', () => {
    mockUseCart.mockReturnValue({ cart: [], totalPrice: 0, removeFromCart: vi.fn(), user: null })
    renderCart()
    expect(screen.getByText(/košík je zatím prázdný/i)).toBeInTheDocument()
  })
})

describe('Cart – košík s položkami', () => {
  const cart = [
    { id: 1, name: 'Cappuccino Mňau', price: 75, qty: 2 },
    { id: 2, name: 'Domácí Cheesecake', price: 95, qty: 1 },
  ]

  beforeEach(() => {
    mockUseCart.mockReturnValue({
      cart,
      totalPrice: 245,
      removeFromCart: mockRemoveFromCart,
      user: { email: 'jan@email.cz' },
    })
  })

  it('zobrazí název každé položky', () => {
    renderCart()
    expect(screen.getByText('Cappuccino Mňau')).toBeInTheDocument()
    expect(screen.getByText('Domácí Cheesecake')).toBeInTheDocument()
  })

  it('zobrazí celkovou cenu', () => {
    renderCart()
    expect(screen.getByText(/245 Kč/i)).toBeInTheDocument()
  })

  it('zobrazí tlačítko pro odebrání položky', () => {
    renderCart()
    const buttons = screen.getAllByText(/odstranit/i)
    expect(buttons).toHaveLength(2)
  })

  it('zavolá removeFromCart při kliknutí na Odstranit', async () => {
    renderCart()
    const buttons = screen.getAllByText(/odstranit/i)
    await userEvent.click(buttons[0])
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1)
  })

  it('zobrazí tlačítko pro platbu přihlášenému uživateli', () => {
    renderCart()
    expect(screen.getByText(/zaplatit objednávku/i)).toBeInTheDocument()
  })
})

describe('Cart – nepřihlášený uživatel', () => {
  it('zobrazí upozornění pro nepřihlášeného uživatele', () => {
    mockUseCart.mockReturnValue({
      cart: [{ id: 1, name: 'Káva', price: 75, qty: 1 }],
      totalPrice: 75,
      removeFromCart: vi.fn(),
      user: null,
    })
    renderCart()
    expect(screen.getByText(/přihlásit/i)).toBeInTheDocument()
  })
})