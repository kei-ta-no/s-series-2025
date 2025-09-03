/**
 * body固定
 */
export function fixedBody() {
	const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
	document.documentElement.style.setProperty('--scroll-y--pre', `${scrollY}`);
	const body = document.body;
	body.style.position = 'fixed';
	body.style.top = `-${scrollY}px`;
}

/**
 * body解放
 */
export function releaseBody() {
	const body = document.body;
	const scrollY = document.documentElement.style.getPropertyValue('--scroll-y--pre');
	document.documentElement.style.setProperty('scroll-behavior', 'none');
	body.style.position = '';
	body.style.top = '';
	window.scrollTo(0, parseInt(scrollY || '0') * 1);
	setTimeout(() => {}, 1);
}

/**
 * スクロール保持
 */
export function writeBody() {
	document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}`);
}
