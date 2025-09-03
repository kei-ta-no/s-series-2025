module.exports = {
	plugins: {
		'postcss-normalize-charset': {},
		autoprefixer: {},
		'postcss-sort-media-queries': {},
		'css-declaration-sorter': { order: 'smacss' },

		/**
		 * 未使用のスタイルを削除
		 * 案件次第では削除
		 */
		// '@fullhuman/postcss-purgecss': {
		// content: ["./src/**/*.html", "./src/js/**/*.js"],
		// content: ['./src/**/*.html', './src/js/**/*.js'],
		// //除外設定　https://purgecss.com/safelisting.html
		// safelist: ['hoge'],
		// },
	},
};
