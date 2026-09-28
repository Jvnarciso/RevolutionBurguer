import { getCart, cartCount } from './cart.js'
const updateHeader = () =>
	document
		.querySelectorAll('[data-cart-count]')
		.forEach((el) => (el.textContent = cartCount(getCart())))
const header = document.querySelector('[data-header]')
window.addEventListener(
	'scroll',
	() => header?.classList.toggle('is-scrolled', window.scrollY > 40),
	{ passive: true },
)
updateHeader()
window.addEventListener('storage', updateHeader)
