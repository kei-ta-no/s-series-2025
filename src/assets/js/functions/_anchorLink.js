export function anchorLink() {
	const anchorLinks = document.querySelectorAll('a[href^="#"]');
	const anchorLinksArr = Array.prototype.slice.call(anchorLinks);

	anchorLinksArr.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const targetId = link.hash;
			if (targetId) {
				const menuButtons = document.querySelectorAll('.js-menu-button.is-open');
				if (menuButtons.length > 0) {
					menuButtons.forEach((menuButton) => {
						menuButton.classList.remove('is-open');
					});
					closeMenu();
				}

				const targetElement = document.querySelector(targetId);
				const targetOffsetTop = window.pageYOffset + targetElement.getBoundingClientRect().top;
				let targetOffset = (80 / 375) * window.innerWidth;
				targetOffset = 40;

				window.scrollTo({
					top: targetOffsetTop - targetOffset,
					behavior: 'smooth',
				});
			}
		});
	});
}
