import { useEffect, useState } from "react";
import type { FolderDataType } from "./types";
// components
import Provider from "./components/Provider";
import Container from "./components/Container/Container";
import AppOption from "./components/AppOption/AppOption";
import Loading from "./components/Loading/Loading";

export let folderData: FolderDataType;

function App() {
  const [dataStatus, setDataStatus] = useState<"waiting" | "success" | "failed">(
    "waiting"
  );

  useEffect(() => {
    const fetchFolderData = async () => {
      try {
        const response = await fetch("/folderData.json");
        if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);

        folderData = (await response.json()) as FolderDataType;
        setDataStatus("success");
      } catch (error) {
        setDataStatus("failed");
        console.error(`フォルダー内データの取得が失敗しました: ${error}`);
      }
    };
    fetchFolderData();
  }, []);

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
      {dataStatus === "success" ? (
        <>
          <Container />
          <AppOption />
        </>
      ) : (
        <Loading kind="extra" loadStatus={dataStatus} />
      )}
    </Provider>
  );
}

export default App;
