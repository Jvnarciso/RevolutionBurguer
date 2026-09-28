import { cartTotal, formatCurrency, itemSubtotal } from './cart.js'
export const buildWhatsAppMessage = (cart, customerData = {}) => {
	const lines = [
		'Olá! Gostaria de fazer um pedido na Revolution Burguer 🍔',
		'',
		'*MEU PEDIDO*',
		'',
	]
	cart.forEach((item) => {
		lines.push(
			`${item.quantity}x ${item.name} — ${formatCurrency(itemSubtotal(item))}`,
		)
		;(item.options || []).forEach((option) =>
			lines.push(`   + ${option.name} — ${formatCurrency(option.price)}`),
		)
		if (item.note) lines.push(`   Obs.: ${item.note}`)
	})
	lines.push('', `*TOTAL: ${formatCurrency(cartTotal(cart))}*`)
	if (customerData.name || customerData.note) {
		lines.push('', '*CLIENTE*')
		if (customerData.name) lines.push(`Nome: ${customerData.name}`)
		if (customerData.note) lines.push('', '*OBSERVAÇÃO*', customerData.note)
	}
	return lines.join('\n')
}
export const getWhatsAppUrl = (cart, customerData) =>
	`https://wa.me/5511983075176?text=${encodeURIComponent(buildWhatsAppMessage(cart, customerData))}`
