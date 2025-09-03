import fs from "fs";
import path from "path";
import sharp from "sharp";

const puality_value = 90;

let dirName = "src/assets/images";

// 拡張子を確認
function getExtension(file) {
  let ext = path.extname(file || "").split(".");
  return ext[ext.length - 1];
}

const readSubDir = (folderPath, finishFunc) => {
  // フォルダ内の全ての画像の配列
  let result = [];
  let execCounter = 0;

  const readTopDir = (folderPath) => {
    execCounter += 1;
    fs.readdir(folderPath, (err, items) => {
      if (err) {
        console.log(err);
      }

      items = items.map((itemName) => {
        return path.join(folderPath, itemName);
      });

      items.forEach((itemPath) => {
        if (fs.statSync(itemPath).isFile()) {
          result.push(itemPath);
        }
        if (fs.statSync(itemPath).isDirectory()) {
          //フォルダなら再帰呼び出し
          readTopDir(itemPath);
        }
      });

      execCounter -= 1;

      if (execCounter === 0) {
        if (finishFunc) {
          finishFunc(result);
        }
      }
    });
  };

  readTopDir(folderPath);
};

//サブディレクトリの列挙 非同期
readSubDir(dirName, (items) => {
  items.forEach((item) => {
    const pathName = path.dirname(item);
    const fileName = path.basename(item);
    const fileFormat = getExtension(fileName);

    let outPutDir = `dist/${pathName.replace("src", "")}`;

    // もしディレクトリがなければ作成
    if (!fs.existsSync("dist/assets/images")) {
      fs.mkdirSync("dist/assets/images");
    }

    // もしディレクトリがなければ作成
    if (!fs.existsSync(outPutDir)) {
      fs.mkdirSync(outPutDir);
    }

    if (fileFormat === "") {
      console.log(`対応していないファイルです。-> ${fileName}`);
      return;
    } else if (fileFormat === "svg") {
      // svgは複製のみ
      fs.copyFile(item, `${outPutDir}/${fileName}`, (err) => {
        if (err) {
          return;
        }
        console.log(`${fileName}を${outPutDir}に複製しました。`);
      });
      return;
    }

    let sh = sharp(`${pathName}/${path.basename(item)}`);
    let webp = sharp(`${pathName}/${path.basename(item)}`);

    if (fileFormat === "jpg" || fileFormat === "jpeg") {
      sh = sh.jpeg({ quality: puality_value });
      webp = webp.webp({ quality: puality_value });
    } else if (fileFormat === "png") {
      sh = sh.png({ quality: puality_value });
      webp = webp.webp({ quality: puality_value });
    } else if (fileFormat === "gif") {
      sh = sh.gif({ quality: puality_value });
      webp = webp.webp({ quality: puality_value });
    } else {
      console.log("対応していないファイル形式です。");
      return;
    }

    sh.toFile(`${outPutDir}/${fileName}`, (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`${fileName}を圧縮しました。 ${info.size / 1000}KB`);

      // webp生成、もしディレクトリがなければ作成
      if (!fs.existsSync(`${outPutDir}/webp`)) {
        fs.mkdirSync(`${outPutDir}/webp`);
      }
      webp.toFile(
        `${outPutDir}/webp/${fileName.replace(/\.[^/.]+$/, ".webp")}`,
        (err, info) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(
            `${fileName}をwebpに変換しました。 ${info.size / 1000}KB`
          );
        }
      );
    });
  });
});
