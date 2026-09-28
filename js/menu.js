import { products, categories } from './products.js'
import {
	getCart,
	addToCart,
	cartCount,
	cartTotal,
	formatCurrency,
	itemSubtotal,
	itemUnitPrice,
	updateCartItem,
	removeCartItem,
	clearCart,
} from './cart.js'
import { getWhatsAppUrl } from './whatsapp.js'
const $ = (s) => document.querySelector(s),
	$$ = (s) => [...document.querySelectorAll(s)]
let cart = getCart(),
	activeCategory = 'all',
	activeProduct = null,
	modalQuantity = 1
const toast = (message) => {
	const el = $('[data-toast]')
	el.textContent = message
	el.classList.add('is-visible')
	setTimeout(() => el.classList.remove('is-visible'), 2200)
}
const refreshCounts = () => {
	$$('[data-cart-count]').forEach((el) => (el.textContent = cartCount(cart)))
	$$('[data-cart-total]').forEach(
		(el) => (el.textContent = formatCurrency(cartTotal(cart))),
	)
}
const renderProducts = () => {
	const query = $('[data-search]').value.toLowerCase().trim()
	const list = products.filter(
		(p) =>
			(activeCategory === 'all' || p.category === activeCategory) &&
			(!query ||
				`${p.name} ${p.description} ${p.category}`
					.toLowerCase()
					.includes(query)),
	)
	$('[data-results-label]').textContent =
		`${categories[activeCategory]} · ${list.length} itens`
	$('[data-product-grid]').innerHTML = list.length
		? list
				.map(
					(p) =>
						`<article class="product-card" data-product-id="${p.id}"><div class="product-card-image"><img src="${p.image}" alt="${p.name}" loading="lazy" />${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}</div><div class="product-card-content"><h3>${p.name}</h3><p class="product-description">${p.description}</p><div class="product-card-bottom"><strong class="product-price">${formatCurrency(p.price)}</strong><button class="add-button" data-quick-add="${p.id}">+ Adicionar</button></div></div></article>`,
				)
				.join('')
		: `<div class="empty-cart"><strong>Nada por aqui.</strong><p>Tente outra busca ou categoria.</p></div>`
}
const openModal = (product) => {
	activeProduct = product
	modalQuantity = 1
	$('[data-modal-image]').src = product.image
	$('[data-modal-image]').alt = product.name
	$('[data-modal-title]').textContent = product.name
	$('[data-modal-description]').textContent = product.description
	$('[data-modal-category]').textContent = categories[product.category]
	$('[data-modal-quantity]').textContent = modalQuantity
	$('[data-modal-note]').value = ''
	$('[data-modal-options]').innerHTML = product.options.length
		? `<p class="eyebrow">Adicionais</p>` +
			product.options
				.map(
					(o) =>
						`<label class="option-label"><span><input type="checkbox" value="${o.id}" data-option /> ${o.name}</span><span>+ ${formatCurrency(o.price)}</span></label>`,
				)
				.join('')
		: '<p class="eyebrow">Este item não possui adicionais.</p>'
	$('[data-modal-price]').textContent = formatCurrency(product.price)
	$('[data-modal-backdrop]').hidden = false
	$('[data-product-modal]').classList.add('is-open')
	$('[data-product-modal]').setAttribute('aria-hidden', 'false')
}
const closeModal = () => {
	$('[data-product-modal]').classList.remove('is-open')
	$('[data-product-modal]').setAttribute('aria-hidden', 'true')
	setTimeout(() => {
		$('[data-modal-backdrop]').hidden = true
	}, 350)
}
const renderCart = () => {
	const target = $('[data-cart-items]')
	if (!cart.length) {
		target.innerHTML =
			'<div class="empty-cart"><strong>Sua sacola<br />está vazia.</strong><p>Que tal começar com um burger?</p><a class="button button-red" href="#" data-empty-menu>Ver cardápio <span>↗</span></a></div>'
		return
	}
	target.innerHTML = cart
		.map(
			(item, i) =>
				`<div class="cart-item"><img src="${item.image}" alt="" /><div><h3>${item.name}</h3><p>${(item.options || []).map((o) => `+ ${o.name}`).join('<br>') || 'Sem adicionais'}${item.note ? `<br>Obs.: ${item.note}` : ''}</p><div class="cart-item-controls"><button data-cart-minus="${i}" aria-label="Diminuir">−</button><b>${item.quantity}</b><button data-cart-plus="${i}" aria-label="Aumentar">+</button><button class="remove-item" data-cart-remove="${i}">Remover</button></div></div><strong class="cart-item-price">${formatCurrency(itemSubtotal(item))}</strong></div>`,
		)
		.join('')
}
const openCart = () => {
	$('[data-cart-drawer]').classList.add('is-open')
	$('[data-cart-drawer]').setAttribute('aria-hidden', 'false')
	renderCart()
	$('[data-modal-backdrop]').hidden = false
}
const closeCart = () => {
	$('[data-cart-drawer]').classList.remove('is-open')
	$('[data-cart-drawer]').setAttribute('aria-hidden', 'true')
	setTimeout(() => {
		$('[data-modal-backdrop]').hidden = true
	}, 350)
}
const addActive = () => {
	const options = activeProduct.options.filter((o) =>
		$$('[data-option]:checked').some((input) => input.value === o.id),
	)
	cart = addToCart(
		cart,
		activeProduct,
		options,
		$('[data-modal-note]').value.trim(),
		modalQuantity,
	)
	closeModal()
	refreshCounts()
	toast(`${activeProduct.name} adicionado à sacola`)
}
const checkout = () => {
	if (!cart.length) {
		toast('Sua sacola está vazia')
		return
	}
	closeCart()
	$('[data-checkout-summary]').innerHTML =
		cart
			.map(
				(item) =>
					`<div class="summary-line"><span>${item.quantity}x ${item.name}</span><strong>${formatCurrency(itemSubtotal(item))}</strong></div>`,
			)
			.join('') +
		`<div class="summary-line"><strong>Total</strong><strong>${formatCurrency(cartTotal(cart))}</strong></div>`
	$('[data-checkout]').hidden = false
}
$$('[data-category]').forEach((btn) =>
	btn.addEventListener('click', () => {
		$$('[data-category]').forEach((b) => b.classList.remove('is-active'))
		btn.classList.add('is-active')
		activeCategory = btn.dataset.category
		renderProducts()
	}),
)
$('[data-search]').addEventListener('input', renderProducts)
$('[data-product-grid]').addEventListener('click', (e) => {
	const quick = e.target.closest('[data-quick-add]')
	const card = e.target.closest('[data-product-id]')
	if (quick) {
		e.stopPropagation()
		const p = products.find((x) => x.id === quick.dataset.quickAdd)
		cart = addToCart(cart, p)
		refreshCounts()
		toast(`${p.name} adicionado à sacola`)
	} else if (card)
		openModal(products.find((p) => p.id === card.dataset.productId))
})
$('[data-modal-plus]').addEventListener('click', () => {
	$('[data-modal-quantity]').textContent = ++modalQuantity
})
$('[data-modal-minus]').addEventListener('click', () => {
	$('[data-modal-quantity]').textContent = modalQuantity = Math.max(
		1,
		modalQuantity - 1,
	)
})
$('[data-add-modal]').addEventListener('click', addActive)
$('[data-close-modal]').addEventListener('click', closeModal)
$('[data-modal-backdrop]').addEventListener('click', () => {
	closeModal()
	closeCart()
})
$$('[data-open-cart]').forEach((b) => b.addEventListener('click', openCart))
$('[data-close-cart]').addEventListener('click', closeCart)
$('[data-cart-items]').addEventListener('click', (e) => {
	const i = Number(
		e.target.dataset.cartPlus ??
			e.target.dataset.cartMinus ??
			e.target.dataset.cartRemove,
	)
	if (Number.isNaN(i)) return
	if (e.target.dataset.cartPlus !== undefined) cart = updateCartItem(cart, i, 1)
	if (e.target.dataset.cartMinus !== undefined)
		cart = updateCartItem(cart, i, -1)
	if (e.target.dataset.cartRemove !== undefined) cart = removeCartItem(cart, i)
	refreshCounts()
	renderCart()
})
$('[data-open-checkout]').addEventListener('click', checkout)
$('[data-close-checkout]').addEventListener('click', () => {
	$('[data-checkout]').hidden = true
})
$('[data-send-whatsapp]').addEventListener('click', () => {
	const url = getWhatsAppUrl(cart, {
		name: $('[data-customer-name]').value.trim(),
		note: $('[data-customer-note]').value.trim(),
	})
	window.open(url, '_blank', 'noopener,noreferrer')
	clearCart()
	cart = []
	refreshCounts()
	$('[data-checkout]').hidden = true
	toast('Pedido preparado para o WhatsApp')
})
renderProducts()
refreshCounts()
