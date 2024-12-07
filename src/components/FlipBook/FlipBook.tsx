import styles from "./FlipBook.module.css";
import { useState } from "react";
import { useScene } from "../../context/SceneContext";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
import { useUrlList } from "../../hooks/useUrlList";
import { useFilterData } from "../../hooks/useFilterData";
import FlipLayer from "./FlipLayer";
import FlipControl from "./FlipControl";

const FlipBook = () => {
  // コンテキスト
  const { setScene } = useScene();
  const { appOption } = useAppOption();
  // カスタムフック
  const { filterData } = useFilterData("cg");
  const { urlList, firstLastInfo, target } = useUrlList();

  const [isReversing, setIsReversing] = useState<Boolean>(false);

  const [layerState, setLayerState] = useState<{
    active: "1st" | "2nd";
    page: "first" | "last" | undefined;
    rotateY: boolean;
  }>({
    active: "1st",
    page: undefined,
    rotateY: false,
  });

  return (
    <div
      className={`${styles["flip-book"]} ${appOption.dropShadow.cg && styles.shadow}`}
      style={{ filter: filterData }}
      onContextMenu={(e) => {
        e.preventDefault();
        setScene("card");
      }}
    >
      {layerState.active === "1st" && (
        <FlipLayer
          isReversing={isReversing}
          target={target}
          urlList={urlList}
          layerState={layerState}
          setLayerState={setLayerState}
          firstLastInfo={firstLastInfo}
        />
      )}

      {layerState.active === "2nd" && (
        <FlipLayer
          isReversing={isReversing}
          target={target}
          urlList={urlList}
          layerState={layerState}
          setLayerState={setLayerState}
          firstLastInfo={firstLastInfo}
        />
      )}

      <FlipControl setLayerState={setLayerState} setIsReversing={setIsReversing} />
    </div>
  );
};

export default FlipBook;
