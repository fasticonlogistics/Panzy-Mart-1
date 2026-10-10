(function () {
	'use strict';

	var PURPLE = '#411e58';
	var CART_KEY = 'panzy_demo_cart_v3';
	var WHATSAPP_BUSINESS_NUMBER = '';
	var photo = function (name) {
		if (/^https?:\/\//i.test(name)) {
			return name;
		}
		return '/panzy-preview-assets/' + name;
	};
	var openverseImages = window.PANZY_OPENVERSE_IMAGES || { categories: {}, subcategories: {}, products: {} };
	var productImage = function (product) {
		var credit = openverseImages.products[product.id];
		return photo(credit ? credit.url : product.image);
	};
	var imageCredit = function (credit, className) {
		if (!credit) {
			return '';
		}
		var attribution = 'Photo: "' + credit.title + '" by ' + (credit.creator || 'unknown creator') + ' (' + credit.license.toUpperCase() + ')';
		return '<span class="' + className + '"><span>' + html(attribution) + '</span><a href="' + html(credit.sourceUrl) + '" target="_blank" rel="noopener noreferrer">Source</a><a href="' + html(credit.licenseUrl) + '" target="_blank" rel="noopener noreferrer">License</a></span>';
	};
	var products = [
		{
			id: 'pram-candle-gift',
			name: 'Pram Candle Gift Box',
			category: 'Gifts & Keepsakes',
			price: 480,
			priceSource: 'Reference listing price · not PANZY retail',
			image: 'pram-candle.svg',
			gallery: ['pram-candle.svg', 'bedroom.jpg', 'decor-detail.jpg', 'shelf-detail.jpg'],
			tag: 'BABY-SHOWER GIFT',
			description: 'A pink, pram-shaped novelty wax candle presented in a clear gift box with a ribbon. The reference listing identifies it as a Club Green keepsake candle; confirm the exact item and condition before offering it as PANZY stock.',
			material: 'Wax candle in a clear presentation box with ribbon, according to the reference listing.',
			dimensions: 'The listing describes it as gift-sized (approximately 2.5); confirm the unit and exact dimensions.',
			color: 'Pink',
			rooms: ['Gifts & Keepsakes', 'Wall & Table Decor']
		},
		{
			id: 'crystal-tealight-holder',
			name: 'Rose-Gold Crystal Tealight Holder',
			category: 'Lighting',
			price: 480,
			priceSource: 'Reference listing price per holder · not PANZY retail',
			image: 'crystal-tealight.svg',
			gallery: ['crystal-tealight.svg', 'decor-vase.jpg', 'decor-detail.jpg', 'living-room.jpg'],
			tag: 'CANDLELIGHT & TABLETOP',
			description: 'A four-inch tabletop tealight holder described in the reference listing with rose-gold-tone metal and faceted crystal-style details. Its listed price is per piece; verify the quantity and set contents before making a PANZY offer.',
			material: 'Rose-gold-tone metal with crystal-style embellishments, as described in the reference listing.',
			dimensions: 'Approximately 4 inches high per holder.',
			color: 'Rose gold and clear',
			rooms: ['Lighting', 'Dining & Kitchen']
		},
		{
			id: 'music-photo-frame',
			name: 'Music-Lover Photo Frame',
			category: 'Wall & Table Decor',
			price: 1608,
			priceSource: 'Reference listing price · not PANZY retail',
			image: 'music-photo-frame.svg',
			gallery: ['music-photo-frame.svg', 'shelf-detail.jpg', 'living-accent.jpg', 'modern-home.jpg'],
			tag: 'A PERSONAL LITTLE DISPLAY',
			description: 'A decorative tabletop frame with raised music-themed detailing. The reference listing gives a 3.5 × 5 inch photo opening and an overall height of about 7 inches; it does not confirm the frame material.',
			material: 'Not confirmed by the reference listing.',
			dimensions: 'Photo opening: 3.5 × 5 inches (9 × 13 cm); overall height approximately 7 inches (18 cm).',
			color: 'Warm bronze, brown and blush tones',
			rooms: ['Wall & Table Decor', 'Gifts & Keepsakes']
		},
		{
			id: 'apollo-food-warmer',
			name: 'Apollo Chrome Dual-Tealight Food Warmer',
			category: 'Dining & Kitchen',
			price: 2345,
			priceSource: 'Reference listing price · not PANZY retail',
			image: 'apollo-warmer.svg',
			gallery: ['apollo-warmer.svg', 'office-desk.jpg', 'living-room.jpg', 'decor-detail.jpg'],
			tag: 'TABLE SERVICE',
			description: 'A 30 cm chrome-finished tabletop warmer with an open wire rack and two integrated tealight holders. The reference listing says it includes one warmer and its original box; verify condition and included items before offering it as PANZY stock.',
			material: 'Chrome-finished metal, according to the reference listing.',
			dimensions: 'Approximately 30 cm long.',
			color: 'Chrome',
			rooms: ['Dining & Kitchen']
		},
		{
			id: 'resin-bird-wall-set',
			name: 'Six-Piece Resin Bird Wall Decor',
			category: 'Wall & Table Decor',
			price: 5700,
			priceSource: 'Reference listing price · not PANZY retail',
			image: 'resin-birds.svg',
			gallery: ['resin-birds.svg', 'living-accent.jpg', 'shelf-detail.jpg', 'modern-home.jpg'],
			tag: 'A FLIGHT OF SIX',
			description: 'A set of six three-dimensional resin bird ornaments for a wall display. The Almas Dekor listing describes three colour options; the pictured vector is an original preview illustration, not the seller’s product photo.',
			material: 'Resin, as stated in the reference listing.',
			dimensions: 'Not specified in the reference details reviewed.',
			color: 'Three listing options; confirm the selected colour.',
			rooms: ['Wall & Table Decor', 'Living Room']
		},
		{
			id: 'chess-sculpture-set',
			name: 'King, Queen & Knight Chess Sculptures',
			category: 'Sculptures & Figurines',
			price: 5700,
			priceSource: 'Reference listing price · not PANZY retail',
			image: 'chess-sculptures.svg',
			gallery: ['chess-sculptures.svg', 'modern-home.jpg', 'shelf-detail.jpg', 'living-room.jpg'],
			tag: 'STRATEGY IN SCULPTURE',
			description: 'A three-piece decorative set of chess-inspired King, Queen and Knight figures, based on the Almas Dekor listing. Confirm the exact finish, dimensions and material for the specific option before offering it as PANZY stock.',
			material: 'Not confirmed in the reference details reviewed.',
			dimensions: 'Not specified in the reference details reviewed.',
			color: 'Confirm the selected listing option.',
			rooms: ['Sculptures & Figurines', 'Living Room']
		}
	];

	var categories = [
		{ name: 'Crockery', detail: 'Tableware, drinkware and serving essentials.', image: 'decor-vase.jpg', subcategories: ['Dinner Sets', 'Plates & Bowls', 'Cups & Mugs', 'Tea & Coffee Sets', 'Glassware', 'Serving Trays & Platters', 'Cutlery & Spoons', 'Kitchen Storage Containers', 'Jugs & Water Bottles', 'Decorative Crockery'] },
		{ name: 'Home Decor', detail: 'Finishing touches, soft layers and statement pieces.', image: 'hero-living.jpg', subcategories: ['Wall Art & Paintings', 'Wall Clocks', 'Decorative Vases', 'Artificial Flowers & Plants', 'Lamps & Lighting', 'Photo Frames', 'Showpieces & Figurines', 'Mirrors', 'Candles & Holders', 'Cushions & Throws', 'Rugs & Carpets', 'Table Decor'] },
		{ name: 'Stationery', detail: 'Writing, planning, school and desk supplies.', image: 'office-desk.jpg', subcategories: ['Notebooks & Diaries', 'Pens & Pencils', 'Markers & Highlighters', 'Art & Drawing Supplies', 'School Supplies', 'Office Supplies', 'Files & Folders', 'Sticky Notes', 'Planners & Calendars', 'Paper Products', 'Desk Organizers', 'Gift Stationery Sets'] },
		{ name: 'Toys', detail: 'Playtime picks, games and creative activities.', image: 'living-accent.jpg', subcategories: ['Educational Toys', 'Building Blocks', 'Dolls & Dollhouses', 'Toy Cars & Vehicles', 'Remote-Control Toys', 'Board Games', 'Puzzles', 'Soft Toys & Teddy Bears', 'Outdoor Toys', 'Musical Toys', 'Action Figures', 'Electronic Toys'] },
		{ name: 'Household Items', detail: 'Practical everyday helpers for around the home.', image: 'home-interior.jpg', subcategories: ['Cleaning Supplies', 'Laundry Accessories', 'Bathroom Accessories', 'Storage & Organization', 'Hangers & Hooks', 'Dustbins', 'Home Utility Tools', 'Kitchen Accessories', 'Household Organizers', 'Ironing Accessories', 'Pest Control Accessories', 'Home Repair Essentials'] },
		{ name: 'Electronics', detail: 'Everyday devices, cables and desk technology.', image: 'office-chair.jpg', subcategories: ['Headphones & Earphones', 'Bluetooth Speakers', 'Computer Accessories', 'Keyboards & Mice', 'Chargers & Adapters', 'Power Banks', 'Smart Watches', 'Smart Home Devices', 'LED Lights', 'Extension Cords & Power Strips', 'Microphones', 'Cameras & Accessories', 'Electric Fans & Gadgets', 'Cables & Connectors'] },
		{ name: 'Gym & Sports', detail: 'Training basics and gear for active days.', image: 'office-desk.jpg', subcategories: ['Dumbbells & Weights', 'Resistance Bands', 'Yoga Mats', 'Gym Gloves', 'Skipping Ropes', 'Fitness Accessories', 'Water Bottles & Shakers', 'Sports Balls', 'Badminton Equipment', 'Cricket Accessories', 'Football Accessories', 'Sports Protective Gear', 'Exercise Mats', 'Gym Bags'] },
		{ name: 'Mobile Accessories', detail: 'Useful add-ons for phones, charging and travel.', image: 'modern-home.jpg', subcategories: ['Mobile Covers & Cases', 'Screen Protectors', 'Phone Chargers', 'USB Cables', 'Wireless Chargers', 'Power Banks', 'Phone Holders & Stands', 'Car Phone Holders', 'Earbuds & Headsets', 'Selfie Sticks', 'Camera Lens Accessories', 'Mobile Ring Holders', 'OTG Adapters', 'SIM & Memory Card Accessories'] },
		{ name: 'Baby & Kids Products', detail: 'Thoughtful everyday basics for babies and kids.', image: 'bedroom.jpg', subcategories: ['Baby Clothing', 'Feeding Bottles & Accessories', 'Baby Care Products', 'Diapering Accessories', 'Baby Toys', 'Educational Toys', 'Baby Bedding', 'Baby Blankets', 'Baby Safety Products', 'Strollers & Accessories', 'Kids’ School Supplies', 'Kids’ Bags & Backpacks', 'Kids’ Room Decor', 'Kids’ Water Bottles'] },
		{ name: 'Medical Products', detail: 'Demo listings only; verify approved suppliers and local requirements.', image: 'office-chair.jpg', subcategories: ['First Aid Kits', 'Digital Thermometers', 'Blood Pressure Monitors', 'Pulse Oximeters', 'Hot & Cold Packs', 'Medical Support Braces', 'Bandages & Dressings', 'Medical Gloves', 'Face Masks', 'Pill Organizers', 'Mobility Aids', 'Personal Care Equipment', 'Medical Storage & Organizers'] },
		{ name: 'Cosmetics & Beauty Care', detail: 'Personal-care and beauty demo picks; no performance claims.', image: 'decor-detail.jpg', subcategories: ['Face Wash & Cleansers', 'Moisturizers', 'Sunscreen', 'Serums & Facial Oils', 'Makeup Products', 'Lipsticks & Lip Care', 'Foundation & Concealer', 'Eye Makeup', 'Makeup Brushes & Tools', 'Hair Care Products', 'Hair Styling Tools', 'Body Care Products', 'Nail Care', 'Perfumes & Fragrances', 'Beauty Gift Sets'] },
		{ name: 'Jewellery', detail: 'Finishing touches, keepsakes and jewellery storage.', image: 'decor-vase.jpg', subcategories: ['Necklaces & Pendants', 'Earrings', 'Rings', 'Bracelets', 'Bangles', 'Anklets', 'Jewelry Sets', 'Watches', 'Brooches & Pins', 'Men’s Jewelry', 'Women’s Jewelry', 'Jewelry Boxes & Organizers', 'Fashion Jewelry', 'Personalized Jewelry'] },
		{ name: 'Collectibles', detail: 'Display-worthy figures, models and memorabilia.', image: 'shelf-detail.jpg', subcategories: ['Collectible Figures', 'Action Figures', 'Die-Cast Cars', 'Coin Collectibles', 'Stamp Collectibles', 'Trading Cards', 'Sports Memorabilia', 'Miniature Models', 'Vintage Collectibles', 'Anime Collectibles', 'Movie & TV Collectibles', 'Collectible Keychains', 'Decorative Figurines', 'Display Cases & Stands'] },
		{ name: 'Celebration Items', detail: 'Decor, tableware and thoughtful finishing touches for events.', image: 'home-interior.jpg', subcategories: ['Birthday Decorations', 'Balloons', 'Party Banners & Backdrops', 'Cake Toppers', 'Candles & Cake Decorations', 'Party Tableware', 'Gift Wrapping Supplies', 'Gift Bags & Boxes', 'Greeting Cards', 'Wedding Decorations', 'Anniversary Decorations', 'Baby Shower Decorations', 'Graduation Party Supplies', 'Seasonal & Holiday Decorations', 'Party Favors & Return Gifts'] }
	];

	var slugify = function (value) {
		return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
	};
	var referenceCategories = {
		'pram-candle-gift': ['Celebration Items', 'Baby Shower Decorations'],
		'crystal-tealight-holder': ['Home Decor', 'Candles & Holders'],
		'music-photo-frame': ['Home Decor', 'Photo Frames'],
		'apollo-food-warmer': ['Household Items', 'Kitchen Accessories'],
		'resin-bird-wall-set': ['Home Decor', 'Showpieces & Figurines'],
		'chess-sculpture-set': ['Collectibles', 'Decorative Figurines']
	};
	products.forEach(function (product) {
		var placement = referenceCategories[product.id];
		if (placement) {
			product.category = placement[0];
			product.subcategory = placement[1];
			product.rooms = [placement[0], placement[1]];
		}
	});

	var demoVariants = ['Demo 1', 'Demo 2', 'Demo 3'];
	var demoDescriptions = [
		'First sample listing for the ',
		'Alternate sample listing for the ',
		'Additional sample listing for the '
	];
	var demoGallery = ['decor-detail.jpg', 'shelf-detail.jpg', 'modern-home.jpg'];
	categories.forEach(function (category, categoryIndex) {
		category.subcategories.forEach(function (subcategory, subcategoryIndex) {
			demoVariants.forEach(function (variant, variantIndex) {
				var demoName = subcategory + ' — ' + variant;
				var productId = 'demo-' + slugify(category.name) + '-' + slugify(subcategory) + '-' + (variantIndex + 1);
				var medicalNote = category.name === 'Medical Products'
					? ' Medical devices may require local regulatory approval; stock only compliant products from reliable suppliers.'
					: '';
				products.push({
					id: productId,
					name: demoName,
					category: category.name,
					subcategory: subcategory,
					price: 250 + categoryIndex * 145 + subcategoryIndex * 35 + variantIndex * 120,
					priceSource: 'Demo price only · not PANZY retail',
					image: category.image,
					gallery: [category.image].concat(demoGallery),
					tag: 'DEMO LISTING · ' + category.name.toUpperCase(),
					description: demoDescriptions[variantIndex] + subcategory.toLowerCase() + ' subcategory. This placeholder is for browsing and layout testing; replace it with a verified product, supplier-approved specifications and an actual product image before launch.',
					material: 'Demo detail only; material and specifications are not confirmed.',
					dimensions: 'Not specified in this catalogue preview.',
					color: 'Demo option; confirm real variants with the supplier.',
					rooms: [category.name, subcategory],
					demoOnly: true
				});
			});
		});
	});

	var currency = function (amount) {
		return 'Rs. ' + Number(amount).toLocaleString('en-PK');
	};

	var getCart = function () {
		var saved = window.localStorage.getItem(CART_KEY);
		if (!saved) {
			return {};
		}
		try {
			var cart = JSON.parse(saved);
			return cart && typeof cart === 'object' && !Array.isArray(cart) ? cart : {};
		} catch (error) {
			console.error('The preview cart could not be read.', error);
			return {};
		}
	};

	var setCart = function (cart) {
		window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
		updateCartCount();
		window.dispatchEvent(new CustomEvent('panzy:cart-updated'));
	};

	var countItems = function (cart) {
		return Object.values(cart).reduce(function (total, quantity) {
			return total + Number(quantity || 0);
		}, 0);
	};

	var getCount = function () {
		return countItems(getCart());
	};

	var getSubtotal = function (cart) {
		return products.reduce(function (total, product) {
			return total + (product.price * Number(cart[product.id] || 0));
		}, 0);
	};

	var icon = function (name) {
		var icons = {
			search: '<circle cx="10.8" cy="10.8" r="6.7"></circle><path d="m16 16 4.5 4.5"></path>',
			cart: '<path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 1.9-1.4L21 8H6"></path><circle cx="10" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle>',
			arrow: '<path d="M5 12h14M13 5l7 7-7 7"></path>'
		};
		return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icons[name] + '</svg>';
	};

	var currentPage = function () {
		var file = window.location.pathname.split('/').pop();
		return file === '' || file === 'index.html' || file === 'preview.html' ? 'home' : file.replace('.html', '');
	};

	var queryString = new URLSearchParams(window.location.search);
	var html = function (value) {
		return String(value).replace(/[&<>"']/g, function (character) {
			return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
		});
	};

	var header = function () {
		return '<div class="announcement-bar"><span class="announcement-spark">✳</span> THOUGHTFUL FINDS FOR EVERYDAY LIVING <span class="announcement-divider">·</span> PANZY HOME &amp; LIVING</div>' +
			'<header class="site-header"><div class="container header-main">' +
			'<a class="site-brand" href="/" aria-label="PANZY home"><img src="/panzy-woocommerce/assets/images/panzy-logo.png" alt="PANZY — Everything your home needs" width="116" height="94"></a>' +
			'<div class="header-tools"><form class="product-search" action="/shop.html" method="get" role="search"><label class="screen-reader-text" for="site-search">Search products</label><input id="site-search" type="search" name="q" value="' + html(queryString.get('q') || '') + '" placeholder="Search the collection"><button aria-label="Search" type="submit">' + icon('search') + '</button></form>' +
			'<a class="tool-link cart-link" href="/cart.html" aria-label="Shopping bag, ' + getCount() + ' items"><span class="cart-icon-wrap">' + icon('cart') + '<span class="cart-count" aria-live="polite">' + getCount() + '</span></span><span>Bag</span></a></div>' +
			'<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Open menu"><span></span><span></span><span></span></button></div>' +
			'<nav class="primary-navigation" id="primary-navigation" aria-label="Main navigation"><div class="container"><a class="nav-link" data-page="home" href="/">Home</a><a class="nav-link" data-page="shop" href="/shop.html">Shop</a><a class="nav-link" data-page="categories" href="/categories.html">Categories</a><a class="nav-link" data-page="about" href="/about.html">About Us</a><a class="nav-link" data-page="contact" href="/contact.html">Contact</a></div></nav></header>';
	};

	var footer = function () {
		var message = encodeURIComponent('Hello PANZY, I have a question about your home collection.');
		var whatsappUrl = WHATSAPP_BUSINESS_NUMBER
			? 'https://wa.me/' + WHATSAPP_BUSINESS_NUMBER.replace(/[^0-9]/g, '') + '?text=' + message
			: '';
		var whatsappIcon = '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3.5a12.1 12.1 0 0 0-10.3 18.5L4 28l6.2-1.6A12.1 12.1 0 1 0 16 3.5Zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.3-.4a9.7 9.7 0 1 1 8.4 4.6Zm5.3-7.3c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2c-.2.3-.8 1-1 1.2-.2.2-.4.3-.7.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6.3-.5v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 2.9 1.3 3.1.2.2 2.2 3.4 5.4 4.7.8.3 1.4.5 1.8.6.8.2 1.5.2 2 .1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.5Z"/></svg>';
		var whatsappLink = WHATSAPP_BUSINESS_NUMBER
			? '<a class="whatsapp-float" href="' + whatsappUrl + '" target="_blank" rel="noopener noreferrer" aria-label="Message PANZY directly on WhatsApp">' + whatsappIcon + '<span>Chat with us</span></a>'
			: '<a class="whatsapp-float whatsapp-pending" href="/contact.html" aria-label="WhatsApp contact details coming soon">' + whatsappIcon + '<span>WhatsApp soon</span></a>';

		return '<footer class="site-footer"><div class="container footer-grid">' +
			'<div class="footer-brand"><a href="/" aria-label="PANZY home"><span class="footer-wordmark">PANZY</span></a><p>Thoughtful pieces for a place that feels like yours.</p><span class="footer-tagline">EVERYTHING YOUR HOME NEEDS.</span></div>' +
			'<div class="footer-links"><h2>Explore</h2><a href="/shop.html">Shop all</a><a href="/categories.html">Browse categories</a><a href="/about.html">Our approach</a><a href="/contact.html">Get in touch</a></div>' +
			'<div class="footer-links"><h2>Let’s connect</h2><p>Have a question about a product? We’d love to hear from you.</p><a href="/contact.html">Visit the contact page ' + icon('arrow') + '</a><p class="footer-note">Demo listings and sample prices; open-license photos are illustrative, not verified PANZY stock. Confirm catalogue and policies before launch.</p></div></div>' +
			'<div class="footer-bottom"><div class="container"><span>© ' + new Date().getFullYear() + ' PANZY</span><span>Thoughtfully considered. Entirely yours.</span></div></div></footer>' + whatsappLink;
	};

	var productCard = function (product, index) {
		var credit = openverseImages.products[product.id];
		var cardImageAlt = credit
			? credit.title + ' by ' + (credit.creator || 'unknown creator') + ', illustrating ' + product.name
			: product.demoOnly
				? 'Illustrative placeholder image for demo product ' + product.name + '; not a verified product photo'
				: 'Original PANZY concept illustration for ' + product.name;
		return '<article class="product-card reveal" style="--reveal-index:' + index % 4 + '">' +
			'<a class="product-card-image" href="/product.html?id=' + encodeURIComponent(product.id) + '" aria-label="View ' + html(product.name) + '">' +
			'<img src="' + productImage(product) + '" alt="' + html(cardImageAlt) + '" loading="lazy"><span class="product-card-category">' + html(product.category) + '</span><span class="concept-image-mark">' + (credit ? 'OPEN-LICENSE PHOTO' : product.demoOnly ? 'DEMO IMAGE' : 'CONCEPT ART') + '</span>' +
			'<span class="product-card-arrow">' + icon('arrow') + '</span></a><div class="product-card-info"><a class="product-card-title" href="/product.html?id=' + encodeURIComponent(product.id) + '">' + html(product.name) + '</a>' +
			'<p class="product-card-subcategory">' + html(product.subcategory || product.category) + '</p>' + imageCredit(credit, 'product-photo-attribution') + '<p class="product-card-meta">' + html(product.priceSource || 'Demo price only · not PANZY retail') + '</p><div class="product-card-buy"><strong>' + currency(product.price) + '</strong><button class="quick-add" type="button" data-add-to-cart="' + html(product.id) + '" aria-label="Add ' + html(product.name) + ' to cart">Add to bag <span aria-hidden="true">+</span></button></div></div></article>';
	};

	var productGrid = function (items) {
		if (!items.length) {
			return '<div class="empty-results"><span>✳</span><h2>Nothing on this shelf just yet.</h2><p>Try another search or explore the full collection.</p><a class="button button-solid" href="/shop.html">Browse all items ' + icon('arrow') + '</a></div>';
		}
		return '<div class="product-grid">' + items.map(productCard).join('') + '</div>';
	};

	var categoryCard = function (category, index) {
		var categoryCount = products.filter(function (product) { return product.category === category.name; }).length;
		var credit = openverseImages.categories[slugify(category.name)];
		var imageAlt = credit
			? credit.title + ' by ' + (credit.creator || 'unknown creator') + ', representing ' + category.name
			: 'Explore PANZY ' + category.name + ' products';
		return '<div class="collection-card-wrap"><a class="collection-card reveal" style="--reveal-index:' + index % 4 + '" href="/categories.html?category=' + encodeURIComponent(category.name) + '">' +
			'<img src="' + photo(credit ? credit.url : category.image) + '" alt="' + html(imageAlt) + '" loading="lazy"><span class="collection-wash"></span>' +
			'<span class="collection-number">' + String(index + 1).padStart(2, '0') + '</span><span class="collection-copy"><strong>' + html(category.name) + '</strong><small>' + html(category.detail) + ' · ' + category.subcategories.length + ' subcategories · ' + categoryCount + ' demo items</small></span><span class="collection-arrow">' + icon('arrow') + '</span></a>' + imageCredit(credit, 'collection-photo-attribution') + '</div>';
	};

	var intro = function (eyebrow, title, copy) {
		return '<section class="page-intro reveal"><div class="container"><span class="eyebrow">' + eyebrow + '</span><h1>' + title + '</h1>' + (copy ? '<p>' + copy + '</p>' : '') + '<span class="intro-flower" aria-hidden="true">✳</span></div></section>';
	};

	var homePage = function () {
		var featured = products.slice(0, 3);
		var tabletop = products.slice(3, 6);
		return '<main id="main" class="editorial-home"><section class="hero hero-editorial"><div class="container editorial-hero-grid"><div class="editorial-hero-copy"><span class="eyebrow hero-eyebrow"><span></span> PANZY OBJECTS &amp; HOME</span><p class="hero-index">THE EVERYDAY, RE-CURATED <span>— 01 / 04</span></p><h1>Little things.<br><em>Lovely</em> living.</h1><p class="hero-intro">A fresh edit of tabletop details, soft textures and collected corners. Find one piece that makes your space feel more like yours.</p><a class="button button-solid hero-shop-link" href="/shop.html">Shop the style edit ' + icon('arrow') + '</a><a class="hero-secondary-link" href="/categories.html">Choose a room <span>↗</span></a><div class="hero-stamp" aria-hidden="true">MAKE<br>SPACE<br>FOR<br>GOOD<br>THINGS</div></div><div class="editorial-collage"><a class="collage-main" href="/shop.html?category=Vases%20%26%20Planters"><img src="' + photo('hero-living.jpg') + '" alt="Sunlit home styling inspiration for the PANZY preview" fetchpriority="high"><span class="collage-caption">01 — A ROOM TO RETURN TO</span></a><a class="collage-tile collage-vase" href="/shop.html?category=Vases%20%26%20Planters"><img src="' + photo('decor-vase.jpg') + '" alt="Decor styling inspiration" loading="lazy"><span>SHAPE / TEXTURE</span></a><a class="collage-tile collage-frame" href="/shop.html?category=Wall%20%26%20Table%20Decor"><img src="' + photo('shelf-detail.jpg') + '" alt="Collected shelf styling inspiration" loading="lazy"><span>COLLECTED, NOT MATCHED</span></a><span class="collage-orbit" aria-hidden="true">PANZY<br>HOME<br>STUDIES</span></div><a class="hero-scroll-cue" href="#home-categories"><span>SCROLL TO DISCOVER</span><i aria-hidden="true"></i></a></div></section>' +
			'<div class="editorial-ribbon" aria-label="Home styling preview themes"><div class="editorial-ribbon-track"><span>OBJECTS WITH A STORY</span><b>✳</b><span>ROOM FOR YOUR RITUALS</span><b>✳</b><span>THE COLLECTED HOME</span><b>✳</b><span>OBJECTS WITH A STORY</span><b>✳</b><span>ROOM FOR YOUR RITUALS</span><b>✳</b><span>THE COLLECTED HOME</span><b>✳</b></div></div>' +
			'<section class="category-section section-pad editorial-categories" id="home-categories"><div class="container"><div class="section-topline reveal"><div><span class="eyebrow">START WITH A FEELING</span><h2>Shop by <em>little rituals.</em></h2></div><a class="text-link" href="/categories.html">All 14 categories ' + icon('arrow') + '</a></div><div class="collection-grid">' + categories.map(categoryCard).join('') + '</div><div class="category-side-note">PICK A CORNER, FIND YOUR STARTING POINT <span>↓</span></div></div></section>' +
			'<section class="featured-section section-pad editorial-featured"><div class="container"><div class="editorial-product-heading reveal"><div><span class="eyebrow">A FEW GOOD THINGS</span><h2>The shelf, <em>edited.</em></h2></div><p>' + products.length + ' demo and reference listings across 14 categories. Product details, stock and prices must be verified before launch.</p><a class="text-link" href="/shop.html">Browse the full catalogue ' + icon('arrow') + '</a></div>' + productGrid(featured) + '</div></section>' +
			'<section class="editorial-story"><div class="editorial-story-image"><img src="' + photo('living-accent.jpg') + '" alt="A warm, collected living-space styling reference" loading="lazy"><span class="story-image-index">STUDY NO. 02 / COLLECTED CORNERS</span></div><div class="editorial-story-copy reveal"><span class="eyebrow">THE PANZY MIX</span><p class="story-number">02 <span>— 04</span></p><h2>A little vintage soul.<br>A little <em>everyday ease.</em></h2><p>Taking cues from collected homeware and room-by-room discovery, PANZY brings together tabletop accents, soft layers and pieces that make a corner feel considered.</p><a class="button button-outline" href="/about.html">Meet the PANZY point of view ' + icon('arrow') + '</a></div></section>' +
			'<section class="featured-section section-pad editorial-tabletop"><div class="container"><div class="section-topline reveal"><div><span class="eyebrow">DEMO PRODUCTS</span><h2>Browse the <em>full edit.</em></h2></div><a class="text-link" href="/shop.html">Explore the catalogue ' + icon('arrow') + '</a></div>' + productGrid(tabletop) + '</div></section>' +
			'<section class="closing-banner editorial-closing"><div class="container reveal"><span class="eyebrow">YOUR HOME, YOUR COMPOSITION</span><h2>Keep the pieces<br>that <em>feel like you.</em></h2><a class="button button-light" href="/shop.html">Explore PANZY ' + icon('arrow') + '</a><span class="closing-side-label">THE PANZY HOME EDIT / 2026</span></div></section></main>';
	};

	var shopPage = function () {
		var requestedCategory = queryString.get('category') || '';
		var legacyCategoryAliases = {
			'Vases & Planters': ['Home Decor', 'Decorative Vases'],
			'Wall & Table Decor': ['Home Decor', 'Photo Frames']
		};
		var categoryAlias = legacyCategoryAliases[requestedCategory];
		var chosenCategory = categoryAlias ? categoryAlias[0] : requestedCategory;
		var chosenSubcategory = queryString.get('subcategory') || (categoryAlias ? categoryAlias[1] : '');
		var searchTerm = (queryString.get('q') || '').trim();
		var sort = queryString.get('sort') || 'featured';
		var min = Number(queryString.get('min') || 0);
		var max = Number(queryString.get('max') || 0);
		var filtered = products.filter(function (product) {
			var matchesCategory = !chosenCategory || product.category === chosenCategory;
			var matchesSubcategory = !chosenSubcategory || product.subcategory === chosenSubcategory;
			var matchesSearch = !searchTerm || (product.name + ' ' + product.category + ' ' + (product.subcategory || '')).toLowerCase().includes(searchTerm.toLowerCase());
			var matchesMin = !min || product.price >= min;
			var matchesMax = !max || product.price <= max;
			return matchesCategory && matchesSubcategory && matchesSearch && matchesMin && matchesMax;
		});
		filtered.sort(function (first, second) {
			if (sort === 'price-low') { return first.price - second.price; }
			if (sort === 'price-high') { return second.price - first.price; }
			if (sort === 'name') { return first.name.localeCompare(second.name); }
			if (sort === 'newest') { return products.indexOf(second) - products.indexOf(first); }
			return products.indexOf(first) - products.indexOf(second);
		});
		var pageSize = 24;
		var totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
		var requestedPage = parseInt(queryString.get('page') || '1', 10);
		var selectedPage = Math.min(totalPages, Math.max(1, isNaN(requestedPage) ? 1 : requestedPage));
		var visibleProducts = filtered.slice((selectedPage - 1) * pageSize, selectedPage * pageSize);
		var title = chosenSubcategory || chosenCategory || 'The whole collection';
		var breadcrumb = '<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/categories.html">Categories</a>' + (chosenCategory ? '<span>/</span><a href="/categories.html?category=' + encodeURIComponent(chosenCategory) + '">' + html(chosenCategory) + '</a>' : '') + (chosenSubcategory ? '<span>/</span><span>' + html(chosenSubcategory) + '</span>' : '') + '</nav>';
		var categoryChoices = '<a class="' + (!chosenCategory ? 'filter-active' : '') + '" href="/shop.html">All categories <span>' + products.length + '</span></a>' + categories.map(function (category) {
			var categoryCount = products.filter(function (product) { return product.category === category.name; }).length;
			return '<a class="' + (chosenCategory === category.name ? 'filter-active' : '') + '" href="/shop.html?category=' + encodeURIComponent(category.name) + '">' + html(category.name) + '<span>' + categoryCount + '</span></a>';
		}).join('');
		var selectedCategoryData = categories.find(function (category) { return category.name === chosenCategory; });
		var subcategoryChoices = selectedCategoryData ? '<div class="shop-subcategory-list"><span>SUBCATEGORIES</span><a class="' + (!chosenSubcategory ? 'filter-active' : '') + '" href="/shop.html?category=' + encodeURIComponent(chosenCategory) + '">All ' + html(chosenCategory) + '</a>' + selectedCategoryData.subcategories.map(function (subcategory) {
			var count = products.filter(function (product) { return product.category === chosenCategory && product.subcategory === subcategory; }).length;
			return '<a class="' + (chosenSubcategory === subcategory ? 'filter-active' : '') + '" href="/shop.html?category=' + encodeURIComponent(chosenCategory) + '&subcategory=' + encodeURIComponent(subcategory) + '">' + html(subcategory) + '<small>' + count + '</small></a>';
		}).join('') + '</div>' : '';
		var pageQuery = function (pageNumber) {
			var params = new URLSearchParams(window.location.search);
			params.set('page', String(pageNumber));
			return '/shop.html?' + params.toString();
		};
		var pagination = totalPages > 1
			? '<nav class="catalog-pagination" aria-label="Product pages">' + (selectedPage > 1 ? '<a href="' + pageQuery(selectedPage - 1) + '">← Previous</a>' : '<span class="pagination-disabled">← Previous</span>') + '<span>Page ' + selectedPage + ' of ' + totalPages + ' · ' + filtered.length + ' items</span>' + (selectedPage < totalPages ? '<a href="' + pageQuery(selectedPage + 1) + '">Next ' + Math.min(pageSize, filtered.length - selectedPage * pageSize) + ' →</a>' : '<span class="pagination-disabled">Next →</span>') + '</nav>'
			: '<p class="catalog-count-note">Showing all ' + filtered.length + ' matching demo listings.</p>';
		return '<main id="main">' + intro('PANZY DEMO CATALOGUE', html(title) + '.', searchTerm ? 'Matching demo listings for “' + html(searchTerm) + '”. Product descriptions, variants and prices are sample content only.' : 'Browse every supplied category and subcategory. All generated products are demo placeholders; verify real products, suppliers, prices and availability before launch.') +
			'<section class="shop-layout container"><aside class="shop-sidebar"><div class="filter-heading"><span>EXPLORE</span><a href="/shop.html">Reset</a></div><nav class="category-filter" aria-label="Filter by category">' + categoryChoices + '</nav>' + subcategoryChoices + '<form class="price-filter" action="/shop.html" method="get"><h2>Find your price</h2>' + (chosenCategory ? '<input type="hidden" name="category" value="' + html(chosenCategory) + '">' : '') + (chosenSubcategory ? '<input type="hidden" name="subcategory" value="' + html(chosenSubcategory) + '">' : '') + '<label>From (Rs.)<input type="number" min="0" name="min" value="' + (min || '') + '" placeholder="Min price"></label><label>To (Rs.)<input type="number" min="0" name="max" value="' + (max || '') + '" placeholder="Max price"></label><button class="button button-solid" type="submit">Apply filters</button></form><p class="filter-help">All displayed prices are placeholders, not PANZY retail prices.</p></aside>' +
			'<div class="shop-results">' + breadcrumb + '<div class="shop-results-top"><span>' + filtered.length + ' demo ' + (filtered.length === 1 ? 'product' : 'products') + (chosenCategory ? ' in ' + html(chosenCategory) : '') + (chosenSubcategory ? ' · ' + html(chosenSubcategory) : '') + '</span><form class="sort-form" action="/shop.html" method="get">' + (chosenCategory ? '<input type="hidden" name="category" value="' + html(chosenCategory) + '">' : '') + (chosenSubcategory ? '<input type="hidden" name="subcategory" value="' + html(chosenSubcategory) + '">' : '') + (searchTerm ? '<input type="hidden" name="q" value="' + html(searchTerm) + '">' : '') + (min ? '<input type="hidden" name="min" value="' + min + '">' : '') + (max ? '<input type="hidden" name="max" value="' + max + '">' : '') + '<label for="sort-products">Sort by</label><select id="sort-products" name="sort" onchange="this.form.submit()"><option value="featured" ' + (sort === 'featured' ? 'selected' : '') + '>Recommended</option><option value="newest" ' + (sort === 'newest' ? 'selected' : '') + '>New arrivals</option><option value="price-low" ' + (sort === 'price-low' ? 'selected' : '') + '>Price: low to high</option><option value="price-high" ' + (sort === 'price-high' ? 'selected' : '') + '>Price: high to low</option><option value="name" ' + (sort === 'name' ? 'selected' : '') + '>Name</option></select></form></div><p class="catalog-note"><span>✳</span> Open-license photos are visual references, not verified PANZY product photos. Product descriptions and prices are demo placeholders.</p>' + productGrid(visibleProducts) + pagination + '</div></section></main>';
	};

	var categoriesPage = function () {
		var selectedCategory = queryString.get('category') || '';
		var category = categories.find(function (entry) { return entry.name === selectedCategory; });
		var categoryContent;
		if (category) {
			var subcategoryCards = category.subcategories.map(function (subcategory, index) {
				var count = products.filter(function (product) { return product.category === category.name && product.subcategory === subcategory; }).length;
				var credit = openverseImages.subcategories[slugify(category.name) + '|' + slugify(subcategory)];
				var imageAlt = credit
					? credit.title + ' by ' + (credit.creator || 'unknown creator') + ', representing ' + subcategory
					: 'Explore demo products in ' + subcategory;
				return '<div class="subcategory-card-wrap"><a class="subcategory-card reveal" style="--reveal-index:' + index % 4 + '" href="/shop.html?category=' + encodeURIComponent(category.name) + '&subcategory=' + encodeURIComponent(subcategory) + '"><img src="' + photo(credit ? credit.url : category.image) + '" alt="' + html(imageAlt) + '" loading="lazy"><span class="subcategory-card-number">' + String(index + 1).padStart(2, '0') + '</span><span class="subcategory-card-copy"><strong>' + html(subcategory) + '</strong><small>' + count + ' demo products</small></span><span class="subcategory-card-arrow">' + icon('arrow') + '</span></a>' + imageCredit(credit, 'subcategory-photo-attribution') + '</div>';
			}).join('');
			var demoNote = category.name === 'Medical Products'
				? 'Medical demos only. Stock compliant products from reliable suppliers; medical devices may require local regulatory approval.'
				: 'Each subcategory opens three demo listings. Product names, images, specifications and prices are placeholders until PANZY verifies real inventory.';
			categoryContent = '<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/categories.html">Categories</a><span>/</span><span>' + html(category.name) + '</span></nav><div class="subcategory-grid">' + subcategoryCards + '</div><p class="catalog-note category-demo-note"><span>✳</span> ' + html(demoNote) + '</p><div class="category-bottom-note"><span>' + category.subcategories.length + ' SUBCATEGORIES · 3–4 DEMOS EACH</span><a class="text-link" href="/shop.html?category=' + encodeURIComponent(category.name) + '">Browse all ' + html(category.name) + ' products ' + icon('arrow') + '</a></div>';
		} else {
			categoryContent = '<div class="collection-grid collection-grid-full">' + categories.map(categoryCard).join('') + '</div><div class="category-bottom-note"><span>14 CATEGORIES · ' + categories.reduce(function (count, entry) { return count + entry.subcategories.length; }, 0) + ' SUBCATEGORIES · 3–4 DEMOS EACH</span><a class="text-link" href="/shop.html">Browse all ' + products.length + ' listings ' + icon('arrow') + '</a></div>';
		}
		return '<main id="main">' + intro(category ? 'BROWSE A CATEGORY' : 'THE PANZY DEMO CATALOGUE', category ? html(category.name) + '.' : 'Explore the <em>whole store.</em>', category ? html(category.detail) + ' Choose a subcategory to see its demo products.' : 'Choose from all 14 main categories, then browse the subcategories and their demo products. The catalogue is for layout testing, not a live inventory.') +
			'<section class="section-pad category-index"><div class="container">' + categoryContent + '</div></section></main>';
	};

	var aboutPage = function () {
		return '<main id="main">' + intro('THE STORY WE’RE BUILDING', 'A home, a feeling, a little more <em>you.</em>', 'The PANZY point of view starts with a simple idea: everyday spaces deserve a little more thought.') +
			'<section class="about-lead container"><div class="about-lead-copy reveal"><span class="eyebrow">HELLO, WE’RE PANZY</span><h2>Everything your home needs.<br>Nothing you <em>don’t.</em></h2><p>We bring together home and office essentials for the spaces that make a day yours. Warmth without fuss. Useful things with a considered point of view. Room to live your way.</p><p>We’re building PANZY around comfort, trust and refined living — and letting the pieces speak for themselves.</p><a class="button button-solid" href="/categories.html">Explore the collections ' + icon('arrow') + '</a></div><div class="about-lead-image reveal"><img src="' + photo('decor-detail.jpg') + '" alt="Thoughtful furniture details in a warm, sunlit home" loading="lazy"><span>THE LITTLE THINGS MAKE A HOME.</span></div></section>' +
			'<section class="values-section"><div class="container"><span class="eyebrow">A FEELING WORTH COMING HOME TO</span><div class="values-grid"><article class="value-card reveal"><span>01</span><h2>Comfort</h2><p>A home should invite you to be yourself. Start with the pieces and corners you reach for every day.</p></article><article class="value-card reveal"><span>02</span><h2>Trust</h2><p>Clear details, straightforward care and an honest conversation. That’s how we want every PANZY interaction to feel.</p></article><article class="value-card reveal"><span>03</span><h2>Refined living</h2><p>Considered doesn’t have to mean complicated. Beautiful, practical choices can simply make everyday life feel better.</p></article></div></div></section><section class="closing-banner"><div class="container"><span class="eyebrow">MAKE YOUR SPACE YOUR OWN</span><h2>Come find your <em>everyday.</em></h2><a class="button button-light" href="/shop.html">Shop the collection ' + icon('arrow') + '</a></div></section></main>';
	};

	var contactPage = function () {
		var message = encodeURIComponent('Hello PANZY, I would like to ask a question about your collection.');
		var whatsapp = WHATSAPP_BUSINESS_NUMBER ? 'https://wa.me/' + WHATSAPP_BUSINESS_NUMBER.replace(/[^0-9]/g, '') + '?text=' + message : '';
		var whatsappAction = whatsapp
			? '<a class="contact-whatsapp" href="' + whatsapp + '" target="_blank" rel="noopener noreferrer"><span class="whatsapp-small">' + icon('arrow') + '</span><span><strong>Message us on WhatsApp</strong><small>Open a direct chat with PANZY</small></span>' + icon('arrow') + '</a>'
			: '<div class="contact-whatsapp"><span class="whatsapp-small">' + icon('arrow') + '</span><span><strong>WhatsApp contact coming soon</strong><small>PANZY will add its verified business number before launch.</small></span></div>';
		return '<main id="main">' + intro('WE’RE HERE TO HELP', 'Let’s make it <em>easy.</em>', 'Questions about the collection or looking for more details? Get in touch and we’ll point you in the right direction.') +
			'<section class="contact-layout container"><div class="contact-info reveal"><span class="eyebrow">SAY HELLO</span><h2>A real conversation<br>goes a long way.</h2><p>Message us about a product or a question about the shop. Before launch, PANZY will add its verified business contact information here.</p>' + whatsappAction + '<div class="contact-detail"><span>SHOP INFORMATION</span><p>PANZY’s verified phone, email and business hours will be provided by the store owner.</p></div></div><form class="contact-form reveal" id="contact-form"><span class="eyebrow">SEND US A NOTE</span><h2>What can we help with?</h2><div class="form-row"><label>Your name<input name="name" autocomplete="name" placeholder="How should we address you?" required></label><label>Email address<input name="email" type="email" autocomplete="email" placeholder="you@example.com" required></label></div><label>What is this about?<select name="subject"><option>Product question</option><option>Order enquiry</option><option>General question</option></select></label><label>Your message<textarea name="message" rows="5" placeholder="Write us a note…" required></textarea></label><button class="button button-solid" type="submit">Send your message ' + icon('arrow') + '</button><p class="form-notice">Preview only: this form will not send or store your message.</p><div class="form-feedback" id="contact-feedback" aria-live="polite"></div></form></section></main>';
	};

	var productPage = function () {
		var item = products.find(function (product) { return product.id === queryString.get('id'); }) || products[0];
		var itemCredit = openverseImages.products[item.id];
		var categoryUrl = '/shop.html?category=' + encodeURIComponent(item.category);
		var subcategoryUrl = categoryUrl + '&subcategory=' + encodeURIComponent(item.subcategory || '');
		var imageAlt = itemCredit
			? itemCredit.title + ' by ' + (itemCredit.creator || 'unknown creator') + ', illustrating ' + item.name
			: item.demoOnly
				? 'Illustrative placeholder image for ' + item.name + ', not a verified product photo'
				: 'Original PANZY concept illustration of ' + item.name;
		var galleryNote = item.demoOnly
			? 'Open-license illustrative photo, not a confirmed photo of PANZY stock or the exact item.'
			: 'Open-license illustrative photo; it does not show confirmed PANZY inventory.';
		var related = products.filter(function (product) {
			return product.subcategory === item.subcategory && product.id !== item.id;
		}).slice(0, 4);
		var galleryImages = [productImage(item)].concat(item.gallery.slice(1).map(photo));
		var gallery = galleryImages.map(function (image, index) {
			return '<button class="gallery-thumbnail ' + (index === 0 ? 'is-active' : '') + '" type="button" data-image="' + image + '" aria-label="Show product illustration or styling inspiration ' + (index + 1) + '" aria-pressed="' + (index === 0 ? 'true' : 'false') + '"><img src="' + image + '" alt="" loading="lazy"></button>';
		}).join('');
		return '<main id="main"><div class="container"><nav class="breadcrumbs product-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/categories.html">Categories</a><span>/</span><a href="' + categoryUrl + '">' + html(item.category) + '</a><span>/</span><a href="' + subcategoryUrl + '">' + html(item.subcategory || item.category) + '</a><span>/</span><span>' + html(item.name) + '</span></nav><section class="product-detail"><div class="product-gallery reveal"><div class="product-main-image"><img src="' + productImage(item) + '" id="main-product-image" alt="' + html(imageAlt) + '"></div><div class="gallery-strip" aria-label="More product inspiration">' + gallery + '</div><p class="gallery-disclaimer">' + html(galleryNote) + '</p>' + imageCredit(itemCredit, 'detail-photo-attribution') + '</div><div class="product-information reveal"><span class="eyebrow">' + html(item.category).toUpperCase() + ' · ' + html(item.subcategory || 'PANZY EDIT').toUpperCase() + '</span><p class="product-kicker">' + html(item.tag) + '</p><h1>' + html(item.name) + '</h1><p class="product-price">' + currency(item.price) + '</p><p class="product-disclaimer">' + html(item.priceSource) + ' · final PANZY retail price not set</p><p class="product-description">' + html(item.description) + '</p><div class="product-meta"><div><span>COLOUR</span><strong>' + html(item.color) + '</strong></div><div><span>AVAILABILITY</span><strong>Confirm with the store</strong></div></div><div class="product-quantity"><span>QUANTITY</span><div class="quantity-stepper"><button type="button" data-detail-qty="-1" aria-label="Decrease quantity">−</button><output id="detail-qty">1</output><button type="button" data-detail-qty="1" aria-label="Increase quantity">+</button></div></div><button class="button button-solid add-detail-button" type="button" data-add-to-cart="' + html(item.id) + '" data-detail-add>Add to bag <span>·</span> ' + currency(item.price) + '</button><p class="shipping-note">Payment, delivery options and product availability are confirmed by the real store at launch.</p><div class="detail-accordion"><details open><summary>The thoughtful details</summary><p>' + html(item.material) + ' ' + html(item.dimensions) + '</p><p>Confirm the exact specifications and included accessories for each real product before purchase.</p></details><details><summary>Delivery &amp; returns</summary><p>Shipping and returns policies will be published by PANZY before the live shop accepts orders.</p></details></div></div></section><section class="related-products section-pad"><div class="section-topline"><div><span class="eyebrow">MORE IN ' + html(item.subcategory || item.category).toUpperCase() + '</span><h2>More worth <em>a look.</em></h2></div><a class="text-link" href="' + subcategoryUrl + '">Browse this subcategory ' + icon('arrow') + '</a></div>' + productGrid(related) + '</section></div></main>';
	};

	var cartPage = function () {
		var cart = getCart();
		var items = products.filter(function (product) { return Number(cart[product.id] || 0) > 0; });
		if (!items.length) {
			return '<main id="main">' + intro('A GOOD PLACE TO BEGIN', 'Your bag is taking a <em>breather.</em>', 'Find something considered for the home, and you’ll see it waiting for you here.') + '<section class="container empty-cart"><span class="empty-cart-icon">' + icon('cart') + '</span><a class="button button-solid" href="/shop.html">Continue to shop ' + icon('arrow') + '</a></section></main>';
		}
		var rows = items.map(function (product, index) {
			var quantity = Number(cart[product.id]);
			return '<article class="cart-row reveal" data-cart-row="' + html(product.id) + '"><a class="cart-item-image" href="/product.html?id=' + encodeURIComponent(product.id) + '"><img src="' + productImage(product) + '" alt="' + html((product.demoOnly ? 'Illustrative demo photo for ' : 'Illustrative reference photo for ') + product.name) + '" loading="lazy"></a><div class="cart-item-details"><span>' + html(product.category + ' · ' + (product.subcategory || '')) + '</span><a href="/product.html?id=' + encodeURIComponent(product.id) + '"><h2>' + html(product.name) + '</h2></a>' + imageCredit(openverseImages.products[product.id], 'product-photo-attribution') + '<button class="remove-item" type="button" data-remove-item="' + html(product.id) + '">Remove item</button></div><div class="quantity-stepper cart-stepper"><button type="button" data-cart-qty="-1" data-product-id="' + html(product.id) + '" aria-label="Decrease quantity">−</button><output>' + quantity + '</output><button type="button" data-cart-qty="1" data-product-id="' + html(product.id) + '" aria-label="Increase quantity">+</button></div><strong class="cart-line-total">' + currency(product.price * quantity) + '</strong></article>';
		}).join('');
		var subtotal = getSubtotal(cart);
		return '<main id="main">' + intro('A THOUGHTFUL LITTLE EDIT', 'Your bag, your <em>call.</em>', items.length + ' ' + (items.length === 1 ? 'preview item' : 'preview items') + ' in your bag.') + '<section class="container cart-layout"><div class="cart-items"><div class="cart-heading-row"><span>YOUR SELECTION</span><span>SUBTOTAL</span></div>' + rows + '<a class="continue-shopping text-link" href="/shop.html">← &nbsp; Continue looking around</a></div><aside class="order-summary"><span class="eyebrow">THE LITTLE DETAILS</span><h2>Order summary</h2><div class="summary-line"><span>Subtotal</span><strong>' + currency(subtotal) + '</strong></div><div class="summary-line summary-delivery"><span>Delivery</span><span>Confirmed by store</span></div><p class="summary-preview">Preview only. Amounts are sample/reference prices, not PANZY retail pricing. Shipping, taxes and payment are not processed by this preview.</p><div class="summary-total"><span>Estimated total</span><strong>' + currency(subtotal) + '</strong></div><a class="button button-solid checkout-link" href="/checkout.html">Continue to checkout ' + icon('arrow') + '</a><p class="secure-note"><span aria-hidden="true">♡</span> A considerate checkout, from the comfort of home.</p></aside></section></main>';
	};

	var checkoutPage = function () {
		var cart = getCart();
		var items = products.filter(function (product) { return Number(cart[product.id] || 0) > 0; });
		if (!items.length) {
			return '<main id="main">' + intro('FIRST, FIND SOMETHING YOU LOVE', 'Your bag comes <em>first.</em>', 'Add an item to your bag to preview checkout.') + '<section class="container empty-cart"><a class="button button-solid" href="/shop.html">Explore the collection ' + icon('arrow') + '</a></section></main>';
		}
		var subtotal = getSubtotal(cart);
		var summary = items.map(function (product) {
			return '<div class="checkout-item"><span class="checkout-item-qty">' + Number(cart[product.id]) + '</span><img src="' + productImage(product) + '" alt="" loading="lazy"><span>' + html(product.name) + '<small>' + html(product.category + ' · ' + (product.subcategory || '')) + '</small>' + imageCredit(openverseImages.products[product.id], 'product-photo-attribution') + '</span><strong>' + currency(product.price * Number(cart[product.id])) + '</strong></div>';
		}).join('');
		return '<main id="main">' + intro('ONE LAST LITTLE THING', 'Make yourself at <em>home.</em>', 'Add delivery details to preview the checkout layout.') + '<section class="container checkout-layout"><form class="checkout-form" id="checkout-form"><div class="form-section-heading"><span>01</span><div><span class="eyebrow">A NOTE FROM YOU</span><h2>Contact details</h2></div></div><div class="form-row"><label>First name<input name="firstName" autocomplete="given-name" required placeholder="First name"></label><label>Last name<input name="lastName" autocomplete="family-name" required placeholder="Last name"></label></div><div class="form-row"><label>Email address<input name="email" autocomplete="email" type="email" required placeholder="you@example.com"></label><label>Phone number<input name="phone" autocomplete="tel" type="tel" required placeholder="+92 300 0000000"></label></div><div class="form-section-heading address-heading"><span>02</span><div><span class="eyebrow">RIGHT TO YOUR DOOR</span><h2>Delivery address</h2></div></div><label>Street address<input name="address" autocomplete="street-address" required placeholder="House / flat number and street"></label><div class="form-row"><label>City<input name="city" autocomplete="address-level2" required placeholder="City"></label><label>Postal code<input name="postal" autocomplete="postal-code" placeholder="Postal code"></label></div><label>Order notes <span class="optional-label">OPTIONAL</span><textarea name="notes" rows="3" placeholder="Anything else the store should know?"></textarea></label><div class="form-section-heading payment-heading"><span>03</span><div><span class="eyebrow">HOW WOULD YOU LIKE TO PAY?</span><h2>Payment method</h2></div></div><label class="payment-choice selected-payment"><input type="radio" name="payment" value="cod" checked><span class="payment-choice-icon" aria-hidden="true">↗</span><span class="payment-choice-copy"><strong>Cash on delivery</strong><small>Preview selection · available only if PANZY enables COD at launch</small></span><span class="payment-choice-radio"></span></label><label class="payment-choice payment-unavailable"><input type="radio" name="payment" value="card" disabled><span class="payment-choice-icon" aria-hidden="true">▤</span><span class="payment-choice-copy"><strong>Pay securely by card</strong><small>Unavailable until PANZY configures and tests an eligible card gateway</small></span><span class="gateway-pending">SETUP REQUIRED</span></label><p class="gateway-note">No payment is processed in this preview. Card details are never requested here. The real shop can accept card payments only after an eligible payment gateway is installed, configured and tested.</p><button class="button button-solid place-order" type="submit">Place preview order · ' + currency(subtotal) + ' ' + icon('arrow') + '</button><p class="privacy-note">Demo only. Your details remain in this browser tab and are not sent to a store or saved by this preview.</p></form><aside class="checkout-summary"><span class="eyebrow">IN YOUR BAG</span><h2>Your selection</h2>' + summary + '<div class="summary-line"><span>Subtotal</span><strong>' + currency(subtotal) + '</strong></div><div class="summary-line summary-delivery"><span>Delivery</span><span>Confirmed by store</span></div><p class="summary-preview">Sample/reference amounts only, not PANZY prices. No sale or payment is processed; delivery charges and final pricing must be confirmed by PANZY.</p><div class="summary-total"><span>Estimated total</span><strong>' + currency(subtotal) + '</strong></div><a class="text-link" href="/cart.html">← &nbsp; Back to your bag</a></aside></section></main>';
	};

	var confirmationPage = function () {
		return '<main id="main"><section class="confirmation-page container"><span class="confirmation-flower" aria-hidden="true">✳</span><span class="eyebrow">THANK YOU FOR EXPLORING PANZY</span><h1>Your preview order is <em>all set.</em></h1><p>This is a local design preview. It did not send an order to PANZY, arrange delivery or collect payment. The live WooCommerce checkout will confirm your order once the real store is connected.</p><div class="confirmation-number">PREVIEW REFERENCE <strong>' + html(queryString.get('ref') || 'PANZY-DEMO') + '</strong></div><a class="button button-solid" href="/shop.html">Return to the collection ' + icon('arrow') + '</a></section></main>';
	};

	var pageContent = function (page) {
		if (page === 'shop') { return shopPage(); }
		if (page === 'categories') { return categoriesPage(); }
		if (page === 'about') { return aboutPage(); }
		if (page === 'contact') { return contactPage(); }
		if (page === 'product') { return productPage(); }
		if (page === 'cart') { return cartPage(); }
		if (page === 'checkout') { return checkoutPage(); }
		if (page === 'order-success') { return confirmationPage(); }
		return homePage();
	};

	var page = currentPage();
	var app = document.getElementById('store-app');
	if (!app) {
		throw new Error('The PANZY preview app container was not found.');
	}
	document.title = ({
		home: 'PANZY — Everything your home needs',
		shop: 'Shop the collection — PANZY',
		categories: 'Explore categories — PANZY',
		about: 'Our story — PANZY',
		contact: 'Contact PANZY',
		product: (products.find(function (product) { return product.id === queryString.get('id'); }) || products[0]).name + ' — PANZY',
		cart: 'Your bag — PANZY',
		checkout: 'Checkout — PANZY',
		'order-success': 'Order preview — PANZY'
	})[page] || 'PANZY — Everything your home needs';
	app.innerHTML = header() + pageContent(page) + footer() + '<div class="toast-message" id="toast-message" role="status" aria-live="polite"></div>';

	var activeNav = document.querySelector('.nav-link[data-page="' + page + '"]');
	if (activeNav) {
		activeNav.classList.add('nav-active');
	}

	var updateCartCount = function () {
		var count = getCount();
		document.querySelectorAll('.cart-count').forEach(function (element) {
			element.textContent = count;
		});
		var cartLink = document.querySelector('.cart-link');
		if (cartLink) {
			cartLink.setAttribute('aria-label', 'Shopping bag, ' + count + (count === 1 ? ' item' : ' items'));
		}
	};

	var toastTimeout;
	var toast = function (message) {
		var element = document.getElementById('toast-message');
		if (!element) {
			return;
		}
		element.textContent = message;
		element.classList.add('toast-visible');
		window.clearTimeout(toastTimeout);
		toastTimeout = window.setTimeout(function () { element.classList.remove('toast-visible'); }, 3000);
	};

	var addToCart = function (id, quantity) {
		var product = products.find(function (entry) { return entry.id === id; });
		if (!product) {
			throw new Error('The selected preview product was not found.');
		}
		var cart = getCart();
		cart[id] = Math.min(99, Number(cart[id] || 0) + Math.max(1, Number(quantity || 1)));
		setCart(cart);
		toast(product.name + ' added to your bag · ' + currency(product.price));
	};

	document.querySelectorAll('[data-add-to-cart]').forEach(function (button) {
		button.addEventListener('click', function () {
			var quantityElement = document.getElementById('detail-qty');
			addToCart(button.getAttribute('data-add-to-cart'), quantityElement ? Number(quantityElement.textContent) : 1);
		});
	});

	document.querySelectorAll('[data-detail-qty]').forEach(function (button) {
		button.addEventListener('click', function () {
			var output = document.getElementById('detail-qty');
			output.textContent = Math.max(1, Math.min(99, Number(output.textContent) + Number(button.getAttribute('data-detail-qty'))));
		});
	});

	document.querySelectorAll('[data-image]').forEach(function (button) {
		button.addEventListener('click', function () {
			var image = document.getElementById('main-product-image');
			var frame = image ? image.closest('.product-main-image') : null;
			if (image && frame) {
				frame.classList.add('is-changing');
				window.setTimeout(function () {
					image.src = button.getAttribute('data-image');
					frame.classList.remove('is-changing');
				}, 90);
				document.querySelectorAll('.gallery-thumbnail').forEach(function (thumbnail) {
					var selected = thumbnail === button;
					thumbnail.classList.toggle('is-active', selected);
					thumbnail.setAttribute('aria-pressed', String(selected));
				});
			}
		});
	});

	var bindCartActions = function () {
		document.querySelectorAll('[data-cart-qty]').forEach(function (button) {
			if (button.dataset.bound) { return; }
			button.dataset.bound = 'true';
			button.addEventListener('click', function () {
				var id = button.getAttribute('data-product-id');
				var cart = getCart();
				var row = button.closest('[data-cart-row]');
				var output = row ? row.querySelector('output') : null;
				var quantity = Number(output ? output.textContent : cart[id]) + Number(button.getAttribute('data-cart-qty'));
				if (quantity < 1) { delete cart[id]; } else { cart[id] = Math.min(99, quantity); }
				setCart(cart);
				window.location.reload();
			});
		});
		document.querySelectorAll('[data-remove-item]').forEach(function (button) {
			if (button.dataset.bound) { return; }
			button.dataset.bound = 'true';
			button.addEventListener('click', function () {
				var cart = getCart();
				delete cart[button.getAttribute('data-remove-item')];
				setCart(cart);
				window.location.reload();
			});
		});
	};
	bindCartActions();

	var menuToggle = document.querySelector('.menu-toggle');
	var navigation = document.getElementById('primary-navigation');
	if (menuToggle && navigation) {
		menuToggle.addEventListener('click', function () {
			var expanded = menuToggle.getAttribute('aria-expanded') === 'true';
			menuToggle.setAttribute('aria-expanded', String(!expanded));
			navigation.classList.toggle('is-open', !expanded);
		});
		document.addEventListener('keydown', function (event) {
			if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
				menuToggle.setAttribute('aria-expanded', 'false');
				navigation.classList.remove('is-open');
				menuToggle.focus();
			}
		});
	}

	var searchForm = document.querySelector('.product-search');
	var searchButton = searchForm ? searchForm.querySelector('button[type="submit"]') : null;
	var searchInput = searchForm ? searchForm.querySelector('input[type="search"]') : null;
	if (searchForm && searchButton && searchInput) {
		searchButton.addEventListener('click', function (event) {
			if (window.matchMedia('(max-width: 700px)').matches && !searchForm.classList.contains('is-open')) {
				event.preventDefault();
				searchForm.classList.add('is-open');
				searchInput.focus();
			}
		});
	}

	var contactForm = document.getElementById('contact-form');
	if (contactForm) {
		contactForm.addEventListener('submit', function (event) {
			event.preventDefault();
			document.getElementById('contact-feedback').textContent = 'Thank you. This contact form is an interaction preview and is not connected to email yet.';
			contactForm.reset();
		});
	}

	var checkoutForm = document.getElementById('checkout-form');
	if (checkoutForm) {
		checkoutForm.addEventListener('submit', function (event) {
			event.preventDefault();
			if (!checkoutForm.reportValidity()) {
				return;
			}
			var orderReference = 'PANZY-DEMO-' + Math.floor(1000 + Math.random() * 9000);
			window.localStorage.removeItem(CART_KEY);
			window.location.href = '/order-success.html?ref=' + encodeURIComponent(orderReference);
		});
	}

	if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		var revealObserver = new IntersectionObserver(function (entries, observer) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12 });
		document.querySelectorAll('.reveal').forEach(function (element) {
			revealObserver.observe(element);
		});
	} else {
		document.querySelectorAll('.reveal').forEach(function (element) {
			element.classList.add('is-visible');
		});
	}

	if (page === 'checkout' && getCount() === 0) {
		var checkoutSubmit = document.querySelector('.place-order');
		if (checkoutSubmit) {
			checkoutSubmit.disabled = true;
		}
	}

	updateCartCount();
}());
