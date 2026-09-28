export const products = [
	{
		id: 'double-cheese',
		name: 'Double Cheese',
		description: 'Dois smashs, cheddar cremoso, molho Revolution e picles.',
		price: 34.9,
		category: 'burgers',
		tag: 'Mais pedido',
		image:
			'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=900&q=85',
		options: [
			{ id: 'bacon', name: 'Bacon crocante', price: 5 },
			{ id: 'extra-cheese', name: 'Extra cheddar', price: 4 },
		],
	},
	{
		id: 'revolution',
		name: 'Revolution',
		description: 'Smash, cheddar, cebola caramelizada e barbecue da casa.',
		price: 32.9,
		category: 'burgers',
		tag: 'Da casa',
		image:
			'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85',
		options: [
			{ id: 'bacon', name: 'Bacon crocante', price: 5 },
			{ id: 'jalapeno', name: 'Jalapeño', price: 3 },
		],
	},
	{
		id: 'chicken-crunch',
		name: 'Chicken Crunch',
		description: 'Frango crocante, coleslaw, queijo e molho secreto.',
		price: 31.9,
		category: 'burgers',
		image:
			'https://images.unsplash.com/photo-1615297928064-24977384d0b8?auto=format&fit=crop&w=900&q=85',
		options: [{ id: 'extra-cheese', name: 'Extra cheddar', price: 4 }],
	},
	{
		id: 'combo-revolution',
		name: 'Combo Revolution',
		description: 'Seu burger favorito, batata da casa e bebida gelada.',
		price: 48.9,
		category: 'combos',
		tag: 'Combo',
		image:
			'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85',
		options: [{ id: 'bacon', name: 'Bacon crocante', price: 5 }],
	},
	{
		id: 'fries-house',
		name: 'Batata da casa',
		description: 'Crocante, dourada e servida com maionese Revolution.',
		price: 18.9,
		category: 'sides',
		image:
			'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85',
		options: [{ id: 'cheese-sauce', name: 'Molho de cheddar', price: 5 }],
	},
	{
		id: 'onion-rings',
		name: 'Onion rings',
		description: 'Anéis de cebola empanados, sequinhos e crocantes.',
		price: 21.9,
		category: 'sides',
		image:
			'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=900&q=85',
		options: [],
	},
	{
		id: 'chopp-pilsen',
		name: 'Chopp Pilsen',
		description: 'Caneca cremosa e estupidamente gelada.',
		price: 12.9,
		category: 'drinks',
		tag: 'Gelado',
		image:
			'https://images.unsplash.com/photo-1575367439058-6096bb9cf5e2?auto=format&fit=crop&w=900&q=85',
		options: [],
	},
	{
		id: 'soda',
		name: 'Soda da casa',
		description: 'Refrescante, cítrica e feita na hora.',
		price: 10.9,
		category: 'drinks',
		image:
			'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85',
		options: [],
	},
]
export const categories = {
	all: 'Todos os itens',
	burgers: 'Burgers',
	combos: 'Combos',
	sides: 'Porções',
	drinks: 'Chopp & bebidas',
}
