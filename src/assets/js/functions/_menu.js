import { fixedBody, releaseBody } from './_body';

export function menu() {
	const transition_time = 1000;
	const menu = document.querySelector('.js-menu');
	const menuButton = document.querySelector('.js-menu-button');

	if (menu && menuButton) {
		menuButton.addEventListener('click', () => {
			if (menuButton.dataset.exe == '1') return;
			if (menuButton.dataset.exe == '0') {
				menuButton.dataset.exe = '1';
				if (menuButton.classList.contains('is-open')) {
					menuButton.classList.remove('is-open');

					menu.style.transition = `opacity ${transition_time}ms ease`;
					menu.style.opacity = 0;
					releaseBody();

					setTimeout(() => {
						menu.style.display = 'none';
						menuButton.dataset.exe = '0';
					}, transition_time + 1);

					return;
				}

				if (!menuButton.classList.contains('is-open')) {
					menuButton.classList.add('is-open');
					changeMenuImage();

					menu.style.display = 'block';
					menu.style.transition = `opacity ${transition_time}ms ease`;

					setTimeout(() => {
						menu.style.opacity = 1;
					}, 1);

					setTimeout(() => {
						fixedBody();
						menuButton.dataset.exe = '0';
					}, transition_time + 1);

					return;
				}
			}
		});
	}
}

function changeMenuImage() {
	const menuImages = document.querySelectorAll('.js-menu-image');
	if (menuImages.length > 0) {
		const current_no = Math.floor(Math.random() * menuImages.length);

		menuImages.forEach((image) => {
			image.classList.remove('is-current');
		});

		menuImages[current_no].classList.add('is-current');
	}
}
