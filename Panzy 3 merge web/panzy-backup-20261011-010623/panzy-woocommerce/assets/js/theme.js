(function () {
	'use strict';

	var toggle = document.querySelector('.menu-toggle');
	var navigation = document.getElementById('primary-navigation');
	var searchForm = document.querySelector('.product-search');
	var searchButton = searchForm ? searchForm.querySelector('button[type="submit"]') : null;
	var searchInput = searchForm ? searchForm.querySelector('input[type="search"]') : null;
	var siteHeader = document.querySelector('.site-header');

	if (siteHeader) {
		var updateHeader = function () {
			siteHeader.classList.toggle('is-scrolled', window.scrollY > 24);
		};
		updateHeader();
		window.addEventListener('scroll', updateHeader, { passive: true });
	}

	if (toggle && navigation) {
		toggle.addEventListener('click', function () {
			var expanded = toggle.getAttribute('aria-expanded') === 'true';
			toggle.setAttribute('aria-expanded', String(!expanded));
			navigation.classList.toggle('is-open', !expanded);
		});

		document.addEventListener('keydown', function (event) {
			if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
				toggle.setAttribute('aria-expanded', 'false');
				navigation.classList.remove('is-open');
				toggle.focus();
			}
		});
	}

	if (searchForm && searchButton && searchInput) {
		searchButton.addEventListener('click', function (event) {
			if (window.matchMedia('(max-width: 640px)').matches && !searchForm.classList.contains('is-open')) {
				event.preventDefault();
				searchForm.classList.add('is-open');
				searchInput.focus();
			}
		});
	}

	if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		var revealTargets = document.querySelectorAll(
			'main .hero-copy, main .hero-art, main .section-heading, main .category-card, main .woocommerce ul.products > li.product, main .brand-values'
		);
		var revealIndex = 0;
		var revealObserver = new IntersectionObserver(function (entries, observer) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12 });

		revealTargets.forEach(function (target) {
			target.classList.add('panzy-reveal');
			target.style.setProperty('--panzy-reveal-delay', (revealIndex % 4) * 75 + 'ms');
			revealIndex += 1;
			revealObserver.observe(target);
		});
	}
}());
