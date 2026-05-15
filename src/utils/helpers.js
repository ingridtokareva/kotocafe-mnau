/**
 * Formátuje cenu na řetězec s měnou.
 * @param {number} price
 * @param {string} currency
 * @returns {string|null}
 */
export function formatPrice(price, currency = 'CZK') {
  if (price === null || price === undefined || typeof price === 'string' || isNaN(price)) return null
  return `${price.toFixed(2)} ${currency}`
}

/**
 * Validuje e-mailovou adresu.
 * @param {*} email
 * @returns {boolean}
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

/**
 * Zkrátí text na zadaný počet znaků a přidá "...".
 * @param {string} text
 * @param {number} limit
 * @returns {string}
 */
export function truncateText(text, limit) {
  if (!text || typeof text !== 'string') return ''
  if (text.length <= limit) return text
  return text.slice(0, limit) + '...'
}

/**
 * Seřadí produkty podle ceny (nemodifikuje původní pole).
 * @param {Array} products
 * @param {'asc'|'desc'} order
 * @returns {Array}
 */
export function sortByPrice(products, order = 'asc') {
  return [...products].sort((a, b) =>
    order === 'desc' ? b.price - a.price : a.price - b.price
  )
}

/**
 * Spočítá celkový počet položek v košíku.
 * @param {Array} cart - pole { qty, ... }
 * @returns {number}
 */
export function getTotalItems(cart) {
  if (!Array.isArray(cart)) return 0
  return cart.reduce((sum, item) => sum + (item.qty || 0), 0)
}

/**
 * Spočítá celkovou cenu košíku.
 * @param {Array} cart - pole { price, qty, ... }
 * @returns {number}
 */
export function getTotalPrice(cart) {
  if (!Array.isArray(cart)) return 0
  return cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0)
}

/**
 * Filtruje produkty podle kategorie.
 * @param {Array} products
 * @param {string} category
 * @returns {Array}
 */
export function filterByCategory(products, category) {
  if (!Array.isArray(products)) return []
  if (category === 'vše') return products
  return products.filter(p => p.category === category)
}