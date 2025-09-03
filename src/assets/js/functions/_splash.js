import Cookies from 'js-cookie';

export function doSplash() {
	const hash = location.hash;
	const splash = document.querySelector('.js-splash');

	setOpening();

	if (hash === '#opening') {
		if (splash) {
			setTimeout(() => {
				splash.classList.add('is-active');
			}, 600);

			setTimeout(() => {
				splash.classList.add('is-inactive');
			}, 1600);

			setTimeout(() => {
				opening();
				splash.remove();
			}, 2600);
		} else {
			setTimeout(() => {
				opening();
				splash.remove();
			}, 400);
		}
	} else {
		if (!Cookies.get('isSplash')) {
			Cookies.set('isSplash', 'true');
			if (splash) {
				setTimeout(() => {
					splash.classList.add('is-active');
				}, 600);

				setTimeout(() => {
					splash.classList.add('is-inactive');
				}, 1600);

				setTimeout(() => {
					opening();
					splash.remove();
				}, 2600);
			} else {
				setTimeout(() => {
					opening();
					splash.remove();
				}, 400);
			}
		} else {
			if (splash) splash.remove();
			setTimeout(() => {
				opening();
				splash.remove();
			}, 400);
		}
	}
}

function removeSplash() {
	const splash = document.querySelector('.js-splash');

	if (splash) {
		splash.remove();
	}
}

function setOpening() {
	const menu_button = document.querySelector('.js-menu-button');
	if (menu_button) {
		menu_button.style.transition = 'none';
		menu_button.classList.add('is-pre-opening');
		setTimeout(() => {
			menu_button.style.transition = '';
		}, 1);
	}
}

function opening() {
	const eles = document.querySelectorAll('.js-opening');
	let eles_order = [];

	if (eles.length > 0) {
		eles.forEach((ele) => {
			const delay = parseInt(ele.dataset.delay);
			setTimeout(() => {
				ele.classList.add('is-opening');
			}, delay);
		});
	}
}
