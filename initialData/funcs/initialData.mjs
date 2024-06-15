import { writeToFile } from "./writeToFile.mjs";
import { createData } from "./createData.mjs";
import { getWriteFilePath } from "./getPath.mjs";

async function initialData(targetFolder, outputFile) {
  const Data = await createData(targetFolder);
  const DataString = JSON.stringify(Data);
  const filePath = getWriteFilePath(`${outputFile}.ts`);
  writeToFile(filePath, DataString, `${outputFile}`);

  console.log(`${outputFile}イニシャル成功しました！`);
}

export { initialData };
