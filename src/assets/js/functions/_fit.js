export function fitHeight() {
	const eles = document.querySelectorAll('.js-fit-height');
	if (eles.length > 0) {
		eles.forEach((ele) => {
			ele.style.height = `${window.innerHeight}px`;
		});
	}
}
