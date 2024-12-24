import styles from "./ListImageMode2.module.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFilter } from "../../context/FilterContext";
import { useImageList } from "../../context/ImageListState";
import { useMediaInfo } from "../../context/MediaInfoContext/MediaInfoContext";
import { useScene } from "../../context/SceneContext";
import { createRandomImg } from "../../helper/createRandomImg";
import { useScreenMode } from "../../context/ScreenContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import { useRotateY } from "../../context/RotateYContext";
import { SpecificPayloadType } from "../../context/MediaInfoContext/MediaInfoFunc/dispatch/toMediaSpecificFile";

const ListImageMode2 = () => {
  const { listState, listSubState, setListState } = useImageList();
  const { mediaInfo, mediaInfoDispatch } = useMediaInfo();
  const { setScene } = useScene();
  const { rotateYState } = useRotateY();
  const { effectState } = useEffectState();
  const { filterState } = useFilter();
  const { screenMode } = useScreenMode();

  const [imageInfoList, setImageInfoList] = useState<
    [[number, string], [number, string, number]][]
  >([]);
  const imgBoxRef = useRef<HTMLDivElement>(null);
  const [changeInfo, setChangeInfo] = useState({
    changed: false,
    direction: false,
    page: 0,
  });

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

  // 右クリック
  const resetCardScene = (e: any) => {
    e.preventDefault();
    setScene("cg");
  };

  let target: SpecificPayloadType["target"];
  if (listState.cg) {
    target = "cg";
  } else {
    target = "character";
  }

  useLayoutEffect(() => {
    const imageList: [[number, string], [number, string, number]][] = [];
    if (listState.cg) {
      target = "cg";
    } else {
      target = "character";
    }
    for (let i = 0; i < 7; i++) {
      createRandomImg(imageList, listState, mediaInfo);
    }
    setImageInfoList(imageList);
  }, [listState]);

  const moveImg = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      setChangeInfo((prev) => ({
        changed: true,
        direction: true,
        page: prev.page + 1,
      }));
    } else {
      setChangeInfo((prev) => ({
        changed: true,
        direction: false,
        page: prev.page - 1,
      }));
    }
  };

  useEffect(() => {
    if (changeInfo.changed) {
      const items = document.querySelectorAll(".itemQuery");
      if (changeInfo.direction) {
        imgBoxRef.current?.appendChild(items[0]);
      } else {
        imgBoxRef.current?.prepend(items[items.length - 1]);
      }

      if (changeInfo.page >= 7 || changeInfo.page <= -7) {
        setChangeInfo((prev) => ({ ...prev, changed: false, page: 0 }));
        setListState((prev) => ({ ...prev, random: !prev.random }));
      } else {
        setChangeInfo((prev) => ({ ...prev, changed: false }));
      }
    }
  }, [changeInfo.changed]);

  return (
    <div
      className={`${styles["list-container"]}  ${
        screenMode != "cardMode" ? styles.big : ""
      }`}
      style={{
        transform: `rotateY(${rotateYState.listImg ? 180 : 0}deg)`,
        filter: effectState.target.cg
          ? `opacity(${filterState.opacity}%) brightness(${filterState.brightness}%) contrast(${filterState.contrast}%) grayscale(${filterState.grayscale}%) hue-rotate(${filterState.hueRotate}deg) invert(${filterState.invert}%) saturate(${filterState.saturate}%) sepia(${filterState.sepia}%)`
          : undefined,
      }}
      onContextMenu={resetCardScene}
    >
      <div className={styles["img-box"]} ref={imgBoxRef} onWheel={moveImg}>
        {imageInfoList.map((item, index) => (
          <div
            key={index}
            className={`${styles["item-wrapper"]}  itemQuery`}
            data-text={`${item[0][1]}-${item[1][1]}`}
          >
            <div
              className={`${styles.item} ${effectState.shake.active ? styles.shake : ""}`}
              style={{
                ["--img" as any]: `url(/${target}/${item[0][1]}/${item[1][1]})`,
                backgroundSize: listSubState.heightAuto ? "cover" : "contain",
                backgroundPosition: target === "character" ? "center" : "unset",
              }}
              onClick={() => changeCardCg(target, index)}
            />
          </div>
        ))}

        {imageInfoList.map((item, index) => (
          <div
            key={index + 7}
            className={`${styles["item-wrapper"]}  itemQuery`}
            data-text={`${item[0][1]}-${item[1][1]}`}
          >
            <div
              className={`${styles.item} ${effectState.shake.active ? styles.shake : ""}`}
              style={{
                ["--img" as any]: `url(/${target}/${item[0][1]}/${item[1][1]})`,
                backgroundSize: listSubState.heightAuto ? "cover" : "contain",
                backgroundPosition: target === "character" ? "center" : "unset",
              }}
              onClick={() => changeCardCg(target, index)}
            />
          </div>
        ))}

        {imageInfoList.map((item, index) => (
          <div
            key={index + 14}
            className={`${styles["item-wrapper"]}  itemQuery`}
            data-text={`${item[0][1]}-${item[1][1]}`}
          >
            <div
              className={`${styles.item} ${effectState.shake.active ? styles.shake : ""}`}
              style={{
                ["--img" as any]: `url(/${target}/${item[0][1]}/${item[1][1]})`,
                backgroundSize: listSubState.heightAuto ? "cover" : "contain",
                backgroundPosition: target === "character" ? "center" : "unset",
              }}
              onClick={() => changeCardCg(target, index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListImageMode2;
