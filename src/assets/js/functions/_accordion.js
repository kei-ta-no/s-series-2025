export function accordion() {
	const parents = document.querySelectorAll('.js-accordion');

	if (parents.length > 0) {
		parents.forEach((parent) => {
			const ignition = parent.querySelector('.js-accordion-ignition');
			const child = ignition.nextElementSibling;

			if (ignition && child) {
				ignition.addEventListener('click', () => {
					const child_contents = child.firstElementChild;
					const child_height = child_contents.getBoundingClientRect().height;
					child.style.transition = 'height 0.8s ease';

					if (ignition.classList.contains('is-open')) {
						child.style.height = `${child_height}px`;

						setTimeout(() => {
							child.style.height = `0px`;
							ignition.classList.remove('is-open');
							parent.classList.remove('is-open');
						}, 1);
						setTimeout(() => {
							child.style.height = ``;
							child.classList.remove('is-open');
						}, 1001);
						return;
					}

					if (!ignition.classList.contains('is-open')) {
						child.style.height = `0px`;

						setTimeout(() => {
							child.style.height = `${child_height}px`;
							parent.classList.add('is-open');
							ignition.classList.add('is-open');
							child.classList.add('is-open');
						}, 1);
						setTimeout(() => {
							child.style.height = `auto`;
						}, 1001);
						return;
					}
				});
			}
		});
	}
}

function open() {}

function close() {}
