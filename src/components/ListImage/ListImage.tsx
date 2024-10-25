import styles from "./ListImage.module.css";
import { useLayoutEffect, useState } from "react";
import { useImageList } from "../../context/ImageListState";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { createRandomImg } from "../../helper/createRandomImg";
import { useScene } from "../../context/SceneContext";
import { useFilter } from "../../context/FilterContext";
import { useEffectState } from "../../context/EffectState/EffectStateContext";
import { useRotateY } from "../../context/RotateYContext";
import { type SpecificPayloadType } from "../../context/MediaInfoContext/MediaInfoFunc/dispatch/toMediaSpecificFile";
import {
  useCardCharacterInfo,
  useCardCharacterState,
} from "../../context/CardCharacterContext";

const ListImage = () => {
  const { listState, listSubState, setListState } = useImageList();
  const { mediaState, mediaDispatch } = useMediaInfo();
  const { setScene } = useScene();
  const { rotateYState } = useRotateY();
  const { effectState } = useEffectState();
  const { filterState } = useFilter();
  const { isCharacter, setIsCharacter } = useCardCharacterState();
  const { characterInfoDispatch } = useCardCharacterInfo();
  const [imageInfoList, setImageInfoList] = useState<[number, string][][]>([]);

  // 左クリック
  const changeCardCg = (target: SpecificPayloadType["target"], index: number) => {
    mediaDispatch({
      type: "specific",
      payload: { target: target, fileInfo: imageInfoList[index] },
    });
    if (target === "cg") {
      setScene("card-cg");
      if (isCharacter) {
        setIsCharacter(false);
        characterInfoDispatch({ type: "deleteData" });
      }
    }
  };

  // 右クリック
  const resetCardScene = (e: any) => {
    e.preventDefault();
    // setScene("card-cg");
  };

  let target: SpecificPayloadType["target"];
  if (listState.cg) {
    target = "cg";
  } else {
    target = "character";
  }

  // useLayoutEffectはuseEffectの先に実行　と　値が画面を反映する前実行
  useLayoutEffect(() => {
    const imageList: [number, string][][] = [];

    if (listState.cg) {
      target = "cg";
    } else {
      target = "character";
    }

    for (let i = 0; i < 9; i++) {
      createRandomImg(imageList, listState, mediaState);
    }

    setImageInfoList(imageList);
  }, [listState]);

  return (
    <div
      className={styles["list-container"]}
      style={{
        transform: `rotateY(${rotateYState.listImgRotateY ? 180 : 0}deg)`,
        filter: effectState.filterEffect.targetCard
          ? `opacity(${filterState.opacity}%) brightness(${filterState.brightness}%) contrast(${filterState.contrast}%) grayscale(${filterState.grayscale}%) hue-rotate(${filterState.hueRotate}deg) invert(${filterState.invert}%) saturate(${filterState.saturate}%) sepia(${filterState.sepia}%)`
          : undefined,
      }}
      onContextMenu={resetCardScene}
      onWheel={() => setListState((prev) => ({ ...prev, random: !prev.random }))}
    >
      {imageInfoList.map((item, index) => (
        <div
          key={index}
          className={`${styles["list-card"]}
            ${listState.random ? styles.againAni : styles.ani}
            ${effectState.shakeEffect.active ? styles.shake : ""}
            `}
          style={{ ["--i" as any]: index - 4 }}
          data-text={`${item[0][1]}-${item[1][1]}`}
        >
          <img
            className={`${listState.stand ? styles.isStand : styles.isCG} ${
              listSubState.heightAuto ? styles.heightAuto : ""
            }`}
            src={`/${target}/${item[0][1]}/${item[1][1]}`}
            onClick={() => changeCardCg(target, index)}
          />
        </div>
      ))}
    </div>
  );
};

export default ListImage;
