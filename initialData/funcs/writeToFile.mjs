import { writeFile } from "fs/promises";

async function writeToFile(filePath, data, exportName) {
  try {
    await writeFile(filePath, `export const ${exportName} = ${data}`, "utf8");
    // console.log("ファイルが正常に書き込まれました。");
  } catch (error) {
    console.error("ファイルの書き込み中にエラーが発生しました:", error);
  }
}

export { writeToFile };
