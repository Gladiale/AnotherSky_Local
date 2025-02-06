import styles from "./ListImage.module.css";
import { useLayoutEffect, useState } from "react";
import { useScene } from "../../context/SceneContext";
import { useFilter } from "../../context/FilterContext";
import { useRotateY } from "../../context/RotateYContext";
import { useImageList } from "../../context/ImageListState";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import { createRandomImg } from "../../libs/utils/createRandomImg";
import { type SpecificPayloadType } from "../../context/MediaInfoContext/MediaInfoFunc/dispatch/toMediaSpecificFile";

const ListImage = () => {
  const { setScene } = useScene();
  const { filterState } = useFilter();
  const { rotateYState } = useRotateY();
  const { effectState } = useEffectState();
  const { mediaInfo, mediaInfoDispatch } = useMediaInfo();
  const { listState, setListState } = useImageList();

  const [imageInfoList, setImageInfoList] = useState<
    [[number, string], [number, string, number]][]
  >([]);

  // 左クリック
  const changeCardCg = (target: SpecificPayloadType["target"], index: number) => {
    mediaInfoDispatch({
      type: "specific",
      payload: { target: target, fileInfo: imageInfoList[index] },
    });
    if (target === "cg") {
      setScene("cg");
    }
  };

  let target: SpecificPayloadType["target"];
  if (listState.target === "cg") {
    target = "cg";
  } else {
    target = "character";
  }

  // useLayoutEffectはuseEffectの先に実行　と　値が画面を反映する前実行
  useLayoutEffect(() => {
    const imageList: [[number, string], [number, string, number]][] = [];

    if (listState.target === "cg") {
      target = "cg";
    } else {
      target = "character";
    }

    for (let i = 0; i < 9; i++) {
      createRandomImg(imageList, listState, mediaInfo);
    }

    setImageInfoList(imageList);
  }, [listState]);

  return (
    <div
      className={styles["list-container"]}
      style={{
        transform: `rotateY(${rotateYState.listImg ? 180 : 0}deg)`,
        filter: effectState.target.cg
          ? `opacity(${filterState.opacity}%) brightness(${filterState.brightness}%) contrast(${filterState.contrast}%) grayscale(${filterState.grayscale}%) hue-rotate(${filterState.hueRotate}deg) invert(${filterState.invert}%) saturate(${filterState.saturate}%) sepia(${filterState.sepia}%)`
          : undefined,
      }}
      onContextMenu={(e) => e.preventDefault()}
      onWheel={() => setListState((prev) => ({ ...prev, random: !prev.random }))}
    >
      {imageInfoList.map((item, index) => (
        <div
          key={index}
          className={`${styles["list-card"]}
            ${listState.random ? styles.againAni : styles.ani}
            ${effectState.shake.active ? styles.shake : ""}
            `}
          style={{ ["--i" as any]: index - 4 }}
          data-text={`${item[0][1]}-${item[1][1]}`}
        >
          <img
            className={`${listState.target === "chara" ? styles.isChara : styles.isCG} ${
              listState.heightAuto ? styles.heightAuto : ""
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
