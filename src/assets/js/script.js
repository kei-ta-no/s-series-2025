import Splide from '@splidejs/splide';
import '@splidejs/splide/css/core';

let modaal_slide;
let _header = true;

document.addEventListener('DOMContentLoaded', () => {
	writeBody();
	anchorLink();
	anchorPosiLink();
	clickMenuButton();
	clickMenuParts();
	fv();
	pro();
	parts();
	plan();
	playVideo();
});

window.addEventListener('load', () => {
	writeBody();
});

window.addEventListener('resize', () => {
	writeBody();
});

window.addEventListener('scroll', () => {
	writeBody();
});

function fv() {
	const ele = document.querySelector('.js-fv');

	if (ele) {
		const options = {
			type: 'loop',
			arrows: false,
			perPage: 1,
			perMove: 1,
			rewind: true,
			pagination: true,
			autoplay: true,
			pauseOnHover: false,
		};

		const _return = new Splide(ele, options);
		_return.mount();
	}
}

function pro() {
	const ele = document.querySelector('.js-pro');
	let _return;
	if (ele) {
		const options = {
			type: 'slide',
			arrows: true,
			perPage: 2,
			perMove: 1,
			rewind: true,
			pagination: false,
			breakpoints: {
				768: {
					perPage: 1,
				},
			},
		};

		if (ele) {
			const _return = new Splide(ele, options);
			_return.mount();
		}

		return _return;
	}
}

function parts() {
	const ele = document.querySelector('.js-parts');
	let _return;
	if (ele) {
		const options = {
			type: 'loop',
			arrows: false,
			perPage: 3,
			perMove: 1,
			rewind: true,
			pagination: false,
			gap: '2.4vw',
			breakpoints: {
				768: {
					gap: '2.4vw',
					perPage: 1,
				},
			},
		};

		if (ele) {
			const _return = new Splide(ele, options);
			_return.mount();
		}

		return _return;
	}
}

function plan() {
	const ele = document.querySelector('.js-plan');
	const titleEle = document.querySelector('.js-plan-title');
	const slides = document.querySelectorAll('.js-plan .splide__slide');

	let _return;
	if (ele) {
		const options = {
			type: 'fade',
			arrows: true,
			perPage: 1,
			perMove: 1,
			rewind: true,
			pagination: true,
		};

		const _return = new Splide(ele, options);
		_return.on('move', (newIndex) => {
			titleEle.textContent = slides[newIndex].dataset.title;
		});

		_return.on('resized active', () => {
			const splideTrack = ele.querySelector('.splide__track');
			const activeSlide = ele.querySelector('.splide__slide.is-active');
			if (activeSlide) splideTrack.style.height = activeSlide.getBoundingClientRect().height + 'px';
		});

		_return.mount();
	}
	return _return;
}

function playVideo() {
	const videoEles = document.querySelectorAll('.pVideo');
	if (videoEles) {
		videoEles.forEach((videoEle) => {
			videoEle.addEventListener('click', () => {
				videoEle.classList.add('isPlay');
				const video = videoEle.querySelector('video');
				video.play();
			});
		});
	}
}

function fixedBody() {
	_header = false;
	const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
	document.documentElement.style.setProperty('--scroll-y--pre', `${scrollY}`);
	const body = document.body;
	body.style.position = 'fixed';
	body.style.top = `-${scrollY}px`;
}

function releaseBody() {
	_header = true;
	const body = document.body;
	const scrollY = document.documentElement.style.getPropertyValue('--scroll-y--pre');
	document.documentElement.style.setProperty('scroll-behavior', 'none');
	body.style.position = '';
	body.style.top = '';
	window.scrollTo(0, parseInt(scrollY || '0') * 1);
	setTimeout(() => {}, 1);
}

function writeBody() {
	document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}`);
}

function clickMenuButton() {
	const menuButton = document.querySelector('.js-menu-button');
	if (menuButton) {
		menuButton.addEventListener('click', () => {
			if (menuButton.classList.contains('is-open')) {
				menuButton.classList.remove('is-open');
				closeMenu();
				return;
			}
			if (!menuButton.classList.contains('is-open')) {
				menuButton.classList.add('is-open');
				openMenu();
				return;
			}
		});
	}
}

function clickMenuParts() {
	const menu = document.querySelector('.js-menu');
	const menuButton = document.querySelector('.js-menu-button');

	if (menu) {
		if (document.querySelector('.js-menu-mask')) {
			const mask = document.querySelector('.js-menu-mask');
			mask.addEventListener('click', () => {
				menuButton.classList.remove('is-open');
				menu.classList.remove('is-open');
				releaseBody();
			});
		}

		if (document.querySelector('.js-menu-close')) {
			const close = document.querySelector('.js-menu-close');
			close.addEventListener('click', () => {
				menuButton.classList.remove('is-open');
				menu.classList.remove('is-open');
				releaseBody();
			});
		}
	}
}
function openMenu() {
	const menu = document.querySelector('.js-menu');
	if (menu) {
		menu.classList.add('is-open');
		fixedBody();
	}
}

function closeMenu() {
	const menu = document.querySelector('.js-menu');
	if (menu) {
		menu.classList.remove('is-open');
		releaseBody();
	}
}

function anchorLink() {
	if (document.querySelector('.js-menu-item')) {
		const menu = document.querySelector('.js-menu');
		const menuButton = document.querySelector('.js-menu-button');
		const items = document.querySelectorAll('.js-menu-item');
		items.forEach((item) => {
			item.addEventListener('click', () => {
				menuButton.classList.remove('is-open');
				menu.classList.remove('is-open');
				releaseBody();
				const header = document.querySelector('.lHeader');
				const headerHeight = header.getBoundingClientRect().height;

				const anchor = item.dataset.anchor;
				const targetElement = document.querySelector(`#${anchor}`);
				const targetOffsetTop = window.pageYOffset + targetElement.getBoundingClientRect().top;
				window.scrollTo({
					top: targetOffsetTop - headerHeight * 1.2,
					behavior: 'smooth',
				});
			});
		});
	}
}

function anchorPosiLink() {
	const anchorLinks = document.querySelectorAll('a[href^="#"]');
	const anchorLinksArr = Array.prototype.slice.call(anchorLinks);

	anchorLinksArr.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const targetId = link.hash;
			const targetElement = document.querySelector(targetId);
			const targetOffsetTop = window.pageYOffset + targetElement.getBoundingClientRect().top;
			window.scrollTo({
				top: targetOffsetTop + 1,
				behavior: 'smooth',
			});
		});
	});
}
