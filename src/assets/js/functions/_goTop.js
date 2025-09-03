export function toggleGoTop() {
	const go_top = document.querySelector('.js-go-top');
	if (go_top) {
		if (window.scrollY > window.innerHeight) go_top.classList.add('is-active');
		if (window.scrollY <= window.innerHeight) go_top.classList.remove('is-active');
	}
}
