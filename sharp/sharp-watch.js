import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

console.log('=====================');

const puality_value = 90;

let pathName = path.dirname(process.argv[2]);
let dirName = path.dirname(process.argv[2]);
let fileName = path.basename(process.argv[2]);

let inputDir = pathName;
let outPutDir = `${pathName.replace('src/assets/images', 'src/public/assets/images')}`;

// let copyPutDir = `${pathName.replace('src/public/assets/images', 'origin-images')}`;
// console.log(`copyPutDir: ${copyPutDir}`);

// 拡張子を取得
function getExtension(file) {
	let ext = path.extname(file || '').split('.');
	return ext[ext.length - 1];
}
const fileFormat = getExtension(fileName);

(() => {
	// もしディレクトリがなければ作成
	if (!fs.existsSync('src/public/assets/images')) {
		fs.mkdirSync('src/public/assets/images');
	}
	// サブディレクトリがなければ作成
	if (!fs.existsSync(outPutDir)) {
		fs.mkdirSync(outPutDir);
	}
	// if (!fs.existsSync(copyPutDir)) {
	// 	fs.mkdirSync(copyPutDir);
	// }

	let sh = sharp(`${dirName}/${fileName}`);
	let webp = sharp(`${dirName}/${fileName}`);

	if (fileFormat === 'jpg' || fileFormat === 'jpeg') {
		sh = sh.jpeg({ quality: puality_value });
		webp = webp.webp({ quality: puality_value });
	} else if (fileFormat === 'png') {
		sh = sh.png({ quality: puality_value });
		webp = webp.webp({ quality: puality_value });
	} else if (fileFormat === 'gif') {
		sh = sh.gif({ quality: puality_value });
		webp = webp.webp({ quality: puality_value });
	} else if (fileFormat === 'svg') {
		console.log('svgファイルです。');
		fs.copyFile(`${inputDir}/${fileName}`, `${outPutDir}/${fileName}`, (err) => {
			if (err) {
				return;
			}
			console.log(`${fileName}を${outPutDir}に複製しました。`);
		});
		return;
	} else if (fileFormat === 'webp') {
		console.log('webpファイルです。');
		return;
	} else {
		console.log('対応していないファイル形式です。');
		return;
	}

	// 圧縮
	sh.toFile(`${inputDir}/${fileName}`, (err, info) => {
		if (err) {
			// 該当ファイルがない場合はdistから削除
			if (fs.existsSync(`${outPutDir}/${fileName.replace(/\.[^/.]+$/, '.webp')}`)) {
				fs.unlinkSync(`${outPutDir}/${fileName.replace(/\.[^/.]+$/, '.webp')}`);
				console.log(`${fileName.replace(/\.[^/.]+$/, '.webp')}を${outPutDir}から削除しました。`);
			}
			if (fs.existsSync(`${outPutDir}/${fileName}`)) {
				fs.unlinkSync(`${outPutDir}/${fileName}`);
				console.log(`${fileName}を${outPutDir}から削除しました。`);
			}
			return;
		}
		console.log(`${fileName}を圧縮しました。 ${info.size / 1000}KB`);
	});
	sh.toFile(`${outPutDir}/${fileName}`, (err, info) => {
		console.log(`${inputDir}/${fileName}`);
		if (err) {
			console.log(err);
			// 該当ファイルがない場合はdistから削除
			if (fs.existsSync(`${outPutDir}/${fileName}`)) {
				fs.unlinkSync(`${outPutDir}/${fileName.replace(/\.[^/.]+$/, '.webp')}`);
				console.log(`${fileName.replace(/\.[^/.]+$/, '.webp')}を${outPutDir}から削除しました。`);
			}
			return;
		}
		console.log(`${fileName}を圧縮しました。 ${info.size / 1000}KB`);
		// console.log(`${fileName}を圧縮しました。 ${info.size / 1000}KB`);
		// console.log(`${fileName}を複製しました。`);

		// webp生成
		webp.toFile(`${outPutDir}/${fileName.replace(/\.[^/.]+$/, '.webp')}`, (err, info) => {
			fs.unlinkSync(`${outPutDir}/${fileName}`);
			console.log(`${fileName}をwebpに変換しました。 ${info.size / 1000}KB`);
		});
	});
})();
