import { describe, it, expect } from 'vitest'
import {
  formatPrice,
  validateEmail,
  truncateText,
  sortByPrice,
  getTotalItems,
  getTotalPrice,
  filterByCategory,
} from '../utils/helpers.js'

// ─────────────────────────────────────────────
// formatPrice
// ─────────────────────────────────────────────
describe('formatPrice', () => {
  it('vrátí správně naformátovanou cenu s výchozí měnou CZK', () => {
    expect(formatPrice(100)).toBe('100.00 CZK')
  })

  it('vrátí cenu s měnou EUR', () => {
    expect(formatPrice(9.99, 'EUR')).toBe('9.99 EUR')
  })

  it('správně formátuje nulu', () => {
    expect(formatPrice(0)).toBe('0.00 CZK')
  })

  it('vrátí null pro NaN', () => {
    expect(formatPrice(NaN)).toBeNull()
  })

  it('vrátí null pro nečíselný vstup', () => {
    expect(formatPrice('sto korun')).toBeNull()
    expect(formatPrice(null)).toBeNull()
    expect(formatPrice(undefined)).toBeNull()
  })

  it('správně formátuje desetinné číslo', () => {
    expect(formatPrice(49.5)).toBe('49.50 CZK')
  })
})

// ─────────────────────────────────────────────
// validateEmail
// ─────────────────────────────────────────────
describe('validateEmail', () => {
  it('vrátí true pro platnou e-mailovou adresu', () => {
    expect(validateEmail('jan.novak@email.cz')).toBe(true)
  })

  it('vrátí true pro gmail adresu', () => {
    expect(validateEmail('kote@gmail.com')).toBe(true)
  })

  it('vrátí false, pokud chybí zavináč', () => {
    expect(validateEmail('studentmnaucafe.cz')).toBe(false)
  })

  it('vrátí false pro prázdný řetězec', () => {
    expect(validateEmail('')).toBe(false)
  })

  it('vrátí false pro nečíselný typ (null, number)', () => {
    expect(validateEmail(null)).toBeFalsy()
    expect(validateEmail(42)).toBeFalsy()
  })

  it('vrátí false pro adresu s mezerou', () => {
    expect(validateEmail('jan novak@email.cz')).toBe(false)
  })

  it('vrátí false pro adresu bez domény', () => {
    expect(validateEmail('jan@')).toBe(false)
  })

  it('vrátí false pro adresu bez TLD', () => {
    expect(validateEmail('jan@email')).toBe(false)
  })
})

// ─────────────────────────────────────────────
// truncateText
// ─────────────────────────────────────────────
describe('truncateText', () => {
  it('zkrátí text delší než limit a přidá "..."', () => {
    expect(truncateText('Cappuccino Mňau', 10)).toBe('Cappuccino...')
  })

  it('vrátí text beze změny, pokud je kratší než limit', () => {
    expect(truncateText('Káva', 50)).toBe('Káva')
  })

  it('vrátí text beze změny, pokud má přesně délku limitu', () => {
    const result = truncateText('Kocour', 6)
    expect(result).toBe('Kocour')
    expect(result).not.toContain('...')
  })

  it('vrátí prázdný řetězec pro neplatný vstup', () => {
    expect(truncateText(null, 5)).toBe('')
    expect(truncateText(undefined, 5)).toBe('')
  })
})

// ─────────────────────────────────────────────
// sortByPrice
// ─────────────────────────────────────────────
describe('sortByPrice', () => {
  const products = [
    { name: 'Cappuccino Mňau', price: 75 },
    { name: 'Slaný muffin',    price: 65 },
    { name: 'Domácí Cheesecake', price: 95 },
  ]

  it('seřadí produkty od nejlevnějšího ve výchozím pořadí (asc)', () => {
    const sorted = sortByPrice(products)
    expect(sorted[0].name).toBe('Slaný muffin')
    expect(sorted[2].name).toBe('Domácí Cheesecake')
  })

  it('seřadí produkty od nejdražšího při order="desc"', () => {
    const sorted = sortByPrice(products, 'desc')
    expect(sorted[0].name).toBe('Domácí Cheesecake')
    expect(sorted[2].name).toBe('Slaný muffin')
  })

  it('nezmění původní pole (immutabilita)', () => {
    const copy = [...products]
    sortByPrice(products, 'desc')
    expect(products).toEqual(copy)
  })

  it('vrátí prázdné pole pro prázdný vstup', () => {
    expect(sortByPrice([])).toEqual([])
  })
})

// ─────────────────────────────────────────────
// getTotalItems
// ─────────────────────────────────────────────
describe('getTotalItems', () => {
  it('spočítá celkový počet položek v košíku', () => {
    const cart = [
      { name: 'Cappuccino', price: 75, qty: 2 },
      { name: 'Muffin',     price: 65, qty: 3 },
    ]
    expect(getTotalItems(cart)).toBe(5)
  })

  it('vrátí 0 pro prázdný košík', () => {
    expect(getTotalItems([])).toBe(0)
  })

  it('vrátí 0 pro neplatný vstup', () => {
    expect(getTotalItems(null)).toBe(0)
    expect(getTotalItems(undefined)).toBe(0)
  })

  it('vrátí správný počet pro jednu položku', () => {
    expect(getTotalItems([{ name: 'Káva', price: 75, qty: 1 }])).toBe(1)
  })
})

// ─────────────────────────────────────────────
// getTotalPrice
// ─────────────────────────────────────────────
describe('getTotalPrice', () => {
  it('spočítá celkovou cenu košíku', () => {
    const cart = [
      { name: 'Cappuccino', price: 75, qty: 2 },
      { name: 'Cheesecake', price: 95, qty: 1 },
    ]
    expect(getTotalPrice(cart)).toBe(245)
  })

  it('vrátí 0 pro prázdný košík', () => {
    expect(getTotalPrice([])).toBe(0)
  })

  it('vrátí 0 pro neplatný vstup', () => {
    expect(getTotalPrice(null)).toBe(0)
    expect(getTotalPrice(undefined)).toBe(0)
  })

  it('správně počítá pro kočky (price: 0)', () => {
    const cart = [{ name: 'Kocour Mourek', price: 0, qty: 1 }]
    expect(getTotalPrice(cart)).toBe(0)
  })
})

// ─────────────────────────────────────────────
// filterByCategory
// ─────────────────────────────────────────────
describe('filterByCategory', () => {
  const products = [
    { name: 'Cappuccino', category: 'nápoje' },
    { name: 'Cheesecake', category: 'jídlo' },
    { name: 'Mourek',     category: 'kočky' },
    { name: 'Horká čokoláda', category: 'nápoje' },
  ]

  it('vrátí všechny produkty pro kategorii "vše"', () => {
    expect(filterByCategory(products, 'vše')).toHaveLength(4)
  })

  it('filtruje pouze nápoje', () => {
    const result = filterByCategory(products, 'nápoje')
    expect(result).toHaveLength(2)
    expect(result[0].name).toBe('Cappuccino')
  })

  it('filtruje pouze kočky', () => {
    const result = filterByCategory(products, 'kočky')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Mourek')
  })

  it('vrátí prázdné pole pro neexistující kategorii', () => {
    expect(filterByCategory(products, 'dezerty')).toHaveLength(0)
  })

  it('vrátí prázdné pole pro neplatný vstup', () => {
    expect(filterByCategory(null, 'nápoje')).toEqual([])
    expect(filterByCategory(undefined, 'nápoje')).toEqual([])
  })
})