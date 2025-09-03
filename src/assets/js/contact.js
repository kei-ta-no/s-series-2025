document.addEventListener('DOMContentLoaded', () => {
	formContact();
});

function formContact() {
	// Enterキーで送信しない
	const jsFrom = document.querySelector('.js-form');
	const confirm = jsFrom.querySelector('#confirm');

	// フォームの値のエスケープ処理
	function escapeHtml(text) {
		const map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;',
		};

		return text.replace(/[&<>"']/g, function (m) {
			return map[m];
		});
	}

	// const beforeunloadHandler = (e) => {
	// 	const confirmationMessage = '入力内容を破棄します。';
	// 	e.returnValue = confirmationMessage;
	// 	return confirmationMessage;
	// };
	class ShowError {
		constructor(name, { patternMismatch = false, rangeOverflow = false, rangeUnderflow = false, stepMismatch = false, tooLong = false, tooShort = false, typeMismatch = false, valueMissing = false }) {
			this.form = document.querySelector('.js-form');
			this.name = name;
			this.patternMismatchMessage = patternMismatch;
			this.rangeOverflowMessage = rangeOverflow;
			this.rangeUnderflowMessage = rangeUnderflow;
			this.stepMismatchMessage = stepMismatch;
			this.tooLongMessage = tooLong;
			this.tooShortMessage = tooShort;
			this.typeMismatchMessage = typeMismatch;
			this.valueMissingMessage = valueMissing;

			this.input = this.form.querySelector(`#${this.name}`);
			this.error = this.form.querySelector(`.js-form-error-${this.name}`);

			this._init();
		}

		_confirm() {
			// @ts-ignore
			if (this.input.validity.valid) {
				this.input.classList.remove('is-error');
				this.input.classList.add('is-success');
				this.error.textContent = '';
				// @ts-ignore
			} else if (this.input.validity.rangeOverflow) {
				this.input.classList.remove('is-success');
				this.input.classList.add('is-error');
				// @ts-ignore
				this.error.textContent = this.rangeOverflowMessage;
				// @ts-ignore
			} else if (this.input.validity.rangeUnderflow) {
				this.input.classList.remove('is-success');
				this.input.classList.add('is-error');
				// @ts-ignore
				this.error.textContent = this.rangeUnderflowMessage;
				// @ts-ignore
			} else if (this.input.validity.stepMismatch) {
				this.input.classList.remove('is-success');
				this.input.classList.add('is-error');
				// @ts-ignore
				this.error.textContent = this.stepMismatchMessage;
				// @ts-ignore
			} else if (this.input.validity.tooLong) {
				this.input.classList.remove('is-success');
				this.input.classList.add('is-error');
				// @ts-ignore
				this.error.textContent = this.tooLongMessage;
				// @ts-ignore
			} else if (this.input.validity.tooShort) {
				this.input.classList.remove('is-success');
				this.input.classList.add('is-error');
				// @ts-ignore
				this.error.textContent = this.tooShortMessage;
				// @ts-ignore
			} else if (this.input.validity.patternMismatch) {
				this.input.classList.remove('is-success');
				this.input.classList.add('is-error');
				// @ts-ignore
				this.error.textContent = this.patternMismatchMessage;
				// @ts-ignore
			} else if (this.input.validity.typeMismatch) {
				this.input.classList.remove('is-success');
				this.input.classList.add('is-error');
				// @ts-ignore
				this.error.textContent = this.typeMismatchMessage;
				// @ts-ignore
			} else if (this.input.validity.valueMissing) {
				this.input.classList.remove('is-success');
				this.input.classList.add('is-error');
				// @ts-ignore
				this.error.textContent = this.valueMissingMessage;
			}
		}

		_init() {
			confirm.addEventListener('click', () => {
				// @ts-ignore
				if (!this.form.checkValidity()) {
					this._confirm();
				}
			});

			// @ts-ignore
			if (this.input.type === 'checkbox') {
				this.input.addEventListener('change', () => {
					this._confirm();
				});
			} else {
				this.input.addEventListener('blur', () => {
					this._confirm();
				});
			}
		}
	}

	// お名前
	// new ShowError('fname', {
	// 	// @ts-ignore
	// 	valueMissing: 'お名前を入力してください',
	// });

	// ふりがな
	new ShowError('fmail', {
		// @ts-ignore
		typeMismatch: 'メールアドレスの形式を確認してください',
		// @ts-ignore
		patternMismatch: 'メールアドレスの形式を確認してください',
		// @ts-ignore
		valueMissing: 'メールアドレスを入力してください',
	});

	// // お問い合わせ内容
	// new ShowError('fcontent', {
	// 	// @ts-ignore
	// 	valueMissing: 'お問い合わせ内容を入力してください',
	// });

	// お問い合わせ内容
	new ShowError('fname01', {
		// @ts-ignore
		valueMissing: '必須項目です',
	});

	// お問い合わせ内容
	new ShowError('fname02', {
		// @ts-ignore
		valueMissing: '必須項目です',
	});

	// お問い合わせ内容
	new ShowError('fyomi01', {
		// @ts-ignore
		valueMissing: '必須項目です',
	});

	// お問い合わせ内容
	new ShowError('fyomi02', {
		// @ts-ignore
		valueMissing: '必須項目です',
	});

	// お問い合わせ内容
	new ShowError('ftel', {
		// @ts-ignore
		valueMissing: '必須項目です',
	});

	// お問い合わせ内容
	new ShowError('fprivacy', {
		// @ts-ignore
		valueMissing: '必須項目です',
	});

	// 確認ボタン押下時のエラーチェック
	const jsFormItem = document.querySelectorAll('.js-form-item');
	const jsFormTop = jsFrom.getBoundingClientRect().top + window.pageYOffset - 200;

	confirm.addEventListener('click', (e) => {
		// @ts-ignore
		if (!jsFrom.checkValidity()) {
			// 最初のエラー要素にスクロール
			const firstError = jsFrom.querySelector('.is-error');
			const firstErrorTop = firstError.getBoundingClientRect().top + window.pageYOffset - 200;
			window.scrollTo(0, firstErrorTop);
		}
	});

	// フォーム送信
	// jsFrom.addEventListener('submit', (e) => {
	// 	// @ts-ignore
	// 	if (jsFrom.checkValidity()) {
	// 		// 送信ボタンを押したら、警告表示を削除
	// 		window.removeEventListener('beforeunload', beforeunloadHandler);
	// 	} else {
	// 		e.preventDefault();
	// 	}
	// });

	// エンターによる送信を防ぐ
	jsFormItem.forEach((item) => {
		item.addEventListener('keypress', (e) => {
			// テキストエリアは改行するため
			// @ts-ignore
			if (item.name !== 'fcontent') {
				// @ts-ignore
				if (e.keyCode === 13) {
					e.preventDefault();
				}
			}
		});
	});

	// 更新時に警告
	// window.addEventListener('beforeunload', beforeunloadHandler);
}
