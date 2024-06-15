import path from "path";
import { fileURLToPath } from "url";

// 現在のディレクトリネームを取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getTargetPath(target) {
  const targetPath = path.resolve(__dirname, `../../public/${target}`);
  // console.log(targetPath);
  return targetPath;
}

function getWriteFilePath(file) {
  const writeFilePath = path.resolve(__dirname, `../../src/data/${file}`);
  return writeFilePath;
}

export { getTargetPath, getWriteFilePath };
