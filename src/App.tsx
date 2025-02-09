import Provider from "./components/Provider";
import Container from "./components/Container/Container";
import AppOption from "./components/AppOption/AppOption";
import type { FolderDataType } from "./types";

async function fetchFolderData() {
  try {
    const response = await fetch("/folderData.json");
    const data = (await response.json()) as FolderDataType;
    return data;
  } catch (error) {
    console.error(`フォルダー内データの取得が失敗しました: ${error}`);
  }
}
export const folderData = (await fetchFolderData()) as FolderDataType;

function App() {
  // useLayoutEffect(() => {
  //   // HTMLのfontSizeを画面表示倍率に応じて自動変更
  //   const resolution = window.devicePixelRatio;
  //   // console.log(`resolution: ${resolution}dppx`);
  //   if (resolution != 1) {
  //     document.documentElement.style.fontSize = `${16 / resolution}px`;
  //   }
  // }, []);

  return (
    <Provider>
      <Container />
      <AppOption />
    </Provider>
  );
}

export default App;
