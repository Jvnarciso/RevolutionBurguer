const STORAGE_KEY = 'revolution-cart-v1'
export const getCart = () => {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
	} catch {
		return []
	}
}
export const saveCart = (cart) =>
	localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
export const cartCount = (cart) =>
	cart.reduce((sum, item) => sum + item.quantity, 0)
export const itemUnitPrice = (item) =>
	item.unitPrice + (item.options || []).reduce((sum, opt) => sum + opt.price, 0)
export const itemSubtotal = (item) => itemUnitPrice(item) * item.quantity
export const cartTotal = (cart) =>
	cart.reduce((sum, item) => sum + itemSubtotal(item), 0)
export const formatCurrency = (value) =>
	new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
		value,
	)
export const addToCart = (
	cart,
	product,
	options = [],
	note = '',
	quantity = 1,
) => {
	const optionKey = options
		.map((opt) => opt.id)
		.sort()
		.join('|')
	const existing = cart.find(
		(item) =>
			item.productId === product.id &&
			item.optionKey === optionKey &&
			item.note === note,
	)
	if (existing) existing.quantity += quantity
	else
		cart.push({
			productId: product.id,
			name: product.name,
			image: product.image,
			unitPrice: product.price,
			options,
			optionKey,
			note,
			quantity,
		})
	saveCart(cart)
	return cart
}
export const updateCartItem = (cart, index, delta) => {
	if (!cart[index]) return cart
	cart[index].quantity += delta
	if (cart[index].quantity <= 0) cart.splice(index, 1)
	saveCart(cart)
	return cart
}
export const removeCartItem = (cart, index) => {
	cart.splice(index, 1)
	saveCart(cart)
	return cart
}
export const clearCart = () => {
	localStorage.removeItem(STORAGE_KEY)
}
